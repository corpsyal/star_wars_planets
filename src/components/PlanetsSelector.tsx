import * as React from 'react'
import styled from 'styled-components'
import PlanetsList from './PlanetsList'
import PlanetsStats from './PlanetsStats'


const Wrapper = styled.div`
    border: 1px solid lightgrey;
    display: flex;
    padding: 32px; // multiple of 8 (google guidelines)
    width: 1000px;
    margin: 0 auto;
`

const PlanetsSelector = () => {

    return (
        <Wrapper>
            <PlanetsList />
            <PlanetsStats />
        </Wrapper>
    )
}

export default PlanetsSelector