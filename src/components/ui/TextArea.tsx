import { forwardRef, TextareaHTMLAttributes, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  placeholder?: string
  helperText?: string
  error?: string
  disabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  rows?: number
  autoResize?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      placeholder,
      helperText,
      error,
      disabled = false,
      leftIcon,
      rightIcon,
      rows = 4,
      autoResize = false,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`
    const hasError = !!error
    const internalRef = useRef<HTMLTextAreaElement>(null)
    const textAreaRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && textAreaRef.current) {
        const textArea = textAreaRef.current
        const resize = () => {
          textArea.style.height = 'auto'
          textArea.style.height = `${textArea.scrollHeight}px`
        }
        
        resize()
        textArea.addEventListener('input', resize)
        return () => textArea.removeEventListener('input', resize)
      }
    }, [autoResize, textAreaRef])

    const baseStyles = 'w-full px-4 py-2 bg-[var(--color-surface)] border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed resize-none'

    const borderStyles = hasError
      ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]'

    const textStyles = 'text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)]'

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium',
              hasError ? 'text-[var(--color-error)]' : 'text-[var(--color-text-primary)]'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-3 text-[var(--color-text-tertiary)]">
              {leftIcon}
            </div>
          )}
          <textarea
            ref={textAreaRef}
            id={inputId}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={cn(
              baseStyles,
              borderStyles,
              textStyles,
              leftIcon ? 'pl-10' : '',
              rightIcon ? 'pr-10' : '',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-3 text-[var(--color-text-tertiary)]">
              {rightIcon}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <p
            className={cn(
              'text-xs',
              hasError ? 'text-[var(--color-error)]' : 'text-[var(--color-text-tertiary)]'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'