import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContex';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumberValues, setFilterByNumberValues] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  const [data, setData] = useState([]);

  const fetchPlanets = async () => {
    const request = await fetch('https://swapi.dev/api/planets');
    const result = await request.json();
    return result;
  };

  useEffect(() => {
    fetchPlanets().then((result) => setPlanets(result.results));
    fetchPlanets().then((json) => setData(json));
  }, []);

  useEffect(() => {
    const { results } = data;
    if (results) {
      const filteringPlanets = results
        .filter(
          (ele) => ele.name.toLowerCase().includes(filterByName.name.toLowerCase()),
        );
      setPlanets(filterByNumberValues.reduce((acumulador, filter) => acumulador
        .filter((planet) => {
          switch (filter.comparison) {
          case 'maior que':
            return planet[filter.column] > Number(filter.value);
          case 'menor que':
            return planet[filter.column] < Number(filter.value);
          case 'igual a':
            return planet[filter.column] === filter.value;
          default:
            return true;
          }
        }), filteringPlanets));
    }
  }, [filterByName, filterByNumberValues]);
  return (
    <StarWarsContext.Provider
      value={ {
        planets,
        setFilterByName,
        filterByName,
        data,
        filterByNumberValues,
        setFilterByNumberValues,
        order,
        setOrder,
        setPlanets,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StarWarsProvider;
