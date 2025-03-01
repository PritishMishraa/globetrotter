import { NextResponse } from 'next/server'
import DestinationData from "@/data.json"
import type { Destination } from "@/lib/types"

/**
 * Get a random destination from the destination data
 * 
 * This function returns a random destination from the destination data array
 * 
 * @returns A random destination from the destination data array
 */
function getRandomDestination(): Destination {
    return DestinationData[Math.floor(Math.random() * DestinationData.length)]
}

/**
 * Generate options for the current destination
 * 
 * This function generates a list of 4 options for the current destination
 * 
 * @param correctAnswer - The correct answer
 * 
 * @returns A list of 4 options for the current destination
 */
function generateOptions(correctAnswer: Destination): Destination[] {
    const options = [correctAnswer]
    while (options.length < 4) {
        const randomOption = getRandomDestination()
        if (!options.some((option) => option.id === randomOption.id)) {
            options.push(randomOption)
        }
    }
    return options.sort(() => Math.random() - 0.5)
}

export async function GET() {
    const destination = getRandomDestination()
    const options = generateOptions(destination)

    return NextResponse.json({
        currentDestination: {
            id: destination.id,
            clues: destination.clues,
        },
        options: options.map(opt => ({
            id: opt.id,
            city: opt.city,
            country: opt.country
        }))
    })
}

/**
 * POST request handler for the game API
 * 
 * This function handles the submission of an answer and checks if it is correct
 * 
 * @param request - The request object containing the answer ID and correct ID
 * 
 * @returns A JSON response with the result of the answer check
 */
export async function POST(request: Request) {
    const body = await request.json()
    const { answerId, correctId } = body
    const destination = DestinationData.find(d => d.id === correctId)

    if (!destination) {
        return NextResponse.json({ error: "Invalid answer ID" }, { status: 400 })
    }

    return NextResponse.json({
        isCorrect: answerId === correctId,
        destination: destination
    })
} 