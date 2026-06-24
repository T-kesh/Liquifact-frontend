import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './page';

// These tests mock `global.fetch` to simulate the backend health endpoint.
// We assert the loading label, disabled button state, and rendered JSON output.

describe('Home page API health check', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders health JSON on successful fetch and toggles button label', async () => {
    const mockResponse = { status: 'ok', uptime: 12345 };

    // Mock fetch to resolve with a JSON payload
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      }),
    );

    render(<Home />);

    const user = userEvent.setup();
    const checkButton = screen.getByRole('button', { name: /check backend health/i });

    // Click triggers loading state
    await user.click(checkButton);

    // Button should show checking label and be disabled while loading
    const loadingButton = screen.getByRole('button', { name: /checking…/i });
    expect(loadingButton).toBeDisabled();

    // Wait for the JSON blob to render inside the <pre>
    const jsonNode = await screen.findByText(/"status": "ok"/i);
    expect(jsonNode).toBeInTheDocument();

    // After resolution the button returns to its idle state and is enabled
    const idleButton = await screen.findByRole('button', { name: /check backend health/i });
    expect(idleButton).toBeEnabled();
  });

  it('renders error object when fetch rejects', async () => {
    // Mock fetch to reject (network error)
    global.fetch = jest.fn(() => Promise.reject(new Error('network failure')));

    render(<Home />);

    const user = userEvent.setup();
    const checkButton = screen.getByRole('button', { name: /check backend health/i });

    await user.click(checkButton);

    // While loading the button should show the checking label and be disabled
    expect(screen.getByRole('button', { name: /checking…/i })).toBeDisabled();

    // The component sets health to { status: 'error', message }
    const errorNode = await screen.findByText(/"status": "error"/i);
    expect(errorNode).toBeInTheDocument();
    expect(errorNode).toHaveTextContent(/network failure/i);
  });
});
