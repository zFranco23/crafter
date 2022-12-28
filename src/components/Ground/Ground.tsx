import { FC } from "react";
import { usePlane } from "@react-three/cannon";
import { groundTexture } from "../../constants/textures";

groundTexture.repeat.set(100,100)

const Ground: FC = (props: any) => {
  const [ref] = usePlane(() => ({
    rotation: [- Math.PI/ 2,0,0], //plane in xyz
    position: [0,-0.5,0]
  })) 

  
  return (
    <mesh ref={ref} {...props}>
      {/* attach to mesh geometry */}
      <planeBufferGeometry attach="geometry" args={[100,100]} /> 
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  )
}

export default Ground