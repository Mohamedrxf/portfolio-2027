import { AnimatedCard } from '@/components/animations/AnimatedCard'
import { Input } from '@/components/ui/Input'
import { TextArea } from '@/components/ui/TextArea'
import { Button } from '@/components/ui/Button'

export const ContactForm = () => {
  return (
    <AnimatedCard delay={0.3} cardVariant="default">
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Name"
            placeholder="Your name"
            type="text"
          />

          <Input
            label="Email"
            placeholder="your.email@example.com"
            type="email"
          />

          <Input
            label="Subject"
            placeholder="How can I help you?"
            type="text"
          />

          <TextArea
            label="Message"
            placeholder="Tell me about your project or inquiry..."
            rows={5}
          />
        </div>

        <Button variant="primary" size="md" fullWidth>
          Send Message
        </Button>
      </div>
    </AnimatedCard>
  )
}
