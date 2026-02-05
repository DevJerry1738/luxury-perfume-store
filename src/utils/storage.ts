/**
 * Safe localStorage wrapper with JSON parsing/serialization
 */

export const storageHelper = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : null
    } catch (e) {
      console.warn(`Failed to parse localStorage key "${key}":`, e)
      return null
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.warn(`Failed to save to localStorage key "${key}":`, e)
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.warn(`Failed to remove localStorage key "${key}":`, e)
    }
  },

  clear(): void {
    try {
      localStorage.clear()
    } catch (e) {
      console.warn('Failed to clear localStorage:', e)
    }
  },
}
