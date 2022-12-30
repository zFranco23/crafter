import React from 'react'
import { useStore } from '../../utils/state'

import type { Cube } from '../../types';
import {default as CubeComponent} from './Cube';

const Cubes = () => {
  const cubes: Cube[] = useStore<Cube[]>( state => state.cubes);
  return (
    <>
    {cubes.
        map((c: Cube, idx: number) => (
            <CubeComponent key={c.id} {...c}/>
        ))}
    </>
  )
  
}

export default Cubes