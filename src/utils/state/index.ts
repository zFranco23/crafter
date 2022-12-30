import create, { SetState } from 'zustand'
import { nanoid } from 'nanoid';

import type { Cube, Position, Texture } from '../../types';

export type RootState = {
    selectedCubeId?: string,
    currentTexture : Texture,
    cubes: Array<Cube>,
    addCube: (position: Position) => void,
    removeCube: (id: string) => void,
    updateSelectedCube: (selectedCubeId: string) => void,
}

export const useStore = create<RootState>((set: SetState<RootState>) => ({
    selectedCubeId: undefined,
    currentTexture: 'dirt',
    cubes: [{
        id: nanoid(),
        position: [1, 2, -1],
        texture: 'dirt',
    },
    {
        id: nanoid(),
        position: [2, 1, -1],
        texture: 'log',
    },
    {
        id: nanoid(),
        position: [4, 1, 1],
        texture: 'dirt',
    }],
    addCube: ( position: Position ) => {
        set(state => ({
            cubes: [...state.cubes, {
                id: nanoid(),
                texture: state.currentTexture,
                position,
            }]
        }))
    },
    removeCube: (id: string) => {
        set(state => ({
            cubes: state.cubes.filter((c: Cube) => c.id !== id)
        }))
    },
    updateSelectedCube: (selectedCubeId: string) => {
        set((_) => ({
            selectedCubeId: !!selectedCubeId ? selectedCubeId : undefined
        }))
    },
    setTexture: () => {},
    saveWorld: () => {},
    resetWorld: () => {},
}))