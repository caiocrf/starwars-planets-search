import React from 'react';
import { act, render, cleanup, waitForElementToBeRemoved, findByText, getByTestId, getAllByRole} from '@testing-library/react';
import App from '../App';
import mock from '../../cypress//mocks/testData'
import userEvent from '@testing-library/user-event';
import Table from '../components/Table';

describe('testando toda a aplicação até os 80% de cobertura',() => {
 beforeEach(() => global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue(mock)}))

 it('testando Table', () => {
  const { getByText} = render(<Table />);

  const climate = getByText(/climate/i);
  expect(climate).toBeInTheDocument();
 });

 it('testando se renderiza os planetas', async () => {
   const { findByText } = render(<Table />);

   const fisrtPlanet = await findByText(/hoth/i);
    expect(fisrtPlanet).toBeInTheDocument();

    const secondPlanet = await findByText(/alderaan/i);
    expect(secondPlanet).toBeInTheDocument();

    const thirdPlanet = await findByText(/Tatooine/i);
    expect(thirdPlanet).toBeInTheDocument();

    const fourthPlanet= await findByText(/Naboo/i);
    expect(fourthPlanet).toBeInTheDocument();

    const fifthPlanet = await findByText(/Dagobah/i);
    expect(fifthPlanet).toBeInTheDocument();

    const sixthPlanet = await findByText(/Tatooine/i);
    expect(sixthPlanet).toBeInTheDocument();

});

it('testando o filtro ao digitar', async () => {
    const { getAllByRole, getByTestId, findByText } = render(<Table />);
    const name = getByTestId(/name-filter/i)
    const Naboo = await findByText(/Naboo/i)
    userEvent.type(name, 'Na')
    const na = getAllByRole('row')
    expect(na).toHaveLength(2);
    expect(Naboo).toBeInTheDocument();
  })

  it('testando se está filtrando normalmente ', async () => {
    const {findByText, getByTestId, getAllByRole } = render (<Table />);
    await findByText(/Naboo/i)
    const column = getByTestId('column-filter')
    userEvent.selectOptions(column, 'surface_water')
    const comparasion = getByTestId(/comparison-filter/i)
    userEvent.selectOptions(comparasion, 'menor que')
    const value = getByTestId(/value-filter/i)
    userEvent.type(value, '40')
    const button = getByTestId(/button-filter/i)
    userEvent.click(button)
    const na = getAllByRole('row')
    expect(na).toHaveLength(7)
  })

  it('testando por id', async () => {
    const { getByTestId, findByRole } = render(<App />);

    const name = getByTestId('name-filter');
    expect(name).toBeInTheDocument();

    const column = getByTestId('column-filter');
    expect(column).toBeInTheDocument();

    const comparison = getByTestId('comparison-filter');
    expect(comparison).toBeInTheDocument();

    const value = getByTestId('value-filter');
    expect(value).toBeInTheDocument();

    const table = await findByRole('table');
    expect(table).toBeInTheDocument();
    
   });
 });
 