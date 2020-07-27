import * as React from 'react'
import styled from 'styled-components'
import { Radar } from 'react-chartjs-2';
import usePlanets from '../hooks/usePlanets';
import { lightenDarkenColor } from '../utils/color';

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

const setScale = (value: string) => (divideBy: number = 1) : string => (parseFloat(value)/divideBy || 0).toString()

const labels = ['Population (millions)','Rotation period', 'Orbital period x100', 'Diameter x100', 'Gravity', 'Surface water']
const getData = ({population, rotation_period, orbital_period, diameter, gravity, surface_water}: IPlanet) =>
    [
        setScale(population)(1000000),
        rotation_period,
        setScale(orbital_period)(100),
        setScale(diameter)(100),
        gravity,
        surface_water
    ].map(value => parseFloat(value) || 0)

const PlanetsStats = () => {
    const { selectedPlanets } = usePlanets()
    
    const data = React.useMemo(() => ({
        labels,
        datasets: selectedPlanets.map(planet => {
            const { name } = planet
            const color = getRandomColor(name)
            return {
                label: name,
                backgroundColor: lightenDarkenColor(color, 40),
                borderColor: color,
                pointBackgroundColor: lightenDarkenColor(color, 40),
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: color,
                data: getData(planet)
            }
        })
    }), [selectedPlanets])

    return (
        <Wrapper>
            {data?.datasets?.length ? <Radar data={data} /> : <span>No planet selected</span>}
        </Wrapper>
    )
}

export default PlanetsStats