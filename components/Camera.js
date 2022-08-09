import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

export default function UserCamera() {
    const [keys, setKeys] = useState([]);
    const [speedX, setSpeedX] = useState(0.1);
    const [speedY, setSpeedY] = useState(0);
    const [speedZ, setSpeedZ] = useState(0);
    useFrame(state => {
        // handle x
        state.camera.position.x += speedX;
        if(keys.includes('ArrowRight')) {
            setSpeedX(0.1);
        }
        else if(keys.includes('ArrowLeft')) {
            setSpeedX(-0.1);
        } else {
            setSpeedX(0);
        }

        //handle z
        state.camera.position.z += speedZ;
        if(keys.includes('ArrowUp')) {
            setSpeedZ(-0.1);
        }
        else if(keys.includes('ArrowDown')) {
            setSpeedZ(0.1);
        } else {
            setSpeedZ(0);
        }

        document.addEventListener('keydown', e => {
                if((e.code == 'ArrowDown'||
                e.code == 'ArrowUp'||
                e.code == 'ArrowLeft'||
                e.code == 'ArrowRight') && keys.indexOf(e.code) === -1) {
                    setKeys([...keys, e.code]);
                }
        });
        document.addEventListener('keyup', e => {
                if((e.code == 'ArrowDown' ||
                e.code == 'ArrowUp' ||
                e.code == 'ArrowLeft' ||
                e.code == 'ArrowRight')) {
                    setKeys(keys.filter(key => key !== e.code))
                }
        })
    })
    return <></>;    
}
