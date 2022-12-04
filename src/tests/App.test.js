import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';

describe('Testa o componente Table', () => {
    beforeEach(() => global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData)
    }))
  
    it('Testa os inputs e selects ', async () => {
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

      it('testando o maior que em população', async () => {
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

      it('testando o component Order', async () => {
        render(<App />);
        const inputAsc = screen.getByTestId('column-sort-input-asc')
        const inputDes = screen.getByTestId('column-sort-input-desc')
        const ordenar = screen.getByTestId('column-sort-button');
        const columnSort = screen.getByTestId('column-sort')

        userEvent.type(inputAsc, 'Acendente');
        userEvent.type(inputDes, 'Descendente');
        userEvent.type(ordenar, 'Ordenar');
        userEvent.selectOptions(columnSort, 'diameter');
      });

      it('Testa o menor que em população', async () => {
        render(<App />);
        await screen.findByText('Bespin');
    
        const column = screen.getByTestId('column-filter');
        const comparasion = screen.getByTestId('comparison-filter');
        const number = screen.getByTestId('value-filter');
        const button = screen.getByTestId('button-filter');
    
        userEvent.selectOptions(column, 'population');
        userEvent.selectOptions(comparasion, 'menor que');
        userEvent.type(number, '3000');
        userEvent.click(button);
    
        const yavinIV = await screen.findByText('Yavin IV');
        const rows = screen.getAllByRole('row');
    
        expect(rows).toHaveLength(2)
        expect(yavinIV).toBeInTheDocument();
      });
});