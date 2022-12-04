import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../contex/StarWarsContex';

function Order() {
  const [columnSorting, setColumnSorting] = useState('population');
  const [sortType, setSortType] = useState('ASC');
  const { order, setOrder, planets, setPlanets } = useContext(StarWarsContext);

  useEffect(() => {
    const less = -1;
    const { sort, column } = order;
    if (sort === 'ASC') {
      const ASC = planets.sort((a, b) => a[column] - b[column]);
      setPlanets([...ASC]);
    } else {
      const DESC = planets.sort((a, b) => {
        if (a[column] === 'unknown') return 1;
        if (b[column] === 'unknown') return less;
        return b[column] - a[column];
      });
      setPlanets([...DESC]);
    }
  }, [order, setPlanets, setOrder]);
  return (
    <section>
      <div>
        <label htmlFor="order">
          Ordenar
          <select
            id="order"
            data-testid="column-sort"
            value={ columnSorting }
            onChange={ (ele) => setColumnSorting(ele.target.value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
      </div>
      <div>
        <label htmlFor="asc">
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            value="ASC"
            checked={ sortType === 'ASC' }
            onChange={ () => setSortType('ASC') }
          />
          Acendente
        </label>
        <label htmlFor="desc">
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            value="DESC"
            checked={ sortType === 'DESC' }
            onChange={ () => setSortType('DESC') }
          />
          Descendente
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ () => setOrder({ column: columnSorting, sort: sortType }) }
      >
        Ordenar
      </button>
    </section>
  );
}

export default Order;
