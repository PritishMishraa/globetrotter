import { Trophy, X } from "lucide-react"
import type { Destination } from "@/lib/types"

interface FeedbackAreaProps {
  selectedAnswer: number | null
  isCorrect: boolean | null
  currentDestination: Destination
}

export function FeedbackArea({ selectedAnswer, isCorrect, currentDestination }: FeedbackAreaProps) {
  if (selectedAnswer === null) return null

  return (
    <div
      className={`p-4 rounded-lg mb-4 ${
        isCorrect
          ? "bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-900"
          : "bg-red-50 border border-red-200 dark:bg-red-950 dark:border-red-900"
      }`}
    >
      <div className="flex items-start">
        <div
          className={`rounded-full p-2 mr-3 ${
            isCorrect
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
          }`}
        >
          {isCorrect ? <Trophy className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </div>
        <div>
          <h4
            className={`font-bold ${
              isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
            }`}
          >
            {isCorrect ? "Correct!" : "Not quite right!"}
          </h4>
          <p className="text-sm mt-1">
            {isCorrect
              ? `Great job! ${currentDestination.fun_fact[0]}`
              : `The correct answer was ${currentDestination.city}. ${currentDestination.fun_fact[0]}`}
          </p>
        </div>
      </div>
    </div>
  )
} 