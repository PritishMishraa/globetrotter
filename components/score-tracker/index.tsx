import { ScoreCard } from "@/components/score-tracker/score-card"
import { ProgressCard } from "@/components/score-tracker/progress-card"
import type { GameScore } from "@/lib/types"

interface ScoreTrackerProps {
  score: GameScore
}

export function ScoreTracker({ score }: ScoreTrackerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <ScoreCard score={score} />
      <ProgressCard score={score} />
    </div>
  )
} 