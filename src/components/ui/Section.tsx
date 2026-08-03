import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Container } from './Container'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'surface' | 'surface-elevated' | 'primary' | 'secondary'
  withContainer?: boolean
  containerPadding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      spacing = 'md',
      background = 'default',
      withContainer = true,
      containerPadding = 'md',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const spacingStyles = {
      none: 'py-0',
      sm: 'py-8',
      md: 'py-16',
      lg: 'py-24',
      xl: 'py-32',
    }

    const backgroundStyles = {
      default: 'bg-[var(--color-background)]',
      surface: 'bg-[var(--color-surface)]',
      'surface-elevated': 'bg-[var(--color-surface-elevated)]',
      primary: 'bg-[var(--color-primary)]',
      secondary: 'bg-[var(--color-secondary)]',
    }

    const content = withContainer ? (
      <Container padding={containerPadding}>{children}</Container>
    ) : (
      children
    )

    return (
      <section
        ref={ref}
        className={cn(
          spacingStyles[spacing],
          backgroundStyles[background],
          className
        )}
        {...props}
      >
        {content}
      </section>
    )
  }
)

Section.displayName = 'Section'
