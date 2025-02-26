import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import type { Advertisement } from '@/payload-types'

export const AdBlock: React.FC<Advertisement> = async (props) => {
  const { contentType, image, richTextContent, aspectRatio } = props

  const aspect = aspectRatio || '720/90'
  const [width, height] = aspect.split('/').map(Number)
  const cardStyles = { width: `${width}px`, height: `${height}px`, overflow: 'hidden' }

  return (
    <Card className="w-full max-w-4xl mx-auto" style={cardStyles}>
      <CardContent className="text-center w-full h-full flex flex-col">
        <p className="text-xs tracking-wide uppercase">Advertisement</p>
        <div
          className="w-full h-full rounded-md overflow-hidden border border-gray-300"
          // style={cardStyles}
        >
          {contentType === 'richText' && richTextContent ? (
            <div className="w-full h-full overflow-auto">
              <RichText data={richTextContent} enableGutter={false} enableProse={false} />
            </div>
          ) : image ? (
            <Media
              resource={image}
              imgClassName="object-cover p-0 m-0"
              className="w-full h-full p-0 m-0 object-cover"
            />
          ) : (
            <p className="text-sm italic">Ad Space Available</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
