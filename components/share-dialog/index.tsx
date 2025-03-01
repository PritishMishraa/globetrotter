import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe, MessageCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import type { GameScore } from "@/lib/types"

interface ShareDialogProps {
  username: string
  score: GameScore
  onUsernameChange: (username: string) => void
  trigger: React.ReactNode
}

export function ShareDialog({ username, score, onUsernameChange, trigger }: ShareDialogProps) {
  // Add a check for valid username
  const isValidUsername = username && username.trim() !== ''

  // Generate the share URL with username and score
  const shareUrl = new URL(window.location.origin);
  shareUrl.searchParams.set('challenge', 'true');
  shareUrl.searchParams.set('username', username || 'Anonymous');
  shareUrl.searchParams.set('score', `${score.correct}/${score.total}`);

  // Handle copying the link
  const handleCopyLink = async () => {
    if (!isValidUsername) {
      toast.error('Please enter a username first', {
        description: 'You need a username to share your score.',
      })
      return
    }

    try {
      await navigator.clipboard.writeText(shareUrl.toString())
      toast.success('Link copied!', {
        description: 'Share it with your friends to challenge them.',
      })
    } catch (err) {
      console.error(err)
      toast.error('Failed to copy link', {
        description: 'Please try again.',
      })
    }
  }

  // Handle WhatsApp sharing
  const handleWhatsAppShare = () => {
    if (!isValidUsername) {
      toast.error('Please enter a username first', {
        description: 'You need a username to share your score.',
      })
      return
    }

    const text = `Can you beat my Globetrotter Challenge score? I got ${score.correct}/${score.total} correct! Try it here:`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl.toString())}`
    window.open(whatsappUrl, '_blank')
  }

  // Handle general sharing
  const handleShare = async () => {
    if (!isValidUsername) {
      toast.error('Please enter a username first', {
        description: 'You need a username to share your score.',
      })
      return
    }

    const shareData = {
      title: 'Globetrotter Challenge',
      text: `Can you beat ${username}'s score of ${score.correct}/${score.total}?`,
      url: shareUrl.toString(),
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        throw new Error('Web Share API not supported')
      }
    } catch (err) {
      console.error(err)
      // Fallback to copying the link if sharing fails
      handleCopyLink()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Challenge a Friend</DialogTitle>
          <DialogDescription>
            Share your Globetrotter Challenge with friends and see who can score higher!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Input
              id="username"
              placeholder="Enter your username (required to share)"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
            />
            {!isValidUsername && (
              <p className="text-sm text-red-500">
                Please enter a valid username to share your score
              </p>
            )}
          </div>
          <div className="relative aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <Globe className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="text-xl font-bold">Globetrotter Challenge</h3>
              <p className="text-sm mt-2">
                {username || "Anonymous"} has challenged you to beat their score of {score.correct}/{score.total}!
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            className="sm:w-auto" 
            onClick={handleCopyLink}
            disabled={!isValidUsername}
          >
            Copy Link
          </Button>
          <div className="flex gap-2">
            <Button 
              onClick={handleWhatsAppShare}
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center gap-2"
              disabled={!isValidUsername}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button 
              onClick={handleShare}
              disabled={!isValidUsername}
            >
              Share
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 