import { Button } from "@/components/ui/button"
import type { Destination } from "@/lib/types"

interface AnswerOptionsProps {
  options: Destination[]
  selectedAnswer: number | null
  isCorrect: boolean | null
  currentDestinationId: number
  onAnswerSelect: (id: number) => void
}

export function AnswerOptions({
  options,
  selectedAnswer,
  isCorrect,
  currentDestinationId,
  onAnswerSelect,
}: AnswerOptionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      {options.map((option) => (
        <Button
          key={option.id}
          variant={
            selectedAnswer === option.id
              ? isCorrect
                ? "success"
                : "destructive"
              : selectedAnswer !== null && option.id === currentDestinationId
                ? "success"
                : "outline"
          }
          className={`h-auto py-3 px-4 text-left justify-start ${
            selectedAnswer === null
              ? "hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300"
              : ""
          }`}
          onClick={() => onAnswerSelect(option.id)}
          disabled={selectedAnswer !== null}
        >
          <div className="flex items-center">
            <span className="font-semibold">{option.city}</span>
            <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">{option.country}</span>
          </div>
        </Button>
      ))}
    </div>
  )
} 