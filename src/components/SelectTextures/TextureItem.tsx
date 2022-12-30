import React from 'react'
import { useStore } from '../../utils/state';

import './SelectTextures.css';

import type { FC } from 'react'
import { Texture } from '../../types';
type Props = {
    label: Texture,
    img: string,
}

const TextureItem: FC<Props>  = ({ label, img }) => {

  const {currentTexture, setTexture} = useStore(state => state );

  const activeTexture = currentTexture === label;
  return (
    <div 
        onClick={ () => setTexture(label)}
        className={`texture-item__container ${ activeTexture 
                ? 'texture-item__container-selected' : ''
        }`}
    >
        <img src={img} alt={`icon ${label}`} />
    </div>
  )
}

export default TextureItem