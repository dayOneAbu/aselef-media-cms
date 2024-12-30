import Image from 'next/image'
import { cn } from '@/utilities/cn'

interface HeroSectionProps {
  title: string
  description: string
  layout: 'textLeft' | 'textRight'
  image: string
}

export function HeroImageGrid({ title, description, layout, image }: HeroSectionProps) {
  return (
    <div className="relative min-h-[400px] md:min-h-[600px] flex flex-col md:flex-row">
      {/* Text Section */}
      <div
        className={cn(
          'w-full md:w-2/3 flex flex-col justify-center p-6 md:p-12 relative z-10 order-2 md:order-none',
          {
            'md:order-1': layout === 'textLeft',
            'md:order-2': layout === 'textRight',
          },
        )}
      >
        <div className="backdrop-blur-sm bg-background/20 p-6 md:p-8 rounded-lg">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">{title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* Image Section */}
      <div
        className={cn('w-full h-[300px] md:h-full md:w-2/3 relative order-1 md:absolute md:top-0', {
          'md:left-0': layout === 'textRight',
          'md:right-0': layout === 'textLeft',
        })}
      >
        <Image src={image} alt={title} fill className="object-cover" priority />
      </div>
    </div>
  )
}
