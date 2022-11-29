import React, { useEffect, useState } from 'react';
import planetListAPI from '../services/PlanetListAPI';

function Table() {
  const tableinfo = ['surface_water', 'rotation_period', 'diameter',
    'orbital_period', 'population'];
  const [planet, setPlanet] = useState([]);
  const [filterPlanetName, setFilterPlanetName] = useState([]);
  const [namePlanet, setnamePlanet] = useState('');
  const [column, setColumn] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [quantity, setQuantity] = useState(0);
  const [everyTypes, setEveryTypes] = useState(tableinfo);
  const [filterTypes, setFilterTypes] = useState([]);
  const [ifFilter, setIfFilter] = useState(0);

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

  const filterHandleChangeNumber = () => {
    const valueTypesfilters = filterTypes;
    const valueFilter = {
      column,
      operator,
      quantity,
    };
    valueTypesfilters.push(valueFilter);
    setFilterTypes(valueTypesfilters);

    const filteringAll = everyTypes.filter((planetao) => planetao !== column);
    setEveryTypes(filteringAll);
    setColumn(filteringAll[0]);

    filterHandleChange();
  };

  const deleteHandle = (type) => {
    setFilterPlanetName(planet);
    const filter = filterTypes.filter((e) => e.column !== type);
    const filtering = everyTypes;
    filtering.push(type);
    setEveryTypes(filtering);
    setFilterTypes(filter);
    setIfFilter(ifFilter + 1);
  };

  const deleteHandleAll = () => {
    setFilterPlanetName(planet);
    setEveryTypes(tableinfo);
    setFilterTypes([]);
    setIfFilter(ifFilter + 1);
  };

  useEffect(() => {
    filterTypes.forEach((ele) => {
      if (ele.operator === 'maior que') {
        const filt = filterPlanetName
          .filter((e) => +e[ele.column] > +ele.quantity);
        return setFilterPlanetName(filt);
      }
      if (ele.operator === 'menor que') {
        const filt = filterPlanetName
          .filter((e) => +e[ele.column] < +ele.quantity);
        return setFilterPlanetName(filt);
      }
      if (ele.operator === 'igual a') {
        const filt = filterPlanetName
          .filter((e) => e[ele.column] === +ele.quantity);
        return setFilterPlanetName(filt);
      }
    });
  });

  return (
    <div>
      <form>
        <input type="text" data-testid="name-filter" onChange={ getName } />
        <select data-testid="column-filter" onClick={ columnOpition }>
          {everyTypes.map((ele) => <option key={ ele } value={ ele }>{ele}</option>)}
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
          onClick={ filterHandleChangeNumber }
        >
          Filter
        </button>
      </form>
      {filterTypes.map((filte) => (
        <div key={ filte.column } data-testid="filter">
          <p>
            {filte.column}
          </p>
          <button
            type="button"
            onClick={ () => deleteHandle(filte.column) }
            data-testid="button-remove-filters"
          >
            Remover
          </button>
        </div>
      ))}

      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteHandleAll }
      >
        Remover Tudo
      </button>
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
        {filterPlanetName.map((planeta) => (
          <tr key={ planeta.name }>
            <td>{planeta.name}</td>
            <td>{planeta.rotation_period}</td>
            <td>{planeta.orbital_period}</td>
            <td>{planeta.diameter}</td>
            <td>{planeta.climate}</td>
            <td>{planeta.gravity}</td>
            <td>{planeta.terrain}</td>
            <td>{planeta.surface_water}</td>
            <td>{planeta.population}</td>
            <td>{planeta.films.map((e) => `${e}`)}</td>
            <td>{planeta.created}</td>
            <td>{planeta.edited}</td>
            <td>{planeta.url}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Table;
