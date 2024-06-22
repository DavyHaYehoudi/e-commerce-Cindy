import React from 'react';
import {fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { render } from '../../../../../test/utils';
import ActionsDropdown from './ActionsDropdown';

describe('ActionsDropdown Component', () => {
  const mockHandleSendToClient = jest.fn();

  test('renders correctly', () => {
    const order = {
      id: '1mongoDb',
    };
    const client = {
      id: '1mongoDb',
    };

    render(
      <ActionsDropdown
        order={order}
        step={5}
        client={client}
        handleSendToClient={mockHandleSendToClient}
        isClientNotified={false}
        lastSentDateToClient={null}
      />
    );

    expect(screen.getByTestId('actions-dropdown')).toBeInTheDocument();
  });

  test('toggles dropdown on button click', () => {
    const order = {
      id: '1mongoDb',
    };
    const client = {
      id: '1mongoDb',
    };

    render(
      <ActionsDropdown
        order={order}
        step={5}
        client={client}
        handleSendToClient={mockHandleSendToClient}
        isClientNotified={false}
        lastSentDateToClient={null}
      />
    );

    const toggleButton = screen.getByLabelText('Liste d\'actions possibles');
    fireEvent.click(toggleButton);

    expect(screen.getByTestId('actions-dropdown')).toHaveClass('open');
  });

  test('dispatches moveToNextStep action on "Passer à l\'étape suivante" button click', () => {
    const order = {
      id: '1mongoDb',
    };
    const client = {
      id: '1mongoDb',
    };

    render(
      <ActionsDropdown
        order={order}
        step={5}
        client={client}
        handleSendToClient={mockHandleSendToClient}
        isClientNotified={false}
        lastSentDateToClient={null}
      />
    );

    fireEvent.click(screen.getByText(/Passer à l'étape suivante/i));
  });
}); 
 