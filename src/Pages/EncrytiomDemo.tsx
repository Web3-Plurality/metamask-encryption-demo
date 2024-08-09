import { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { usePublicKey } from '../Components/useGetPublicKey';
import { encrypt } from '@metamask/eth-sig-util'
import { Buffer } from 'buffer';

const EncrytiomDemo = () => {
    const { isConnected } = useAccount();
    const { connect, connectors } = useConnect();
    const { disconnect } = useDisconnect();

    const { getPublicKey, showBtn, setShowBtn } = usePublicKey()

    const [data, setData] = useState({})

    const encryptData = async () => {
        const key = await getPublicKey()
        const encryptedData = encrypt({
            publicKey: key ?? "",
            data: 'Hello there',
            version: 'x25519-xsalsa20-poly1305'
        });
        console.log("Encrypted Data", encryptedData)
        setData(encryptedData)
        return encryptedData
    }

    const decryptData = async () => {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const decrypt = await window.ethereum.request({
            method: 'eth_decrypt',
            params: [`0x${Buffer.from(JSON.stringify(data), "utf8").toString("hex")}`, accounts[0]],
        });
        console.log("Decrypted Data", decrypt)
        return decrypt
    }

    return (
        <div className='btn-section'>
            {!isConnected ? (
                <button onClick={() => connect({ connector: connectors[0] })}>Connect MetaMask</button>
            ) : (
                <>
                    {!showBtn && (<button onClick={() => getPublicKey()}>Get Public Key</button>)}
                    <button onClick={() => encryptData()}>Encrypt Data</button>
                    <button onClick={() => decryptData()}>Decrypt Data</button>
                    <button onClick={() => {
                        setShowBtn(false)
                        disconnect()
                    }}>Disconnect</button>
                </>
            )}
        </div>
    )
}


export default EncrytiomDemo;