import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [post, setPost] = useState("");
    const [userPosts, setUserPosts] = useState([]);
    const handlePost = (e) => {
        setPost(e.target.value)

        console.log(post, "trans");
    }
    /////////////////////////////////////////////////////////////////////////////////// 
    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);

            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
            const walletAddress = accounts[0];
            const transactionContract = getEthereumContract()

            const user = await transactionContract.getUser(walletAddress);
            if (user[1] == "account does not exist") {
                await transactionContract.createUser(walletAddress, "dummy user", "dummy password");
            }
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
    useEffect(() => {
        checkIfWalletIsConnect();
    }
        , []);
    /////////////////////////////////////////////////////////////////////////////////// 

    const checkUser = async (walletAddress) => {
        const contract = getEthereumContract();
        const user = await contract.getUser(walletAddress);
        return user;
    }
    const makePost = async () => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log(post, "POSTTER", accounts[0])
            const contract = getEthereumContract();

            const postt = await contract.makePost(accounts[0], post);
            setPost("");
        }
        catch (error) {
            console.log(error);
        }
    }
    const getPosts = async () => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const contract = getEthereumContract();
            const posts = await contract.getPosts(accounts[0]);
            // change all hex to decimal
            // for (let i = 0; i < posts.length; i++) {
            //     posts[i][0] = parseInt(posts[i][0]);
            //     posts[i][1] = parseInt(posts[i][1]);
            // }
            setUserPosts(posts);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <TransactionContext.Provider
            value={{
                currentAccount,
                connectWallet,
                checkUser,
                makePost,
                getPosts,
                post,
                handlePost,
                userPosts
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

