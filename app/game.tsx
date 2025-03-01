"use client"

import { useWindowSize } from "react-use"
import { useSearchParams, useRouter } from "next/navigation"
import Confetti from "react-confetti"
import { Header } from "@/components/header"
import { GameArea } from "@/components/game-area"
import { ScoreTracker } from "@/components/score-tracker"
import { Profile } from "@/components/profile"
import { WelcomeDialog } from "@/components/welcome-dialog"
import { useGameState } from "@/hooks/use-game-state"

export function GlobetrotterGame() {
  const { width, height } = useWindowSize()
  const { gameState, startNewRound, handleAnswerSelect, setUsername } = useGameState()
  const searchParams = useSearchParams()
  const router = useRouter()

  const isChallenge = searchParams.get('challenge')
  const challenger = searchParams.get('username')
  const challengeScore = searchParams.get('score')

  const handleWelcomeClose = () => {
    router.push('/', { scroll: false })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        <GameArea
          gameState={gameState}
          onAnswerSelect={handleAnswerSelect}
          onStartNewRound={startNewRound}
          onUsernameChange={setUsername}
        />
        <ScoreTracker score={gameState.score} />
        <Profile username={gameState.username} score={gameState.score} />
        {gameState.showConfetti && (
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.2}
          />
        )}
        {isChallenge && challenger && challengeScore && (
          <WelcomeDialog
            challenger={challenger}
            score={challengeScore}
            onClose={handleWelcomeClose}
          />
        )}
      </div>
    </main>
  )
} 