import React from 'react';
import PlanetsSelector from './components/PlanetsSelector';
import { PlanetsProvider } from './contexts/planets';

function App() {
  return (
    <div className="App">
      <PlanetsProvider>
        <PlanetsSelector />
      </PlanetsProvider>
    </div>
  );
}

export default App;
