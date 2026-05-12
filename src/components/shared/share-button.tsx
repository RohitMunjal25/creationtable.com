'use client'

import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

export function ShareButton() {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast({
        title: 'URL copied!',
        description: 'The page URL has been copied to your clipboard.',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: 'Failed to copy',
        description: 'Unable to copy the URL to clipboard.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={handleShare}>
      <Share2 className="h-4 w-4" />
      {copied ? 'Copied!' : 'Share'}
    </Button>
  )
}
