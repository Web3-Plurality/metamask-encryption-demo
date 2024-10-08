/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAccount } from "wagmi";

export const usePublicKey = () => {
    const { address } = useAccount();
    const [showBtn, setShowBtn] = useState(false)

    const getPublicKey = async () => {
        try {
            if (!address) {
                console.error("No accounts found. Please connect your MetaMask account.");
                return;
            }

            // Request the encryption public key for the active account
            const encryptionPublicKey = await window.ethereum.request({
                method: 'eth_getEncryptionPublicKey',
                params: [address], // Use the active account address
            });

            console.log("Encryption Public Key:", encryptionPublicKey);
            setShowBtn(true)
            return encryptionPublicKey;

        } catch (error: any) {
            console.log("Error", error)
            if (error.code === 4001) {
                // User rejected the request
                console.log("Please connect to MetaMask.");
            } else {
                console.error("An error occurred while getting the encryption public key:", error);
            }
        }

    };

    return {
        showBtn,
        setShowBtn,
        getPublicKey
    };
};
