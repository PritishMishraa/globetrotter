import { useState, useEffect } from "react"
import type { GameState } from "../lib/types"

export function useGameState() {
    const [gameState, setGameState] = useState<GameState>({
        currentDestination: null,
        options: [],
        selectedAnswer: null,
        isCorrect: null,
        showConfetti: false,
        score: { correct: 0, incorrect: 0, total: 0 },
        username: ""
    })

    const startNewRound = async () => {
        try {
            const response = await fetch('/api/game')
            const data = await response.json()

            setGameState(prev => ({
                ...prev,
                selectedAnswer: null,
                isCorrect: null,
                showConfetti: false,
                currentDestination: data.currentDestination,
                options: data.options
            }))
        } catch (error) {
            console.error('Failed to fetch new round:', error)
        }
    }

    const handleAnswerSelect = async (id: number) => {
        if (gameState.selectedAnswer !== null || !gameState.currentDestination) return

        try {
            const response = await fetch('/api/game', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    answerId: id,
                    correctId: gameState.currentDestination.id
                }),
            })
            const data = await response.json()

            setGameState(prev => ({
                ...prev,
                selectedAnswer: id,
                isCorrect: data.isCorrect,
                showConfetti: data.isCorrect,
                currentDestination: {
                    ...prev.currentDestination!,
                    fun_fact: [data.funFact]
                },
                score: {
                    ...prev.score,
                    correct: data.isCorrect ? prev.score.correct + 1 : prev.score.correct,
                    incorrect: data.isCorrect ? prev.score.incorrect : prev.score.incorrect + 1,
                    total: prev.score.total + 1
                }
            }))

            if (data.isCorrect) {
                setTimeout(() => setGameState(prev => ({ ...prev, showConfetti: false })), 3000)
            }
        } catch (error) {
            console.error('Failed to submit answer:', error)
        }
    }

    const setUsername = (username: string) => {
        setGameState(prev => ({ ...prev, username }))
    }

    useEffect(() => {
        startNewRound()
    }, [])

    return {
        gameState,
        startNewRound,
        handleAnswerSelect,
        setUsername
    }
} 