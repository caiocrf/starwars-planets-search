import React, { useContext, useEffect, useState } from 'react';
import Order from './Order';
import StarWarsContext from '../contex/StarWarsContex';

function Filters() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columnOptions, setColumnOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const infoColumns = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];

  const {
    filterByName,
    setFilterByName,
    filterByNumberValues,
    setFilterByNumberValues,
  } = useContext(StarWarsContext);

  useEffect(() => {
    const verifyColumns = () => {
      if (filterByNumberValues.length > 0) {
        setColumnOptions(columnOptions.filter((type) => !filterByNumberValues
          .some(({ column: filterColumnValue }) => type === filterColumnValue)));
      } else {
        setColumnOptions(infoColumns);
      }
    };
    verifyColumns();
  }, [filterByNumberValues, setFilterByNumberValues]);

  const handleRemoveFilter = (index) => {
    const currentFilters = [...filterByNumberValues];
    currentFilters.splice(index, 1);
    setFilterByNumberValues(currentFilters);
  };

  const formSubmit = (filterTypes) => {
    const { column: coluna, comparison: comparação, value: valor } = filterTypes;
    setFilterByNumberValues([...filterByNumberValues, {
      column: coluna,
      comparison: comparação,
      value: valor,
    }]);
    const index = columnOptions.indexOf(column) + 1;
    if (columnOptions.length > index) {
      setColumn(columnOptions[index]);
    }
  };
  return (
    <section>
      <div>
        <label htmlFor="name-filter">
          <input
            data-testid="name-filter"
            value={ filterByName.name }
            onChange={ ({ target }) => setFilterByName({ name: target.value }) }
          />
        </label>
      </div>
      <div>
        <label htmlFor="column">
          Column
          <select
            data-testid="column-filter"
            value={ column }
            onChange={ ({ target }) => setColumn(target.value) }
          >
            { columnOptions.map((option) => (
              <option key={ option } value={ option }>{ option }</option>
            )) }
          </select>
        </label>
        <label htmlFor="comparison">
          Operator
          <select
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ ({ target }) => setComparison(target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            data-testid="value-filter"
            type="number"
            value={ value }
            onChange={ ({ target }) => setValue(target.value) }
          />
        </label>
        <div>
          <button
            type="button"
            onClick={ () => formSubmit({ column, comparison, value }) }
            data-testid="button-filter"
          >
            FILTRAR
          </button>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => setFilterByNumberValues([]) }
          >
            Remover Filtros
          </button>
        </div>
      </div>

      <Order />
      <section>
        { filterByNumberValues.map((filter, index) => (
          <div key={ filter.column } data-testid="filter">
            <p>{ filter.column }</p>
            <p>{ filter.comparison }</p>
            <p>{ filter.value }</p>
            <button
              type="button"
              onClick={ () => handleRemoveFilter(index) }
            >
              {' '}
            </button>
          </div>
        ))}
      </section>
    </section>
  );
}

export default Filters;
