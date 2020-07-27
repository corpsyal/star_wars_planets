import React from 'react'
import { PlanetsContext } from '../contexts/planets';

const usePlanets = () => {
    const context = React.useContext(PlanetsContext)

    if(!context)
        throw new Error("Planets context is not provided !");
    
    return context
}

export default usePlanets