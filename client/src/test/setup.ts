import { vi } from 'vitest';

// Mock environment variables
vi.stubEnv('VITE_BASE_URL', 'https://curvehospitality.com');

// Mock DOM APIs that might not be available in test environment
Object.defineProperty(window, 'location', {
  value: {
    href: 'https://curvehospitality.com',
    pathname: '/',
    search: '',
    hash: ''
  },
  writable: true
});

// Mock document methods
Object.defineProperty(document, 'head', {
  value: {
    appendChild: vi.fn(),
    insertBefore: vi.fn(),
    querySelector: vi.fn(),
    querySelectorAll: vi.fn(() => [])
  },
  writable: true
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn()
};