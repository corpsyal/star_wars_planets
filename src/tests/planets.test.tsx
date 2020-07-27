

import React from 'react'
import usePlanets from "../hooks/usePlanets"
import { PlanetsProvider } from '../contexts/planets'
import { act, render } from '@testing-library/react'
// @ts-ignore: no typescript definition
import { screen } from '@testing-library/dom'
import { fetchPlanetsByUrl, fetchAllPlanets, fetchPlanetsByName, getSearchUrl } from "../services/planets"

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