export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

export interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, unknown>
}

export interface LoggerConfig {
  level: LogLevel
  enableConsole: boolean
  enableStorage: boolean
  storageKey?: string
  maxStorageEntries?: number
}

class Logger {
  private config: LoggerConfig
  private logs: LogEntry[] = []

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      enableStorage: false,
      storageKey: 'app_logs',
      maxStorageEntries: 100,
      ...config,
    }

    this.loadLogsFromStorage()
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    }
  }

  private logToConsole(entry: LogEntry): void {
    if (!this.config.enableConsole) return

    const levelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR']
    const levelName = levelNames[entry.level]
    const prefix = `[${entry.timestamp}] [${levelName}]`

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.warn(prefix, entry.message, entry.context || '')
        break
      case LogLevel.INFO:
        console.warn(prefix, entry.message, entry.context || '')
        break
      case LogLevel.WARN:
        console.warn(prefix, entry.message, entry.context || '')
        break
      case LogLevel.ERROR:
        console.error(prefix, entry.message, entry.context || '')
        break
    }
  }

  private saveLogToStorage(entry: LogEntry): void {
    if (!this.config.enableStorage) return

    this.logs.push(entry)

    if (this.logs.length > (this.config.maxStorageEntries ?? 100)) {
      this.logs.shift()
    }

    try {
      if (this.config.storageKey) {
        localStorage.setItem(
          this.config.storageKey,
          JSON.stringify(this.logs)
        )
      }
    } catch (error) {
      console.warn('Failed to save logs to storage:', error)
    }
  }

  private loadLogsFromStorage(): void {
    if (!this.config.enableStorage || !this.config.storageKey) return

    try {
      const stored = localStorage.getItem(this.config.storageKey)
      if (stored) {
        this.logs = JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load logs from storage:', error)
    }
  }

  private log(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>
  ): void {
    if (!this.shouldLog(level)) return

    const entry = this.createLogEntry(level, message, context)
    this.logToConsole(entry)
    this.saveLogToStorage(entry)
  }

  debug(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.DEBUG, message, context)
  }

  info(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.INFO, message, context)
  }

  warn(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.WARN, message, context)
  }

  error(message: string, context?: Record<string, unknown>): void {
    this.log(LogLevel.ERROR, message, context)
  }

  getLogs(): LogEntry[] {
    return [...this.logs]
  }

  clearLogs(): void {
    this.logs = []
    if (this.config.enableStorage && this.config.storageKey) {
      try {
        localStorage.removeItem(this.config.storageKey)
      } catch (error) {
        console.warn('Failed to clear logs from storage:', error)
      }
    }
  }

  setLevel(level: LogLevel): void {
    this.config.level = level
  }

  getConfig(): LoggerConfig {
    return { ...this.config }
  }
}

const isDevelopment = import.meta.env.DEV
const defaultLogger = new Logger({
  level: isDevelopment ? LogLevel.DEBUG : LogLevel.ERROR,
  enableConsole: true,
  enableStorage: !isDevelopment,
  storageKey: 'portfolio_logs',
  maxStorageEntries: 50,
})

export { Logger }
export const logger = defaultLogger
