import React, { useEffect, useState } from 'react';
import planetListAPI from '../services/PlanetListAPI';

function Table() {
  const [planet, setPlanet] = useState([]);
  const [filterPlanetName, setFilterPlanetName] = useState([]);
  const [namePlanet, setnamePlanet] = useState('');
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [quantity, setQuantity] = useState(0);

  const getApi = async () => {
    setPlanet(await planetListAPI());
  };

  useEffect(() => {
    getApi();
  }, []);

  useEffect(() => {
    if (namePlanet.length === 0) {
      setFilterPlanetName(planet);
    }
  }, [namePlanet.length, planet]);

  const getName = ({ target: { value } }) => {
    setnamePlanet(value);
    if (value.length > 0) {
      const filterPlanetByName = planet.filter((e) => e.name.includes(value));
      setFilterPlanetName(filterPlanetByName);
    }
  };

  const columnOpition = ({ target: { value } }) => {
    setColumn(value);
  };

  const operatorOpition = ({ target: { value } }) => {
    setOperator(value);
  };

  const onChangeQuantity = ({ target: { value } }) => {
    setQuantity(value);
  };

  const filterHandleChange = () => {
    if (operator === 'maior que') {
      const filter = filterPlanetName.filter((e) => +e[column] > quantity);
      return setFilterPlanetName(filter);
    }
    if (operator === 'menor que') {
      const filter = filterPlanetName.filter((e) => +e[column] < quantity);
      return setFilterPlanetName(filter);
    }
    if (operator === 'igual a') {
      const filter = filterPlanetName.filter((e) => e[column] === quantity);
      return setFilterPlanetName(filter);
    }
  };
  return (
    <div>
      <form>
        <input type="text" data-testid="name-filter" onChange={ getName } />
        <select data-testid="column-filter" onClick={ columnOpition }>
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select data-testid="comparison-filter" onClick={ operatorOpition }>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          onChange={ onChangeQuantity }
          value={ quantity }
          type="number"
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ filterHandleChange }
        >
          Filter
        </button>
      </form>
      <table>
        <tr>
          <th>Name </th>
          <th>Rotation Period</th>
          <th>Orbital Period </th>
          <th>Diameter </th>
          <th>Climate </th>
          <th>Gravity </th>
          <th>Terrain </th>
          <th>Surface Water </th>
          <th>Population </th>
          <th>Films </th>
          <th>Created </th>
          <th>Edited </th>
          <th>URL </th>
        </tr>
        {filterPlanetName.map((element) => (
          <tr key={ element.name }>
            <td>{element.name}</td>
            <td>{element.rotation_period}</td>
            <td>{element.orbital_period}</td>
            <td>{element.diameter}</td>
            <td>{element.climate}</td>
            <td>{element.gravity}</td>
            <td>{element.terrain}</td>
            <td>{element.surface_water}</td>
            <td>{element.population}</td>
            <td>{element.films.map((e) => `${e}`)}</td>
            <td>{element.created}</td>
            <td>{element.edited}</td>
            <td>{element.url}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;
