
import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber"
import { FC, useEffect, useRef } from "react"
import { Vector3 } from "three";
import { useKeyboardAction } from "../../utils/keyboard";


const SPEED = 4;
const JUMP_STRENGHT = 4; 

const Human: FC = () => {
  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump,
  } = useKeyboardAction();
  
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

    //Update velocity depending of action

    const direction = new Vector3();
    //x = 0, y = 0, z = forward ? -1 : backward ? 1  :0  
    const ZVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));
    const XVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);

    direction
      .subVectors(ZVector,XVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation) // to follow camera rotation 

    api.velocity.set(direction.x, vel.current[1], direction.z)

    if(jump && Math.abs(vel.current[1]) < 0.05){
      api.velocity.set(vel.current[0], JUMP_STRENGHT, vel.current[1])
    }
  })

  return (
    <mesh ref={ref} />
  )
}

export default Human