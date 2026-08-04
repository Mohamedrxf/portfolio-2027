import { Component, ReactNode } from 'react'

export interface LoadingBoundaryProps {
  children: ReactNode
  loading?: boolean
  fallback?: ReactNode
  delay?: number
}

export interface LoadingBoundaryState {
  showLoading: boolean
}

export class LoadingBoundary extends Component<
  LoadingBoundaryProps,
  LoadingBoundaryState
> {
  private timeoutId: ReturnType<typeof setTimeout> | null = null

  constructor(props: LoadingBoundaryProps) {
    super(props)
    this.state = { showLoading: false }
  }

  componentDidMount(): void {
    if (this.props.loading) {
      this.scheduleLoading()
    }
  }

  componentDidUpdate(prevProps: LoadingBoundaryProps): void {
    if (this.props.loading !== prevProps.loading) {
      if (this.props.loading) {
        this.scheduleLoading()
      } else {
        this.clearLoadingSchedule()
        this.setState({ showLoading: false })
      }
    }
  }

  componentWillUnmount(): void {
    this.clearLoadingSchedule()
  }

  private scheduleLoading(): void {
    const delay = this.props.delay ?? 200
    this.clearLoadingSchedule()
    this.timeoutId = setTimeout(() => {
      this.setState({ showLoading: true })
    }, delay)
  }

  private clearLoadingSchedule(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  render(): ReactNode {
    const { children, loading, fallback } = this.props
    const { showLoading } = this.state

    if (loading && showLoading) {
      if (fallback) {
        return fallback
      }

      return (
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-primary)]" />
            <p className="text-sm text-[var(--color-text-secondary)]">Loading...</p>
          </div>
        </div>
      )
    }

    return children
  }
}
