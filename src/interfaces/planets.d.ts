
interface IPlanet {
    name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
    residents: string[]
    films: string[]
    created: string
    edited: string
    url: string
}

interface IPlanetResponse {
    count: number
    next?: string
    previous?: string
    results: IPlanet[]
}

interface IPlanetContext {
    planets: IPlanet[]
    selectedPlanets: IPlanet[]
    onSelect: (planet: IPlanet) => void
    loading: boolean
}