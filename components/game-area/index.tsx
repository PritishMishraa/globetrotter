import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShareDialog } from "../share-dialog"

import { AnswerOptions } from "@/components/game-area/answer-options"
import { FeedbackArea } from "@/components/game-area/feedback-area"
import { LoadingSkeleton } from "@/components/game-area/loading-skeleton"
import type { GameState } from "@/lib/types"
import { ClueDisplay } from "./clue-display"

interface GameAreaProps {
  gameState: GameState
  onAnswerSelect: (id: number) => void
  onStartNewRound: () => void
  onUsernameChange: (username: string) => void
}

export function GameArea({ gameState, onAnswerSelect, onStartNewRound, onUsernameChange }: GameAreaProps) {
  if (!gameState.currentDestination) {
    return <LoadingSkeleton />
  }

  return (
    <Card className="mb-8 border-2 border-blue-200 dark:border-blue-900 shadow-lg rounded-t-xl">
      <CardHeader className="bg-blue-50 dark:bg-slate-800 border-b border-blue-100 dark:border-slate-700 rounded-t-xl">
        <CardTitle className="flex items-center justify-between">
          <span>Destination Challenge</span>
          <Badge variant="outline" className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
            Round {gameState.score.total + 1}
          </Badge>
        </CardTitle>
        <CardDescription>Guess the destination based on the clues below</CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <ClueDisplay destination={gameState.currentDestination} />
        <AnswerOptions
          options={gameState.options}
          selectedAnswer={gameState.selectedAnswer}
          isCorrect={gameState.isCorrect}
          currentDestinationId={gameState.currentDestination.id}
          onAnswerSelect={onAnswerSelect}
        />
        <FeedbackArea
          selectedAnswer={gameState.selectedAnswer}
          isCorrect={gameState.isCorrect}
          currentDestination={gameState.currentDestination}
        />
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 p-4 rounded-b-xl">
        <Button className="w-full sm:w-auto" onClick={onStartNewRound}>
          {gameState.selectedAnswer === null ? "Skip This Round" : "Next Destination"}
        </Button>

        <ShareDialog
          username={gameState.username}
          score={gameState.score}
          onUsernameChange={onUsernameChange}
          trigger={
            <Button variant="outline" className="w-full sm:w-auto">
              <Share2 className="mr-2 h-4 w-4" />
              Challenge a Friend
            </Button>
          }
        />
      </CardFooter>
    </Card>
  )
} 