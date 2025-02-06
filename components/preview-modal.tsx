import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  embedCode: string
}

export default function PreviewModal({ isOpen, onClose, embedCode }: PreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preview Embedded Content</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <iframe
            srcDoc={`
              <html>
                <head>
                  <style>
                    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
                  </style>
                </head>
                <body>
                  ${embedCode}
                  <div id="embed-content"></div>
                </body>
              </html>
            `}
            className="w-full h-64 border-0"
            title="Embedded Content Preview"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

