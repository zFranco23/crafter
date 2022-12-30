import { useCallback, useEffect, useState } from "react"



type SingleKeyboardAction = 'moveForward' | 'moveBackward' | 'moveLeft' | 'moveRight' | 'jump'

type KeyboardActions = {
    [key in SingleKeyboardAction] : boolean;
}

type KeyboardActionMap = {
    [key: string] : SingleKeyboardAction
}

const KEYBOARD_ACTIONS_MAP: KeyboardActionMap = {
    KeyW : 'moveForward',
    KeyS : 'moveBackward',
    KeyA : 'moveLeft',
    KeyD : 'moveRight',
    Space: 'jump',
}


// type Keys = keyof typeof KEYBOARD_ACTIONS_MAP;
// type Values = typeof KEYBOARD_ACTIONS_MAP[Keys];
// type KeyboardActions = {
//     [key: Values]: boolean
// }


export const useKeyboardAction = () => {
    const [keyboardActions, setKeyboardActions] = useState<KeyboardActions>({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
    })

    const onKeyPressed = useCallback((event: KeyboardEvent, toggle : boolean)=>{
        const { code } = event;
        console.log(code);
        
        if(KEYBOARD_ACTIONS_MAP[code]) {
            const action = KEYBOARD_ACTIONS_MAP[code];
            const flag = toggle ? !!keyboardActions[action] : !keyboardActions[action];
            if(flag) return;
            setKeyboardActions( prev => ({...prev, [action] : toggle }))
        }
    },[keyboardActions])

    const onKeyDown: EventListener = useCallback((event: any)=>{
        onKeyPressed(event, true);
    },[onKeyPressed])

    const onKeyUp: EventListener = useCallback((event: any)=>{
        onKeyPressed(event, false);
    },[onKeyPressed])


    useEffect(() => {
        if(document){
            document.addEventListener('keydown', onKeyDown)
            document.addEventListener('keyup', onKeyUp)

            return () => {
                document.removeEventListener('keydown', onKeyDown);
                document.removeEventListener('keyup', onKeyUp)
            }   
        }
    },[onKeyDown, onKeyUp])

    return keyboardActions;
}