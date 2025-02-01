'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Copy } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import { useIntl } from 'react-intl'

interface ShareDialogProps {
  isOpen: boolean
  onClose: () => void
  shareUrl: string
}

export function ShareDialog({ isOpen, onClose, shareUrl }: ShareDialogProps) {
  const intl = useIntl()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast({
        title: intl.formatMessage({ id: 'linkCopied' }),
        description: intl.formatMessage({ id: 'linkCopiedDescription' })
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: intl.formatMessage({ id: 'copyError' }),
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{intl.formatMessage({ id: 'shareItinerary' })}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground">
            {intl.formatMessage({ id: 'shareDescription' })}
          </p>
          <div className="flex items-center space-x-2">
            <Input
              value={shareUrl}
              readOnly
              className="flex-1"
            />
            <Button
              size="icon"
              onClick={copyToClipboard}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

