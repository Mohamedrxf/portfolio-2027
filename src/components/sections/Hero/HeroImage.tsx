import { AnimatedImage } from '@/components/animations/AnimatedImage'
import { AnimatedContainer } from '@/components/animations/AnimatedContainer'

export const HeroImage = () => {
  return (
    <AnimatedContainer delay={0.4} className="flex justify-center lg:justify-end">
      <div className="relative w-full max-w-md aspect-square">
        <AnimatedImage
          src="/placeholder-profile.jpg"
          alt="Profile portrait"
          className="w-full h-full object-cover rounded-2xl"
          fadeIn={true}
          scale={true}
          delay={0.5}
          lazy={false}
        />
      </div>
    </AnimatedContainer>
  )
}
