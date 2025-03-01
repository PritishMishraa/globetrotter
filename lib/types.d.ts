export type Destination = {
  id: number
  city: string
  country: string
  clues: string[]
  fun_fact: string[]
  trivia: string[]
} 

export type GameScore = {
  correct: number
  incorrect: number
  total: number
}

export type GameState = {
  currentDestination: Destination | null
  options: Destination[]
  selectedAnswer: number | null
  isCorrect: boolean | null
  showConfetti: boolean
  score: GameScore
  username: string
} 