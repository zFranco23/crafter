import { usePlane } from "@react-three/cannon";
import { FC } from "react";

const Ground: FC = () => {
  const [ref] = usePlane(() => ({
    rotation: [- Math.PI/ 2,0,0], //plane in xyz
    position: [0,-0.5,0]
  })) 
  return (
    <mesh ref={ref}>
      {/* attach to mesh geometry */}
      <planeBufferGeometry attach="geometry" args={[100,100]} /> 
      <meshStandardMaterial attach="material" color="green" />
    </mesh>
  )
}

export default Ground