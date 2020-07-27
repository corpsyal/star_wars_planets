import * as React from 'react'
import styled from 'styled-components'
import PlanetsListItem from './PlanetsListItem'


const Wrapper = styled.div`
    flex: 1;
    border: 1px solid lightgrey;
    margin-right: 32px;
    padding: 16px;
`

const PlanetsList = () => {
    return (
        <Wrapper>
            <PlanetsListItem />
        </Wrapper>
    )
}

export default PlanetsList