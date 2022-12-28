import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import './App.css';
import Ground from './components/Ground/Ground';
import Perspective from './components/Perspective/Perspective';

const App = () => {
  return (
    <div className="app__container">
      <Canvas>
        <Sky sunPosition={[100,100,20]} />
        <ambientLight intensity={0.5} />
        <Perspective />
        <Physics>
          <Ground />
        </Physics>
      </Canvas>
    </div>
  )
}

export default App