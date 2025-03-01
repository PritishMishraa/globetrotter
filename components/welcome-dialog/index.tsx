import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

interface WelcomeDialogProps {
  challenger: string
  score: string
  onClose: () => void
}

export function WelcomeDialog({ challenger, score, onClose }: WelcomeDialogProps) {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Challenge Accepted!
          </DialogTitle>
          <DialogDescription className="pt-2">
            <p className="mb-2">
              {challenger} has challenged you to beat their score of {score}!
            </p>
            <p>
              Test your geography knowledge and see if you can become the ultimate
              Globetrotter.
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={handleClose}>Let&apos;s Play!</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 