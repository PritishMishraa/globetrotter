import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { GameScore } from "@/lib/types"

interface ScoreCardProps {
  score: GameScore
}

export function ScoreCard({ score }: ScoreCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          {score.correct}/{score.total}
        </div>
      </CardContent>
    </Card>
  )
} 