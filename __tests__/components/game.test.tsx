/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen } from '@testing-library/react';
import { GlobetrotterGame } from '@/components/game';
import { useGameState } from '@/hooks/use-game-state';
import { useSearchParams, useRouter } from 'next/navigation';
import { useWindowSize } from 'react-use';
import { GameScore, GameState } from '@/lib/types';

// Mock the hooks
jest.mock('@/hooks/use-game-state');
jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
    useRouter: jest.fn()
}));
jest.mock('react-use', () => ({
    useWindowSize: jest.fn()
}));

// Mock the components
jest.mock('@/components/header', () => ({
    Header: () => <div data-testid="header">Header</div>
}));
jest.mock('@/components/game-area', () => ({
    GameArea: ({
        onAnswerSelect,
        onStartNewRound,
        onUsernameChange
    }: {
        gameState: GameState;
        onAnswerSelect: (id: number) => void;
        onStartNewRound: () => void;
        onUsernameChange: (name: string) => void;
    }) => (
        <div data-testid="game-area">
            Game Area
            <button data-testid="answer-button" onClick={() => onAnswerSelect(1)}>Select Answer</button>
            <button data-testid="new-round-button" onClick={onStartNewRound}>New Round</button>
            <input
                data-testid="username-input"
                onChange={(e) => onUsernameChange(e.target.value)}
            />
        </div>
    )
}));
jest.mock('@/components/score-tracker', () => ({
    ScoreTracker: ({ score }: { score: GameScore }) => <div data-testid="score-tracker">Score: {score.correct}/{score.total}</div>
}));
jest.mock('@/components/profile', () => ({
    Profile: ({ username, score }: { username: string; score: GameScore }) => (
        <div data-testid="profile">
            Profile: {username}, Score: {score.correct}/{score.total}
        </div>
    )
}));
jest.mock('@/components/welcome-dialog', () => ({
    WelcomeDialog: ({ challenger, score, onClose }: { challenger: string; score: string; onClose: () => void }) => (
        <div data-testid="welcome-dialog">
            Welcome! {challenger} challenged you to beat {score}
            <button data-testid="close-button" onClick={onClose}>Close</button>
        </div>
    )
}));
jest.mock('react-confetti', () => ({
    __esModule: true,
    default: () => <div data-testid="confetti">Confetti</div>
}));

describe('GlobetrotterGame', () => {
    const mockGameState = {
        currentDestination: {
            id: 1,
            city: 'Paris',
            country: 'France',
            clues: ['Clue 1', 'Clue 2'],
            fun_fact: ['Fun fact 1'],
            trivia: ['Trivia 1']
        },
        options: [
            { id: 1, city: 'Paris', country: 'France', clues: [], fun_fact: [], trivia: [] },
            { id: 2, city: 'London', country: 'UK', clues: [], fun_fact: [], trivia: [] }
        ],
        selectedAnswer: null,
        isCorrect: null,
        showConfetti: false,
        score: { correct: 0, incorrect: 0, total: 0 },
        username: 'TestUser'
    };

    const mockStartNewRound = jest.fn();
    const mockHandleAnswerSelect = jest.fn();
    const mockSetUsername = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock useGameState
        (useGameState as jest.Mock).mockReturnValue({
            gameState: mockGameState,
            startNewRound: mockStartNewRound,
            handleAnswerSelect: mockHandleAnswerSelect,
            setUsername: mockSetUsername
        });

        // Mock useSearchParams
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockImplementation((param) => {
                if (param === 'challenge') return null;
                if (param === 'username') return null;
                if (param === 'score') return null;
                return null;
            })
        });

        // Mock useRouter
        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn()
        });

        // Mock useWindowSize
        (useWindowSize as jest.Mock).mockReturnValue({
            width: 1024,
            height: 768
        });
    });

    test('renders the game components', async () => {
        render(<GlobetrotterGame />);

        // Check that all components are rendered
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('game-area')).toBeInTheDocument();
        expect(screen.getByTestId('score-tracker')).toBeInTheDocument();
        expect(screen.getByTestId('profile')).toBeInTheDocument();

        // Confetti should not be visible initially
        expect(screen.queryByTestId('confetti')).not.toBeInTheDocument();

        // Welcome dialog should not be visible without challenge params
        expect(screen.queryByTestId('welcome-dialog')).not.toBeInTheDocument();
    });

    test('shows confetti when answer is correct', async () => {
        // Update the mock to show confetti
        (useGameState as jest.Mock).mockReturnValue({
            gameState: { ...mockGameState, showConfetti: true },
            startNewRound: mockStartNewRound,
            handleAnswerSelect: mockHandleAnswerSelect,
            setUsername: mockSetUsername
        });

        render(<GlobetrotterGame />);

        // Confetti should be visible
        expect(screen.getByTestId('confetti')).toBeInTheDocument();
    });

    test('shows welcome dialog when challenge params are present', async () => {
        // Update the mock to include challenge params
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockImplementation((param) => {
                if (param === 'challenge') return 'true';
                if (param === 'username') return 'Challenger';
                if (param === 'score') return '5/10';
                return null;
            })
        });

        render(<GlobetrotterGame />);

        // Welcome dialog should be visible
        expect(screen.getByTestId('welcome-dialog')).toBeInTheDocument();
    });

    test('handles welcome dialog close', async () => {
        // Update the mock to include challenge params
        (useSearchParams as jest.Mock).mockReturnValue({
            get: jest.fn().mockImplementation((param) => {
                if (param === 'challenge') return 'true';
                if (param === 'username') return 'Challenger';
                if (param === 'score') return '5/10';
                return null;
            })
        });

        const mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush
        });

        render(<GlobetrotterGame />);

        // Click the close button
        screen.getByTestId('close-button').click();

        // Check that router.push was called
        expect(mockPush).toHaveBeenCalledWith('/', { scroll: false });
    });
}); 