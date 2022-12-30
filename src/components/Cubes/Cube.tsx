

import React, { FC, useState } from 'react'
import { useBox } from '@react-three/cannon'
import type { Position, Texture } from '../../types'

import * as TEXTURES from '../../constants/textures';
import { useStore } from '../../utils/state';

import type { ThreeEvent } from '@react-three/fiber';

type Props = {
    id: string,
    texture: Texture,
    position: Position,
}


const Cube: FC<Props> = ({ id, texture, position }) => {  
  const [ref] = useBox(() => ({ 
    position, 
    mass: 1, 
    type: 'Static'
  }))

  // const removeCube = useStore(state => state.removeCube );
  const { updateSelectedCube, removeCube, selectedCubeId } = useStore(state => state );

  const isSelected = selectedCubeId === id;

  const ownTexture = TEXTURES[texture + 'Texture']

  const handleDeleteCube = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if(event.ctrlKey || event.altKey) removeCube(id);
  }

  const onPointerEnter = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    updateSelectedCube(id);
  }

  const onPointerLeave = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    updateSelectedCube('');
  }

  return (
    <mesh
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={handleDeleteCube}
      ref={ref} 
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial 
        color={isSelected ? 'red' : 'white'}
        attach="material"  
        map={ownTexture} 
      />
    </mesh>
  )
}

export default Cube