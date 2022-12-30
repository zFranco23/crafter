import React, { useCallback, useEffect } from 'react'

import './SelectTextures.css';
import TextureItem from './TextureItem';
import { mapTexturesArray } from '../../constants/textures';
import { useStore } from '../../utils/state';

import type { FC } from 'react'
type Props = {}

const SelectTextures: FC<Props> = () => {
  const {setTexture} = useStore(state => state );


  const onKeyUp = useCallback((event: any) => {
      const { key } = event;
      if(['1', '2', '3', '4', '5'].includes(key)){
        const idx = Number(key) - 1;
        setTexture(mapTexturesArray[idx].label);
      }
  },[setTexture])

  useEffect(()=>{
    if(document){
      document.addEventListener('keyup', onKeyUp)
      return () => document.removeEventListener('keyup',onKeyUp);
    }
  },[onKeyUp])

  return (
    <div className="select-textures__container">
        {mapTexturesArray.map( (item, idx: number) => (
            <TextureItem key={item.label} {...item} />
        ))}
    </div>
  )
}

export default SelectTextures