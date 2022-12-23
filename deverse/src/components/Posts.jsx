import React, { useEffect, useState, useContext } from "react";
import { Typography } from '@mui/material';
import IndividualPosts from './IndividualPosts';
import { TransactionContext } from "../context/TransactionContext";

const Posts = (props) => {
    const { getPosts, userPosts, currentAccount, getAllposts } =
        useContext(TransactionContext);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        if (fetched == false) {
            // console.log("uHERE", props)
            if (props.account == currentAccount && props.owner == false) {
                // console.log("HERE")
                getAllposts()
            }
            else {
                getPosts(props.account)
            }
            setFetched(true)
        }
    }, [])

    const changeTime = (epoch) => {
        // change to relative time
        const time = new Date(epoch * 1000)
        const now = new Date()
        const diff = now - time
        const diffInHours = diff / 1000 / 60 / 60
        if (diffInHours < 1) {
            return `${Math.floor(diffInHours * 60)} minutes ago`
        }
        if (diffInHours < 24) {
            return `${Math.floor(diffInHours)} hours ago`
        }
        if (diffInHours < 24 * 7) {
            return `${Math.floor(diffInHours / 24)} days ago`
        }
        if (diffInHours < 24 * 7 * 4) {
            return `${Math.floor(diffInHours / 24 / 7)} weeks ago`
        }
        if (diffInHours < 24 * 7 * 4 * 12) {
            return `${Math.floor(diffInHours / 24 / 7 / 4)} months ago`
        }
        return `${Math.floor(diffInHours / 24 / 7 / 4 / 12)} years ago`

    }
    if (userPosts[0] === undefined) {
        return (
            <div>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", textAlign: "center", marginTop: "20px" }}>
                    No Posts Yet
                </Typography>
            </div>

        )
    }
    // console.log(userPosts)
    return (
        <div>
            {userPosts.map((post, index) => (
                <IndividualPosts key={post[0] + post[5]} user={post[5]} post={post[1]} likes={post[2]} comments={post[3]} verified={post[6]} time={changeTime(post[4]).toString()} postIDOwner={post[0] + " " + post[5]} />
            ))}

        </div>

    )
}

export default Posts