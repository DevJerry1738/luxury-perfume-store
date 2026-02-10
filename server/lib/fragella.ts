/**
 * Fragella API Client
 * Server-side only - API key is NEVER exposed to frontend
 * Handles all communication with Fragella API
 */

import type { FragellaFragrance, FragellaSearchResponse } from './types'

const FRAGELLA_API_KEY = process.env.FRAGELLA_API_KEY
const FRAGELLA_BASE_URL = 'https://api.fragella.com/api/v1'

// Quota tracking - log each request for monitoring
let requestCount = 0
const MAX_REQUESTS_PER_SESSION = 20

class FragellaClient {
  private apiKey: string

  constructor(apiKey?: string) {
    if (!apiKey) {
      throw new Error('FRAGELLA_API_KEY environment variable is not set')
    }
    this.apiKey = apiKey
  }

  /**
   * Make authenticated request to Fragella API
   * Throws on non-200 responses
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // Check quota before making request
    if (requestCount >= MAX_REQUESTS_PER_SESSION) {
      throw new Error(
        `API quota exhausted (${MAX_REQUESTS_PER_SESSION} requests/session). Aborting request to prevent exceeding monthly limit.`,
      )
    }

    const url = `${FRAGELLA_BASE_URL}${endpoint}`
    const headers = {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/json',
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      requestCount++
      console.log(
        `[Fragella API] ${options.method || 'GET'} ${endpoint} (Request ${requestCount}/${MAX_REQUESTS_PER_SESSION})`,
      )

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error')
        throw new Error(
          `Fragella API error ${response.status} ${response.statusText}: ${errorText}`,
        )
      }

      return response.json() as Promise<T>
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      throw new Error(`Fragella API request failed: ${message}`)
    }
  }

  /**
   * Search fragrances by brand or name
   * @param query Search term (brand name or fragrance name)
   * @param limit Number of results to return
   * @returns Array of fragrances matching the query
   */
  async searchFragrances(query: string, limit: number = 10): Promise<FragellaFragrance[]> {
    const endpoint = `/fragrances/search?q=${encodeURIComponent(query)}&limit=${limit}`
    const response = await this.request<FragellaSearchResponse>(endpoint)

    // Handle different response formats from Fragella API
    const fragrances = response.results || response.data || response.fragrances || []

    if (!Array.isArray(fragrances)) {
      throw new Error('Invalid response format from Fragella API: expected array of fragrances')
    }

    return fragrances
  }

  /**
   * Get fragrance by ID
   * @param fragranceId Fragella fragrance ID
   * @returns Fragrance details
   */
  async getFragrance(fragranceId: number): Promise<FragellaFragrance> {
    const endpoint = `/fragrances/${fragranceId}`
    const fragrance = await this.request<FragellaFragrance>(endpoint)

    if (!fragrance || typeof fragrance !== 'object') {
      throw new Error(`Fragrance ${fragranceId} not found or invalid response`)
    }

    return fragrance
  }

  /**
   * Get request count for monitoring quota usage
   */
  getRequestCount(): number {
    return requestCount
  }

  /**
   * Reset request count (for testing)
   */
  resetRequestCount(): void {
    requestCount = 0
  }
}

// Singleton instance - lazy initialized
let clientInstance: FragellaClient | null = null

/**
 * Get Fragella API client instance
 * Validates API key on first use
 */
export function getFragellaClient(): FragellaClient {
  if (!clientInstance) {
    if (!FRAGELLA_API_KEY) {
      throw new Error(
        'FRAGELLA_API_KEY not configured. Add it to .env file. This is server-side only and will not be exposed to frontend.',
      )
    }
    clientInstance = new FragellaClient(FRAGELLA_API_KEY)
  }
  return clientInstance
}

/**
 * Check if API key is configured
 */
export function isFragellaConfigured(): boolean {
  return !!FRAGELLA_API_KEY
}
