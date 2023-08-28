import React, { useRef } from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import state from '../store'

const Car = () => {
    const snap = useSnapshot(state)
    const stateString = JSON.stringify(snap)

    const { nodes, materials } = useGLTF('/audi_baked.glb')
    const carRef = useRef();

    useFrame((state, delta) => {
        carRef.current.rotation.y += 0.01;
    })

    const meshNames = Object.keys(nodes)

    return (
        <group ref={carRef} scale={[0.0005, 0.0005, 0.0005]}
        >
            {meshNames.map((meshName) => (
                <mesh
                key={meshName}
                castShadow
                receiveShadow
                geometry={nodes[meshName].geometry}
                material={nodes[meshName].material}
                material-roughness={1}
                dispose={null}
                />
            ))}
        </group>
    )
}

export default Car