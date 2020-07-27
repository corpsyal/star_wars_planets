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
const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    border: 1px solid #001E62;
    border-radius: 10px;
    margin-bottom: 24px;
    outline: none;
`

const PlanetsList = () => {
    const { planets, selectedPlanets } = usePlanets()
    const [search, setSearch] = React.useState("")

    const onSearchChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), [])

    const isSelected = React.useCallback((planet: IPlanet) => Boolean(selectedPlanets.find(actualPlanet => comparePlanet(actualPlanet, planet))), [selectedPlanets])

    const filteredPlanets = React.useMemo(() => planets.filter(planet => planet.name.match(new RegExp(search, 'gi'))), [search, planets])

    return (
        <Wrapper>
            <Input placeholder="Search planet" value={search} onChange={onSearchChange} />
            {filteredPlanets.map(planet => <PlanetsListItem key={planet.name} planet={planet} isSelected={isSelected(planet)} />)}
        </Wrapper>
    )
}

export default PlanetsList