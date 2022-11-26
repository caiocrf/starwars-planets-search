import React, { useEffect, useState } from 'react';
import planetListAPI from '../services/PlanetListAPI';

function Table() {
  const [planet, setPlanet] = useState([]);
  const [filterPlanetName, setFilterPlanetName] = useState([]);
  const [namePlanet, setnamePlanet] = useState('');

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

  return (
    <div>
      <form>
        <input type="text" ata-testid="name-filter" onChange={ getName } />
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
