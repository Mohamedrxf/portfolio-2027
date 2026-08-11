import { useState } from 'react'
import { SpotlightCard } from '@/components/animations/SpotlightCard'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { Input } from '@/components/ui/Input'
import { TextArea } from '@/components/ui/TextArea'

type FormState = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export const ContactForm = () => {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    } else if (formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormState('loading')

    try {
      // TODO: Integrate EmailJS here
      // Example implementation:
      // import emailjs from '@emailjs/browser'
      // await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   {
      //     from_name: formData.name,
      //     from_email: formData.email,
      //     subject: formData.subject,
      //     message: formData.message,
      //   },
      //   'YOUR_PUBLIC_KEY'
      // )

      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000))

      setFormState('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (_error) {
      setFormState('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const resetForm = () => {
    setFormState('idle')
    setErrors({})
  }

  return (
    <SpotlightCard className="h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-white/10">
      <div className="space-y-6">
        {formState === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <MagneticButton variant="primary" size="md" onClick={resetForm}>
              Send Another Message
            </MagneticButton>
          </div>
        ) : formState === 'error' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
              Something Went Wrong
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              There was an error sending your message. Please try again or contact me directly via email.
            </p>
            <MagneticButton variant="primary" size="md" onClick={resetForm}>
              Try Again
            </MagneticButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              placeholder="Your name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              disabled={formState === 'loading'}
            />

            <Input
              label="Email"
              placeholder="your.email@example.com"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              disabled={formState === 'loading'}
            />

            <Input
              label="Subject"
              placeholder="How can I help you?"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              error={errors.subject}
              required
              disabled={formState === 'loading'}
            />

            <TextArea
              label="Message"
              placeholder="Tell me about your project or inquiry..."
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
              required
              disabled={formState === 'loading'}
            />

            <MagneticButton
              variant="primary"
              size="md"
              fullWidth
              type="submit"
              disabled={formState === 'loading'}
            >
              {formState === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </MagneticButton>
          </form>
        )}
      </div>
    </SpotlightCard>
  )
}
