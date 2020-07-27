import * as React from 'react'
import styled from 'styled-components'
import usePlanets from '../hooks/usePlanets'

interface IPlanetsListItemProps {
    planet: IPlanet
    isSelected: boolean
}

interface IWrapperProps {
    isSelected: boolean
}

const Wrapper = styled.div`
    flex: 1;
    border: 1px solid lightgrey;
    padding: 16px;
    text-align: center;
    cursor: pointer;

    ${({isSelected}: IWrapperProps) => isSelected && `
        background-color: #001E62;
        color: white;
    `}
`

const PlanetsListItem = ({ planet, isSelected }: IPlanetsListItemProps) => {
    const { onSelect } = usePlanets()
    const onClick = React.useCallback(() => onSelect(planet), [onSelect, planet])

    return (
        <Wrapper onClick={onClick} isSelected={isSelected}>
            <span>{planet.name}</span>
        </Wrapper>
    )
}

export default PlanetsListItem