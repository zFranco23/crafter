import { PointerLockControls } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { FC } from "react"

//Create a point of view (personal)
//large amount of props
type Props = any; 

const Perspective: FC<Props> = (props) => {
  const { camera, gl } = useThree();

  return (
   <PointerLockControls camera={camera} domElement={gl.domElement} {...props} />
  )
}

export default Perspective