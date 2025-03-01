import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { GameScore } from "@/lib/types"

interface ProgressCardProps {
  score: GameScore
}

export function ProgressCard({ score }: ProgressCardProps) {
  const progressPercentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0

  return (
    <Card className="md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
            <span>{progressPercentage}% Correct</span>
            <span>{score.total} Questions Answered</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 