import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';

describe('Testa o componente Table', () => {
    beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    }))
  
    it('Testa se todos os inputs e selects de filtros são renderizados', async () => {
      render(<App />)
      const name = screen.getByTestId('name-filter')
      const column = screen.getByTestId('column-filter');
      const comparison = screen.getByTestId('comparison-filter');
      const value = screen.getByTestId('value-filter');
      const button = screen.getByTestId('button-filter');

      expect(button).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(value).toBeInTheDocument();
      expect(column).toBeInTheDocument();
      expect(column).toBeInTheDocument();
      expect(comparison).toBeInTheDocument();
    });

    it('testando o input de filtrar por nome', async () => {
        render(<App />);
        const input = screen.getByTestId('name-filter')
        userEvent.type(input, 'Bes')
        const bespin = await screen.findByText('Bespin')
    
        expect(bespin).toBeInTheDocument();
      });

      it('', async () => {
        render(<App />);
        await screen.findByText('Bespin');

        const button = screen.getByTestId('button-filter');
        const column = screen.getByTestId('column-filter');
        const comparasion = screen.getByTestId('comparison-filter');
        const number = screen.getByTestId('value-filter');
        
    
        userEvent.selectOptions(column, 'diameter');
        userEvent.selectOptions(comparasion, 'maior que');
        userEvent.type(number, '15000');
        userEvent.click(button);
    
        const bespinPlanet = await screen.findByText('Bespin');
        const kaminoPlanet = await screen.findByText('Kamino');
        const rows = screen.getAllByRole('row');
    
        expect(bespinPlanet).toBeInTheDocument();
        expect(kaminoPlanet).toBeInTheDocument();
        expect(rows).toHaveLength(3);
      });

    
});