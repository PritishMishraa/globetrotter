import { renderHook, act, waitFor } from '@testing-library/react';
import { useGameState } from '@/hooks/use-game-state';

// Mock fetch
global.fetch = jest.fn();

describe('useGameState', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockDestination = {
        id: 1,
        city: 'Paris',
        country: 'France',
        clues: ['Clue 1', 'Clue 2'],
        fun_fact: ['Fun fact 1'],
        trivia: ['Trivia 1']
    };

    const mockOptions = [
        { id: 1, city: 'Paris', country: 'France' },
        { id: 2, city: 'London', country: 'United Kingdom' },
        { id: 3, city: 'Berlin', country: 'Germany' },
        { id: 4, city: 'Rome', country: 'Italy' }
    ];

    test('should initialize with default state', async () => {
        // Mock the initial API call
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                currentDestination: {
                    clues: mockDestination.clues
                },
                options: mockOptions
            })
        });

        const { result } = renderHook(() => useGameState());

        // Initial state should have default values
        expect(result.current.gameState).toEqual({
            currentDestination: null,
            options: [],
            selectedAnswer: null,
            isCorrect: null,
            showConfetti: false,
            score: { correct: 0, incorrect: 0, total: 0 },
            username: ""
        });

        // Wait for the useEffect to complete
        await waitFor(() => {
            expect(result.current.gameState.options.length).toBe(4);
        });

        // After the API call, state should be updated
        expect(result.current.gameState.currentDestination).toEqual({
            id: -1,
            city: '',
            country: '',
            clues: mockDestination.clues,
            fun_fact: [],
            trivia: []
        });
        expect(result.current.gameState.options.length).toBe(4);
    });

    test('should handle startNewRound correctly', async () => {
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                currentDestination: {
                    clues: mockDestination.clues
                },
                options: mockOptions
            })
        });

        // Mock the API call for startNewRound
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                currentDestination: {
                    clues: ['New Clue 1', 'New Clue 2']
                },
                options: mockOptions
            })
        });

        const { result } = renderHook(() => useGameState());

        // Wait for initial useEffect to complete
        await waitFor(() => {
            expect(result.current.gameState.options.length).toBe(4);
        });

        // Call startNewRound
        await act(async () => {
            await result.current.startNewRound();
        });

        // Verify that fetch was called again
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenLastCalledWith('/api/game');

        // Verify state was updated
        expect(result.current.gameState.currentDestination?.clues).toEqual(['New Clue 1', 'New Clue 2']);
    });

    test('should handle answer selection correctly - correct answer', async () => {
        // Mock initial API call
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                currentDestination: {
                    clues: mockDestination.clues
                },
                options: mockOptions
            })
        });

        // Mock the API call for answer selection - correct answer
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                isCorrect: true,
                destination: mockDestination
            })
        });

        const { result } = renderHook(() => useGameState());

        // Wait for initial useEffect to complete
        await waitFor(() => {
            expect(result.current.gameState.options.length).toBe(4);
        });

        // Select an answer
        await act(async () => {
            await result.current.handleAnswerSelect(1);
        });

        // Verify that fetch was called with correct parameters
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenLastCalledWith('/api/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answerId: 1 }),
        });

        // Verify state was updated correctly
        expect(result.current.gameState.selectedAnswer).toBe(1);
        expect(result.current.gameState.isCorrect).toBe(true);
        expect(result.current.gameState.showConfetti).toBe(true);
        expect(result.current.gameState.score).toEqual({
            correct: 1,
            incorrect: 0,
            total: 1
        });
    });

    test('should handle answer selection correctly - incorrect answer', async () => {
        // Mock initial API call
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                currentDestination: {
                    clues: mockDestination.clues
                },
                options: mockOptions
            })
        });

        // Mock the API call for answer selection - incorrect answer
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                isCorrect: false,
                destination: mockDestination
            })
        });

        const { result } = renderHook(() => useGameState());

        // Wait for initial useEffect to complete
        await waitFor(() => {
            expect(result.current.gameState.options.length).toBe(4);
        });

        // Select an answer
        await act(async () => {
            await result.current.handleAnswerSelect(2);
        });

        // Verify state was updated correctly
        expect(result.current.gameState.selectedAnswer).toBe(2);
        expect(result.current.gameState.isCorrect).toBe(false);
        expect(result.current.gameState.showConfetti).toBe(false);
        expect(result.current.gameState.score).toEqual({
            correct: 0,
            incorrect: 1,
            total: 1
        });
    });

    test('should set username correctly', async () => {
        // Mock initial API call
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                currentDestination: {
                    clues: mockDestination.clues
                },
                options: mockOptions
            })
        });

        const { result } = renderHook(() => useGameState());

        // Wait for initial useEffect to complete
        await waitFor(() => {
            expect(result.current.gameState.options.length).toBe(4);
        });

        // Set username
        act(() => {
            result.current.setUsername('TestUser');
        });

        // Verify username was updated
        expect(result.current.gameState.username).toBe('TestUser');
    });
}); 