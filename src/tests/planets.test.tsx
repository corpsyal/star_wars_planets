

import React from 'react'
import usePlanets from "../hooks/usePlanets"
import { PlanetsProvider, returnSelectedPlanets } from '../contexts/planets'
import { act, render } from '@testing-library/react'
// @ts-ignore: no typescript definition
import { screen } from '@testing-library/dom'
import { fetchPlanetsByUrl, fetchAllPlanets, fetchPlanetsByName, getSearchUrl } from "../services/planets"
import axios from 'axios'
// @ts-ignore: no typescript definition
import axiosHttpAdapter from 'axios/lib/adapters/http'

axios.defaults.adapter = axiosHttpAdapter

describe('Planets services', () => {

  it('Should fetch planets page 1', async done => {
    const planetsResponse = await fetchPlanetsByUrl()

    expect(planetsResponse.count).toBe(60)
    expect(planetsResponse.next).toBe('http://swapi.dev/api/planets/?page=2')
    expect(planetsResponse.previous).toBe(null)

    done()
  })

  it('Should fetch planets page 2', async done => {
    const planetsResponse = await fetchPlanetsByUrl("http://swapi.dev/api/planets/?page=2")

    expect(planetsResponse.count).toBe(60)
    expect(planetsResponse.next).toBe('http://swapi.dev/api/planets/?page=3')
    expect(planetsResponse.previous).toBe('http://swapi.dev/api/planets/?page=1')

    done()

  })

  it('Should fetch all planets', async done => {
    const planets = await fetchAllPlanets()

    expect(planets.length).toBe(60)

    done()

  })

  it('Should return the correct url when searching by name', () => {
    const searchUrl = getSearchUrl('Tatooine')
    expect(searchUrl).toBe("https://swapi.dev/api/planets?search=Tatooine")
  })

  it('Should return the correct planets when searching by name', async done => {
    const name = 'Tatooine'
    const planets = await fetchPlanetsByName(name)
    expect(planets.length).toBe(1)

    const [planet] = planets
    expect(planet.name).toBe(name)

    done()
  })
})


describe('Planets context', () => {
  it('Should render planets context with good value', async done => {
    const PlanetsContextConsumer = () => {
      const { planets } = usePlanets()
      return <span>Received: {planets.length}</span>
    }

    const tree = (
      <PlanetsProvider>
        <PlanetsContextConsumer />
      </PlanetsProvider>
    )

    act(() => {
      render(tree)
    })

    await screen.findByText(`Received: 60`)
    done()
  })
})


const planet1: IPlanet = {
  "name": "Tatooine",
  "rotation_period": "23",
  "orbital_period": "304",
  "diameter": "10465",
  "climate": "arid",
  "gravity": "1 standard",
  "terrain": "desert",
  "surface_water": "1",
  "population": "200000",
  "residents": [
    "http://swapi.dev/api/people/1/",
    "http://swapi.dev/api/people/2/",
    "http://swapi.dev/api/people/4/",
    "http://swapi.dev/api/people/6/",
    "http://swapi.dev/api/people/7/",
    "http://swapi.dev/api/people/8/",
    "http://swapi.dev/api/people/9/",
    "http://swapi.dev/api/people/11/",
    "http://swapi.dev/api/people/43/",
    "http://swapi.dev/api/people/62/"
  ],
  "films": [
    "http://swapi.dev/api/films/1/",
    "http://swapi.dev/api/films/3/",
    "http://swapi.dev/api/films/4/",
    "http://swapi.dev/api/films/5/",
    "http://swapi.dev/api/films/6/"
  ],
  "created": "2014-12-09T13:50:49.641000Z",
  "edited": "2014-12-20T20:58:18.411000Z",
  "url": "http://swapi.dev/api/planets/1/"
}

const planet2 = {
  "name": "Alderaan",
  "rotation_period": "24",
  "orbital_period": "364",
  "diameter": "12500",
  "climate": "temperate",
  "gravity": "1 standard",
  "terrain": "grasslands, mountains",
  "surface_water": "40",
  "population": "2000000000",
  "residents": [
    "http://swapi.dev/api/people/5/",
    "http://swapi.dev/api/people/68/",
    "http://swapi.dev/api/people/81/"
  ],
  "films": [
    "http://swapi.dev/api/films/1/",
    "http://swapi.dev/api/films/6/"
  ],
  "created": "2014-12-10T11:35:48.479000Z",
  "edited": "2014-12-20T20:58:18.420000Z",
  "url": "http://swapi.dev/api/planets/2/"
}

describe('Planets utils', () => {
  it('Should return good selected planets', () => {
    const selectedPlanets: IPlanet[] = []

    const newSelectedPlanets: IPlanet[] = returnSelectedPlanets(selectedPlanets)(planet1)

    expect(newSelectedPlanets[0]?.name).toBe("Tatooine")
  })

  it('Should return good selected planets', () => {
    const selectedPlanets: IPlanet[] = [planet1]

    const newSelectedPlanets: IPlanet[] = returnSelectedPlanets(selectedPlanets)(planet1)

    expect(newSelectedPlanets.length).toBe(0)
  })

  it('Should return good selected planets', () => {
    const selectedPlanets: IPlanet[] = [planet1, planet2]

    const newSelectedPlanets: IPlanet[] = returnSelectedPlanets(selectedPlanets)(planet1)

    expect(newSelectedPlanets[0]?.name).toBe("Alderaan")
  })
})