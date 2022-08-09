import { useState, useRef } from "react";
import { ethers } from "ethers";
import { useRecoilValue } from 'recoil';
import cookiesContext from '../Context/cookiesContext';
// import ErrorMessage from "../error/ErrorMessage";
// import TxList from "../error/TxList";

const startPayment = async ({ setError, setTxs, ether }) => {
    try {
        if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        ethers.utils.getAddress("0x36006083C211074B5188c225987c1C880593a774");
        const tx = await signer.sendTransaction({
            to: "0x36006083C211074B5188c225987c1C880593a774",
            value: ethers.utils.parseEther(ether)
        });
        setTxs([tx]);
    } catch (err) {
        setError(err.message);
        console.log(err.message)
    }
};

export default function Main() {
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);
    const ethRef = useRef();
    const showCookies = useRecoilValue(cookiesContext);

    const handleSubmit = async e => {
        e.preventDefault();
        setError();
        try {
            await startPayment({
                setError,
                setTxs,
                ether: ethRef.current.value,
                addr: "0x36006083C211074B5188c225987c1C880593a774"
            });
            console.log(txs);
        } catch (err) {
            console.error(err, error)
        }
    };

    return (
        <div style={{ display: `${showCookies ? 'none' : ''}` }}>
            <div className="form flex">
                <h1 className="main-title">Leave some ethereum</h1>
                <div className="main-body flex">
                    <input
                    className="main-input"
                    name="ether"
                    type="number"
                    placeholder="Amount in ETH"
                    ref={ethRef} />
                    <br />
                    <button type="submit" onClick={(e) => handleSubmit(e)}>Send</button>
                </div>
            </div>
        </div>
    );
}
