import * as React from 'react'
import styled from 'styled-components'


const Wrapper = styled.div`
    flex: 1;
    border: 1px solid lightgrey;
    padding: 16px;
    text-align: center;
`

const PlanetsListItem = () => {
    return (
        <Wrapper>
            <span>PlanetsListItem</span>
        </Wrapper>
    )
}

export default PlanetsListItem