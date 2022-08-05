import { useState } from "react";
import { ethers } from "ethers";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        setError();
        await startPayment({
            setError,
            setTxs,
            ether: data.get("ether"),
            "0x36006083C211074B5188c225987c1C880593a774": data.get("0x36006083C211074B5188c225987c1C880593a774")
        });
    };

    return (
        <form className="form flex" onSubmit={handleSubmit}>
            <h1 className="main-title">Leave some ethereum</h1>
            <div className="main-body flex">
                <input
                className="main-input"
                name="ether"
                type="number"
                placeholder="Amount in ETH" />
                <br />
                <button type="submit">Send</button>
            </div>
        </form>
    );
}
