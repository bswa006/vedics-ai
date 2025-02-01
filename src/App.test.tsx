import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders birth details', () => {
    render(<App />);
    expect(screen.getByText('Birth Date')).toBeInTheDocument();
    expect(screen.getByText('Birth Time')).toBeInTheDocument();
    expect(screen.getByText('Birth Place')).toBeInTheDocument();
  });

  it('renders navigation tabs', () => {
    render(<App />);
    expect(screen.getByText('Personality')).toBeInTheDocument();
    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('Relationships')).toBeInTheDocument();
    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Challenges')).toBeInTheDocument();
    expect(screen.getByText('Life Periods')).toBeInTheDocument();
  });
});
