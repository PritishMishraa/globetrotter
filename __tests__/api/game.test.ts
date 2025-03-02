import { GET, POST } from '@/app/api/game/route';
import { NextResponse } from 'next/server';

// Create a shared cookie mock instance
const cookieMock = {
    set: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
};

jest.mock('next/headers', () => ({
    cookies: () => cookieMock,
}));

// Mock the destination data
jest.mock('@/data.json', () => [
    {
        id: 1,
        city: 'Paris',
        country: 'France',
        clues: ['Clue 1', 'Clue 2'],
        fun_fact: ['Fun fact 1'],
        trivia: ['Trivia 1']
    },
    {
        id: 2,
        city: 'London',
        country: 'United Kingdom',
        clues: ['Clue 3', 'Clue 4'],
        fun_fact: ['Fun fact 2'],
        trivia: ['Trivia 2']
    },
    {
        id: 3,
        city: 'Berlin',
        country: 'Germany',
        clues: ['Clue 5', 'Clue 6'],
        fun_fact: ['Fun fact 3'],
        trivia: ['Trivia 3']
    },
    {
        id: 4,
        city: 'Rome',
        country: 'Italy',
        clues: ['Clue 7', 'Clue 8'],
        fun_fact: ['Fun fact 4'],
        trivia: ['Trivia 4']
    },
    {
        id: 5,
        city: 'Madrid',
        country: 'Spain',
        clues: ['Clue 9', 'Clue 10'],
        fun_fact: ['Fun fact 5'],
        trivia: ['Trivia 5']
    },
    {
        id: 6,
        city: 'Tokyo',
        country: 'Japan',
        clues: ['Clue 11', 'Clue 12'],
        fun_fact: ['Fun fact 6'],
        trivia: ['Trivia 6']
    }
]);

// Define the cookie name to match the implementation
const COOKIE_NAME = 'cdi';

// Mock the global atob and btoa functions
global.atob = jest.fn((str) => Buffer.from(str, 'base64').toString());
global.btoa = jest.fn((str) => Buffer.from(str).toString('base64'));

// Mock NextResponse
jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn((data) => data)
    }
}));

describe('Game API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET', () => {
        test('should return a destination with clues and options', async () => {
            const response = await GET() as unknown as {
                currentDestination: { clues: string[] };
                options: { id: number; city: string; country: string }[];
            };

            // Check that cookies.set was called on our shared cookieMock
            expect(cookieMock.set).toHaveBeenCalled();

            // Check that NextResponse.json was called with the correct structure
            expect(NextResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    currentDestination: expect.objectContaining({
                        clues: expect.any(Array)
                    }),
                    options: expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            city: expect.any(String),
                            country: expect.any(String)
                        })
                    ])
                })
            );

            // Check that options array has 4 items
            expect(response.options.length).toBe(4);
        });
    });

    describe('POST', () => {
        test('should return correct result for correct answer', async () => {
            // Mock the cookie to return the correct ID (btoa('1'))
            cookieMock.get.mockReturnValueOnce({ value: 'MQ==' });

            const request = {
                json: jest.fn().mockResolvedValueOnce({ answerId: 1 })
            } as unknown as Request;

            await POST(request);

            // Check that cookies.delete was called with the correct cookie name
            expect(cookieMock.delete).toHaveBeenCalledWith(COOKIE_NAME);

            // Check that NextResponse.json was called with the correct structure
            expect(NextResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    isCorrect: true,
                    destination: expect.objectContaining({
                        id: 1,
                        city: 'Paris',
                        country: 'France'
                    })
                })
            );
        });

        test('should return incorrect result for wrong answer', async () => {
            // Mock the cookie to return the correct ID (btoa('1'))
            cookieMock.get.mockReturnValueOnce({ value: 'MQ==' });

            const request = {
                json: jest.fn().mockResolvedValueOnce({ answerId: 2 })
            } as unknown as Request;

            await POST(request);

            // Check that NextResponse.json was called with the correct structure
            expect(NextResponse.json).toHaveBeenCalledWith(
                expect.objectContaining({
                    isCorrect: false,
                    destination: expect.objectContaining({
                        id: 1,
                        city: 'Paris',
                        country: 'France'
                    })
                })
            );
        });

        test('should return error when no cookie is present', async () => {
            // Mock the cookie to return undefined
            cookieMock.get.mockReturnValueOnce(undefined);

            const request = {
                json: jest.fn().mockResolvedValueOnce({ answerId: 1 })
            } as unknown as Request;

            await POST(request);

            // Check that NextResponse.json was called with an error
            expect(NextResponse.json).toHaveBeenCalledWith(
                { error: "No active game session" },
                { status: 400 }
            );
        });
    });
});
