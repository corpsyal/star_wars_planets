
import React from 'react'
import { fetchAllPlanets } from '../services/planets'

const defaultContext: IPlanetContext = {
    planets: [],
    loading: true
}

export const PlanetsContext = React.createContext(defaultContext)

interface IPlanetsProps {
    children: React.ReactElement
}

export const PlanetsProvider = ({ children }: IPlanetsProps) => {
    const [planets, setPlanets] = React.useState<IPlanet[]>([])
    const [loading, setLoading] = React.useState(true)

    const context = React.useMemo(() => ({
        planets,
        loading
    }), [planets, loading])
    
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
