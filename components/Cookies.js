import Image from 'next/image';
import { useRecoilState } from 'recoil';
import cookiesContext from '../Context/cookiesContext';

export default function Cookies() {
    const [showCookies, setCookies] = useRecoilState(cookiesContext);
    return (
        <div className="cookies" style={{ display: `${!showCookies ? 'none' : 'flex'}` }}>
            <div>
                <Image src="https://thumbs.dreamstime.com/b/accept-cookies-text-protection-personal-information-cookie-mascot-character-accept-cookies-text-protection-personal-248530387.jpg"
                width={300} height={300} alt="..."/>
            </div>
            <div className="buttons">
                <button onClick={() => setCookies(false)}>Accept</button>
                <button>Decline</button>
            </div>
        </div>
    );
}