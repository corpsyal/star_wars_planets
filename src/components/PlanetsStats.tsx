import * as React from 'react'
import styled from 'styled-components'
import { Radar } from 'react-chartjs-2';
import usePlanets from '../hooks/usePlanets';

const getRandomColor = (str: string) => {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var z = 0; z < 3; z++) {
      var value = (hash >> (z * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

const Wrapper = styled.div`
    flex: 3;
    border: 1px solid lightgrey;
    display: flex;
    justify-content: center;
    align-items: center;
`

const labels = ['Rotation period', 'Orbital period', 'Diameter', 'Gravity', 'Surface water', 'Population']
const getData = ({rotation_period, orbital_period, diameter, gravity, surface_water, population}: IPlanet) =>
    [rotation_period, orbital_period, diameter, gravity, surface_water, population].map(value => parseInt(value, 10) || null)

const PlanetsStats = () => {
    const { selectedPlanets } = usePlanets()
    const data = React.useMemo(() => ({
        labels,
        datasets: selectedPlanets.map(planet => {
            const { name } = planet
            const color = getRandomColor(name)
            return {
                label: name,
                backgroundColor: color,
                borderColor: color,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: color,
                data: getData(planet)
            }
        })
    }), [selectedPlanets])

    return (
        <Wrapper>
            {data?.datasets?.length ? <Radar data={data} redraw /> : <span>No planet selected</span>}
        </Wrapper>
    )
}

export default PlanetsStats