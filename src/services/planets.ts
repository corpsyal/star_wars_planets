import axios from 'axios'
import queryString from 'query-string'
import { BASE_URL } from '../constants/planets'
// @ts-ignore: no typescript definition
import axiosHttpAdapter from 'axios/lib/adapters/http'

axios.defaults.adapter = axiosHttpAdapter

export const fetchPlanetsByUrl = async (url: string = BASE_URL): Promise<IPlanetResponse> => {
    const { data } = await axios.get(url)
    return data
}

export const fetchAllPlanets = (): Promise<IPlanet[]> => new Promise(async resolve => {
    const planets: IPlanet[] = []

    const fetch = async (url: string): Promise<void> => {
        const { results, next } = await fetchPlanetsByUrl(url)

        if(results)
            planets.push(...results)

        next ? fetch(next) : resolve(planets)
        
    }

    fetch(BASE_URL)
    
})

const defaultName = ""

// I prefer to delegate this kind of task to a specialized module
export const getSearchUrl = (name: string = defaultName): string => queryString.stringifyUrl({url: BASE_URL, query: {search: name}})

export const fetchPlanetsByName = async (name: string = defaultName): Promise<IPlanet[]> => {
    const { results } = await fetchPlanetsByUrl(getSearchUrl(name))
    return results
}