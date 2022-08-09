import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef } from 'react';

export default function Guitar() {
    const GuitarRef = useRef();
    useFrame(() => {
        if(!GuitarRef.current) {
            return;
        }
        GuitarRef.current.rotation.x += 0.1;
        GuitarRef.current.rotation.z += 0.1;
    })

    const gltf = useLoader(GLTFLoader, '/Guitar/scene.gltf')
    return <primitive ref={GuitarRef} rotation={[ Math.PI / 2, -Math.PI / 1.9, 1 ]} 
    position={[-0.5, 0.5, 0]} object={gltf.scene} scale={0.5} />
}