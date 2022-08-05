import Head from 'next/head'
import { Suspense, useRef, useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import Main from '../components/Main';

//!TODO Create playilist

function Guitar() {
  const GuitarRef = useRef();
  const [playlist] = useState(['gta1.mp3', 'gta2.mp3']);
    useFrame((state) => {
      // state.camera.rotation.y += 0.001;
      if(!GuitarRef.current) {
          return;
      }
      GuitarRef.current.rotation.x += 0.1;
      GuitarRef.current.rotation.z += 0.1;
    })

    const gltf = useLoader(GLTFLoader, '/Guitar/scene.gltf')
    return <primitive ref={GuitarRef} rotation={[ Math.PI / 2, -Math.PI / 1.9, Math.PI / 2.7 ]} position={[4, 0, 1]} object={gltf.scene} scale={1} />
}

export default function Home() {
  const [TrackIdx, SetTrackIdx] = useState(1);
  const [audio] = useState(typeof Audio !== "undefined" && new Audio(`/Sounds/gta${TrackIdx}.mp3`));

  if(audio.ended) {
    if(TrackIdx == 2) {
      SetTrackIdx(1);
    } else {
      SetTrackIdx(TrackIdx + 1);
    }
  }

  useEffect(() => {
    audio.play();
  }, [])

  return (
    <div>
      <Head>
        <title>Metabeg.io</title>
        <link rel='icon' href='/Guitar/guitar.ico'/>
      </Head>
      <Suspense fallback={<>loading...</>}>
        <Main />
        <Canvas style={{ position: 'absolute', 
          height: '100vh', background: 'linear-gradient(to bottom right, rgb(74, 0, 108), rgb(0,0,0)' }}>
          <Text anchorY={-3} fontSize={0.3}>Metabeg.io<meshNormalMaterial /></Text>
          <Guitar />
          <ambientLight args={['#a6a6a6', 1]} />
          <spotLight position={[10, 15, 10]} angle={0.3}></spotLight>
          <gridHelper args={[50,50, 'black', 'black']}
          position={[0,-2,0]} rotation={[-Math.PI / 1.1 ,0,0]} />
          <gridHelper args={[50,50, 'indigo', 'purple']}
          position={[0,-3,0]} rotation={[-Math.PI / 1.1 ,0,0]} />
        </Canvas>
      </Suspense>
    </div>
  )
}