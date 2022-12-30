import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import Ground from './components/Ground/Ground';
import Perspective from './components/Perspective/Perspective';
import Human from './components/Human/Human';

import './App.css';
import Cubes from './components/Cubes/Cubes';
import { useStore } from './utils/state';
import SelectTextures from './components/SelectTextures/SelectTextures';

const App = () => {

  const selectedCubeId = useStore(state => state.selectedCubeId); 
  return (
    <div className="app__container">
      <SelectTextures />
      <Canvas>
        <Sky sunPosition={[100,100,20]} />
        <ambientLight intensity={0.5} />
        <Perspective />
        <Physics>
          <Human />
          <Ground />
          <Cubes />
        </Physics>
      </Canvas>
      <div className='pointer'> {selectedCubeId ? 'x' : '+'} </div>
    </div>
  )
}

export default App