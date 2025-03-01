import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { GameScore } from "@/lib/types"

interface ProfileProps {
  username: string
  score: GameScore
}

export function Profile({ username, score }: ProfileProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Track your progress and challenge friends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={username ? `https://api.dicebear.com/7.x/initials/svg?seed=${username}` : undefined} />
            <AvatarFallback className="text-lg">
              {username ? username.substring(0, 2).toUpperCase() : "GT"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{username || "Anonymous Traveler"}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {score.total > 0
                ? `You've explored ${score.total} destinations with ${score.correct} correct guesses!`
                : "Start guessing to build your travel profile!"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 