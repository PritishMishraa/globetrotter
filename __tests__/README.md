# Globetrotter Tests

This directory contains unit tests for the Globetrotter application.

## Test Structure

The tests are organized into the following directories:

- `__tests__/hooks`: Tests for React hooks
- `__tests__/components`: Tests for React components
- `__tests__/api`: Tests for API routes
- `__tests__/lib`: Tests for utility functions

## Running Tests

To run all tests:

```bash
pnpm test
```

To run tests in watch mode (useful during development):

```bash
pnpm test:watch
```

To run a specific test file:

```bash
pnpm test -- path/to/test-file.test.ts
```

## Testing Strategy

### Component Tests

Component tests verify that UI components render correctly and respond appropriately to user interactions. We use React Testing Library for these tests, which encourages testing components in a way that resembles how users interact with them.

### Hook Tests

Hook tests verify that custom React hooks manage state correctly and respond appropriately to various inputs and events. We use React Testing Library's `renderHook` utility for these tests.

### API Tests

API tests verify that API routes handle requests correctly and return appropriate responses. We mock external dependencies like the database to isolate the API logic.

### Utility Tests

Utility tests verify that utility functions produce the expected output for various inputs.

## Mocking

We use Jest's mocking capabilities to isolate the code being tested from its dependencies. This includes:

- Mocking API calls using `jest.fn()` and `mockResolvedValue`
- Mocking React hooks using `jest.mock()`
- Mocking Next.js features like `useRouter` and `useSearchParams`

## Test Coverage

To generate a test coverage report:

```bash
pnpm test -- --coverage
```

This will generate a coverage report in the `coverage` directory. 