import * as React from 'react'
import styled from 'styled-components'
import PlanetsListItem from './PlanetsListItem'
import usePlanets from '../hooks/usePlanets'
import { comparePlanet } from '../contexts/planets'


const Wrapper = styled.div`
    flex: 1;
    border: 1px solid lightgrey;
    margin-right: 32px;
    padding: 16px;
    max-height: 512px;
    overflow: scroll;
`
/*
interface IPlanetsListProps {
}
*/

const PlanetsList = () => {
    const { planets, selectedPlanets } = usePlanets()

    const isSelected = React.useCallback((planet: IPlanet) => Boolean(selectedPlanets.find(actualPlanet => comparePlanet(actualPlanet, planet))), [selectedPlanets])

    console.log(selectedPlanets, "selectedPlanets")

    return (
        <Wrapper>
            {planets.map(planet => <PlanetsListItem key={planet.name} planet={planet} isSelected={isSelected(planet)} />)}
        </Wrapper>
    )
}

export default PlanetsList