import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef } from 'react';

export default function Guitar() {
    const BoomboxRef = useRef();
    useFrame(() => {        
        if(!BoomboxRef.current) {
            return;
        }
    })

    const gltf = useLoader(GLTFLoader, '/Boombox/scene.gltf')
    return <primitive ref={BoomboxRef} rotation={[ 0.2, 0, 0 ]}
    position={[-0.6, -1.5, 4]} object={gltf.scene} scale={0.15} />
}