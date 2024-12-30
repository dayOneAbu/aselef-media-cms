'use client'

import { Card, CardContent } from '../ui/card'

interface AdvertisementBannerProps {
  className?: string
}

export function AdvertisementBanner({ className }: AdvertisementBannerProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="bg-muted/30 rounded-lg p-6 text-center">
          <p className="text-xs text-muted-foreground mb-2">Advertisement</p>
          <div className="aspect-[728/90] bg-muted/20 rounded flex items-center justify-center">
            <p className="text-muted-foreground">Ad Space Available</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
