import { AnimatedImage } from '@/components/animations/AnimatedImage'
import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

export const AboutImage = () => {
  return (
    <AnimatedContainer delay={0.1} className="flex justify-center lg:justify-start">
      <div className="relative w-full max-w-md aspect-square">
        <AnimatedImage
          src="/placeholder-about.jpg"
          alt="About section image placeholder"
          className="w-full h-full object-cover rounded-2xl"
          fadeIn={true}
          scale={true}
          delay={0.2}
          lazy={true}
        />
      </div>
    </AnimatedContainer>
  )
}
