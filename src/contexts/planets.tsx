
import React, { useCallback } from 'react'
import { fetchAllPlanets } from '../services/planets'

const defaultContext: IPlanetContext = {
    planets: [],
    selectedPlanets: [],
    onSelect: () => null,
    loading: true
}

export const PlanetsContext = React.createContext(defaultContext)

interface IPlanetsProps {
    children: React.ReactElement
}

export const comparePlanet = (planet1: IPlanet, planet2: IPlanet): boolean => planet1.name === planet2.name
export const returnSelectedPlanets = (selectedPlanets: IPlanet[]) =>
    (planet: IPlanet) =>
        selectedPlanets.find(actualPlanet => comparePlanet(actualPlanet, planet)) // if planet is yet selected
            ? selectedPlanets.filter(actualPlanet => !comparePlanet(actualPlanet, planet)) // we return selected planets arrays without this planet
            : [...selectedPlanets, planet] // else we add this planet into the selected planet array

export const PlanetsProvider = ({ children }: IPlanetsProps) => {
    const [planets, setPlanets] = React.useState<IPlanet[]>([])
    const [selectedPlanets, setSelectedPlanets] = React.useState<IPlanet[]>([])

    const [loading, setLoading] = React.useState(true)

    const onSelect = useCallback((planet: IPlanet) => setSelectedPlanets(settedSelectedPlanets => returnSelectedPlanets(settedSelectedPlanets)(planet)), [] )

    const context = React.useMemo(() => ({
        planets,
        selectedPlanets,
        onSelect,
        loading
    }), [planets, selectedPlanets, loading, onSelect])
    
    const initPlanets = React.useCallback(async () => {
        const allPlanets = await fetchAllPlanets()
        setPlanets(allPlanets)
        setLoading(false)
    }, [])

    React.useEffect(() => {
        initPlanets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // to use like componentDidMount

    return (
        <PlanetsContext.Provider value={context}>
            {loading ? <span>Loading all planets...</span> : children}
        </PlanetsContext.Provider>
    );
}
