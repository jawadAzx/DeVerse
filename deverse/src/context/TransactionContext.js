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
    const [userName, setUserName] = useState("");
    const handlePost = (e) => {
        setPost(e.target.value)
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
                let userName = await prompt("Enter your username");
                await transactionContract.createUser(walletAddress, userName, "dummy password");
            }
            window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
    // not working
    const disconnectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            // disconnect wallet
            await ethereum.request({
                method: "wallet_requestPermissions",
                params: [
                    {
                        eth_accounts: {},
                    },
                ],
            });
            setCurrentAccount("");
            window.location.reload();
        } catch (error) {
            console.log(error);
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
            // time stamp in seconds    
            const timestamp = Math.floor(Date.now() / 1000);
            // convert timestamp to string
            const timestampString = timestamp.toString();
            // console.log(post, "POSTTER", accounts[0], typeof (timestampString));

            const contract = getEthereumContract();
            const postt = await contract.makePost(accounts[0], post, timestampString);
            setPost("");
        }
        catch (error) {
            console.log(error);
        }
    }
    const getPosts = async () => {
        try {
            setUserPosts([]);
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const contract = getEthereumContract();
            console.log("Hm,")
            const posts = await contract.getPosts(accounts[0]);
            // console.log(posts, "POSTS")
            let neww = [];
            for (let i = posts.length - 1; i >= 0; i--) {
                let temp = []
                temp.push(Number(posts[i][0]["_hex"]));
                temp.push(posts[i][1]);
                temp.push(Number(posts[i][2]["_hex"]));
                temp.push(Number(posts[i][3]["_hex"]));
                temp.push(posts[i][4]);
                temp.push(posts[i][5]);
                temp.push(posts[i][6]);

                neww.push(temp);
            }
            setUserPosts(neww);
        }
        catch (error) {
            setUserPosts([]);

        }
    }
    const likePost = async (postId) => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const contract = getEthereumContract();
            const postt = await contract.likePost(accounts[0], postId);
            let neww = [];
            for (let i = 0; i < userPosts.length; i++) {
                if (userPosts[i][0] == postId) {
                    userPosts[i][3] += 1;
                }
                neww.push(userPosts[i]);
            }
            setUserPosts(neww);
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
                userPosts,
                disconnectWallet,
                likePost,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};

