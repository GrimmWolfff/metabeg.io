import Head from 'next/head'
import dynamic from 'next/dynamic';

import { useRecoilValue } from 'recoil';
import { Suspense } from 'react';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';

import cookiesContext from '../Context/cookiesContext';
import UserCamera from '../components/Camera'

export default function Home() {
  const Audio   = dynamic(() => import('../components/Audio'),   { suspense: true });
  const Main    = dynamic(() => import('../components/Main'),    { suspense: true });
  const Cookies = dynamic(() => import('../components/Cookies'), { suspense: true });
  const Guitar  = dynamic(() => import('../components/Guitar'),  { suspense: true })
  const Boombox  = dynamic(() => import('../components/Boombox'),  { suspense: true })
  const BG  = dynamic(() => import('../components/BG'),  { suspense: true })
  const showCookies = useRecoilValue(cookiesContext);
  
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Head>
        <title>Metabeg.io</title>
        <link rel='icon' href='/Guitar/guitar.ico'/>
      </Head>
      <Suspense fallback={<>loading...</>}>
        <div className="flex">
          <Cookies />
          <Main />
        </div>
        <Audio />
          <Canvas style={{ position: 'absolute', display: `${showCookies ? 'none' : 'flex'}`, 
            height: '100vh', background: 'linear-gradient(to bottom right, rgb(74, 0, 108), rgb(0,0,0)' }}>
            <PerspectiveCamera position={[1, 1, 0]} rotation={[0, -Math.PI / 8, 0]} manual>
            <Stars radius={100} depth={10} count={5000} factor={4} saturation={0} fade speed={1} />
            {/* <UserCamera /> */}
            <BG />
            {/* <Guitar /> */}
            <Boombox />
            <ambientLight args={['#a6a6a6', 1]} />
            <spotLight position={[10, 15, 10]} angle={0.3}></spotLight>
            {/* <gridHelper args={[50,50, 'black', 'black']}
            position={[0,-2,0]} rotation={[-Math.PI / 1.1 ,0,0]} />
            <gridHelper args={[50,50, 'indigo', 'purple']}
            position={[0,-3,0]} rotation={[-Math.PI / 1.1 ,0,0]} /> */}
            </PerspectiveCamera>
          </Canvas>
      </Suspense>
    </div>
  )
}