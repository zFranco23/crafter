
import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber"
import { FC, useEffect, useRef } from "react"
import { Vector3 } from "three";
import { useKeyboardAction } from "../../utils/keyboard";


const Human: FC = () => {
  const actions = useKeyboardAction();
  console.log(actions);
  
  const { camera } = useThree();
  const [ref,api ] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0,1,0]
  }))

  //to avoid re-renders due to change on human position
  const pos = useRef([0,0,0]);
  const vel = useRef([0,0,0])

  useEffect(()=>{
    const unsubscribe = api.position.subscribe(p => pos.current = p);
    return unsubscribe;
  },[api.position])

  useEffect(()=>{
    const unsubscribe = api.velocity.subscribe(p => vel.current = p);
    return unsubscribe;
  },[api.position])

  useFrame(() => {
    camera.position.copy( 
        new Vector3(
            pos.current[0],
            pos.current[1],
            pos.current[2],
        )
    )

    api.velocity.set(0, 0, -1)
  })

  return (
    <mesh ref={ref}>

    </mesh>
  )
}

export default Human