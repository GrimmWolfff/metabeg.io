import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRef } from 'react';

export default function Guitar() {
    const bgRef = useRef();
    useFrame(() => {        
        if(!bgRef.current) {
            return;
        }
    })

    const gltf = useLoader(GLTFLoader, '/BG/scene.gltf')
    return <primitive ref={bgRef} rotation={[ Math.PI / 16, Math.PI, 0 ]}
    position={[4, 3, 0]} object={gltf.scene} scale={0.8} />
}