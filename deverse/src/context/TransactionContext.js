import React, { Component, useEffect, useState } from "react";
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
    const [userDetails, setUserDetails] = useState([]);
    const [userQueryResult, setUserQueryResult] = useState([]);
    const [query, setQuery] = useState("");
    const [searchUserDetails, setSearchUserDetails] = useState(currentAccount);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState([]);
    const [myFollowing, setMyFollowing] = useState([]);
    const [myLikes, setMyLikes] = useState([]);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [letMeIn, setLetMeIn] = useState(false);
    const [signUpUserName, setSignUpUserName] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handlePost = (e) => {
        setPost(e.target.value)
    }
    const handleQuery = (e) => {
        setQuery(e.target.value)
    }
    const handleComment = (e) => {
        setComment(e.target.value)
    }
    const handleSignUpUserName = (e) => {
        setSignUpUserName(e.target.value)
    }
    /////////////////////////////////////////////////////////////////////////////////// 
    const checkIfWalletIsConnect = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                setLetMeIn(true);

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
                handleOpen();
                // await transactionContract.createUser(walletAddress, userName, "dummy password");
            }
            else {
                setCurrentAccount(walletAddress);
                setLetMeIn(true);
                // window.location.reload();

            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };
    const signUp = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            const walletAddress = currentAccount;
            const transactionContract = getEthereumContract()
            const userNames = await transactionContract.getAllUserNames();
            // if usernames doesnt include 

            if (!userNames.includes(signUpUserName)) {
                await transactionContract.createUser(walletAddress, signUpUserName, "dummy password");
                setLetMeIn(true);
                handleClose();
                window.location.reload();
            }
            else {
                alert("username already exists, please choose another one");
            }


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
            // await ethereum.request({
            //     // method: "wallet_requestPermissions",
            //     // method which will be used to disconnect the wallet
            //     method: "wallet_requestPermissions",
            //     params: [{ eth_accounts: {} }],
            // });
            setCurrentAccount("");
            setLetMeIn(false);
            // window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnect();
    }
        , []);
    useEffect(() => {
        if (currentAccount) {
            setUser();
            setSearchUserDetails(currentAccount);
            getFollowing(currentAccount);
            getMyLikes();
        }
    }, [currentAccount]);

    /////////////////////////////////////////////////////////////////////////////////// 

    const checkUser = async (walletAddress) => {
        const contract = getEthereumContract();
        const user = await contract.getUser(walletAddress);
        return user;
    }
    const setUser = async () => {
        const contract = getEthereumContract();
        const user = await contract.getUser(currentAccount);
        setUserDetails(user);
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
    const makeComment = async (postId) => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const timestamp = Math.floor(Date.now() / 1000);
            const timestampString = timestamp.toString();
            const postIdSplit = postId.split(" ");
            const postIde = postIdSplit[0];
            const postOwner = postIdSplit[1];
            const commentString = postIdSplit[0] + "-cmt-" + comment + "-cmt-" + userDetails[1] + "-cmt-" + timestampString;
            const contract = getEthereumContract();
            const postt = await contract.makeComment(commentString, postOwner, postIde);
            // get transaction hash
            setComment("");

        }
        catch (error) {
            console.log(error);
        }
    }
    const getComments = async (postId) => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setComments([]);
            const postIdSplit = postId.split(" ");
            const postIde = postIdSplit[0];
            const postOwner = postIdSplit[1];
            const contract = getEthereumContract();
            const comments = await contract.getComments(postOwner);
            for (let i = 0; i < comments.length; i++) {
                let temp = comments[i].split("-cmt-");
                if (temp[0] == postIde) {
                    let comment = temp[1];
                    let commenter = temp[2];
                    let commentTime = temp[3];
                    let commentObject = {
                        comment: comment,
                        commenter: commenter,
                        commentTime: commentTime
                    }
                    setComments(comments => [...comments, commentObject]);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const getPosts = async (account) => {
        try {
            setUserPosts([]);
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const contract = getEthereumContract();
            const posts = await contract.getPosts(account);
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
    const getFollowingsPosts = async () => {
        try {
            let temp = []
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const contract = getEthereumContract();
            const myFollowing = await contract.getFollowing(currentAccount);
            for (let i = 0; i < myFollowing.length; i++) {
                const posts = await contract.getPosts(myFollowing[i]);
                if (posts.length == 0) {
                    continue;
                }
                for (let j = 0; j < posts.length; j++) {
                    let temp1 = []
                    temp1.push(Number(posts[j][0]["_hex"]));
                    temp1.push(posts[j][1]);
                    temp1.push(Number(posts[j][2]["_hex"]));
                    temp1.push(Number(posts[j][3]["_hex"]));
                    temp1.push(posts[j][4]);
                    temp1.push(posts[j][5]);
                    temp1.push(posts[j][6]);
                    temp.push(temp1);
                }
            }
            temp.sort((a, b) => b[4] - a[4]);
            setUserPosts(temp);
        }
        catch (error) {
            console.log(error);
        }
    }
    const getAllPosts = async () => {
        try {
            let temp = []
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setUserPosts([]);
            const contract = getEthereumContract();
            const allUsers = await contract.getAllUsersAddress();
            for (let i = 0; i < allUsers.length; i++) {
                const posts = await contract.getPosts(allUsers[i]);
                // console.log(posts)
                if (posts.length == 0) {
                    continue;
                }
                for (let j = 0; j < posts.length; j++) {
                    let temp1 = []
                    temp1.push(Number(posts[j][0]["_hex"]));
                    temp1.push(posts[j][1]);
                    temp1.push(Number(posts[j][2]["_hex"]));
                    temp1.push(Number(posts[j][3]["_hex"]));
                    temp1.push(posts[j][4]);
                    temp1.push(posts[j][5]);
                    temp1.push(posts[j][6]);
                    temp.push(temp1);

                }

            }
            temp.sort((a, b) => {
                return b[4] - a[4];
            })
            setUserPosts(temp);
        }
        catch (error) {
            console.log(error);
        }
    }



    const searchUser = async () => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const contract = getEthereumContract();
            const user = await contract.getUserByUserName(query);
            setUserQueryResult(user);
        }
        catch (error) {
            console.log(error);
        }
    }
    const likePost = async (postId) => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const id = postId.split(" ")[0]
            const user = postId.split(" ")[1]
            const contract = getEthereumContract();
            const postt = await contract.likePost(user, id, currentAccount);
            // let neww = [];
            // for (let i = 0; i < userPosts.length; i++) {
            //     if (userPosts[i][0] == postId) {
            //         userPosts[i][3] += 1;
            //     }
            //     neww.push(userPosts[i]);
            // }
            await getAllPosts();
            await getMyLikes();
            // setUserPosts(neww);
        }

        catch (error) {
            console.log(error);
        }
    }
    const getMyLikes = async () => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const contract = getEthereumContract();
            const likes = await contract.getMyLikes(currentAccount);
            let newLikes = [];
            for (let i = 0; i < likes.length; i++) {
                let temp = Number(likes[i][0]["_hex"]) + " " + likes[i][1];
                newLikes.push(temp);
            }
            setMyLikes(newLikes);
        }

        catch (error) {
            console.log(error);
        }
    }
    const getFollowers = async (account) => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const contract = getEthereumContract();
            const followers = await contract.getFollowersCount(account);
            let temp = null;
            temp = Number(followers["_hex"]);
            setFollowers(temp);
        }

        catch (error) {
            console.log(error);
        }
    }
    const getFollowing = async (account) => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const contract = getEthereumContract();
            const following = await contract.getFollowing(account);
            setFollowing(following);
            if (account == currentAccount) {
                setMyFollowing(following);
            }

        }
        catch (error) {
            console.log(error);
        }
    }
    const followUser = async (account, followingAccount) => {
        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            const contract = getEthereumContract();
            const following = await contract.followUser(account, followingAccount);
            // window.location.reload();
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
                userDetails,
                searchUser,
                userQueryResult,
                handleQuery,
                query,
                searchUserDetails,
                setSearchUserDetails,
                setUser,
                getFollowers,
                getFollowing,
                followers,
                following,
                followUser,
                getFollowingsPosts,
                myFollowing,
                myLikes,
                makeComment,
                comment,
                handleComment,
                comments,
                setComments,
                getComments,
                setUserPosts,
                getAllPosts,
                open,
                handleOpen,
                handleClose,
                letMeIn,
                signUpUserName,
                handleSignUpUserName,
                signUp
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};


