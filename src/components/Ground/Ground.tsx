import { FC, useEffect } from "react";
import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../../constants/textures";
import { useStore } from "../../utils/state";

import type { ThreeEvent } from "@react-three/fiber";

groundTexture.repeat.set(100,100)

const Ground: FC = (props: any) => {
  const [ref] = usePlane(() => ({
    rotation: [- Math.PI/ 2,0,0], //plane in xyz
    position: [0,-0.5,0]
  })) 


  const addCube = useStore( state => state.addCube)

  const handleClickGround = (event: ThreeEvent<MouseEvent> ) => {
    event.stopPropagation();
    const { point } = event;
    const [x, y, z] = Object.values(point).map(el => Math.ceil(el));
    addCube([x, y, z]);
  }

  return (
    <mesh ref={ref} {...props} onClick={handleClickGround}>
      {/* attach to mesh geometry */}
      <planeBufferGeometry attach="geometry" args={[100,100]} /> 
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  )
}

export default Ground