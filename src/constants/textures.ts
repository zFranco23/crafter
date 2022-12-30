import {NearestFilter, RepeatWrapping, Texture, TextureLoader} from 'three';
import { 
    grass, 
    glass, 
    dirt, 
    log, 
    wood 
} from './img';

import type { Texture as TextureType } from '../types';


export const 
  mapTexturesArray: {
    label: TextureType,
    img: string,
}[] = [ 
    { label: 'grass', img : grass  },
    { label: 'glass', img: glass  },
    { label: 'dirt', img: dirt  },
    { label: 'log', img: log  },
    { label: 'wood', img: wood  },
]

//Textures 
const groundTexture: Texture = new TextureLoader().load(grass);
const glassTexture: Texture = new TextureLoader().load(glass);
const dirtTexture: Texture = new TextureLoader().load(dirt);
const logTexture: Texture = new TextureLoader().load(log);
const woodTexture: Texture = new TextureLoader().load(wood);

const textures: Texture[] = [ groundTexture, glassTexture, dirtTexture, logTexture, woodTexture ]

for (let texture of textures){
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.magFilter = NearestFilter;
}

export { groundTexture, glassTexture, dirtTexture, logTexture, woodTexture };
