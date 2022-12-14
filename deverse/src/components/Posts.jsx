import React, { useEffect, useState, useContext } from "react";
import { Typography } from '@mui/material';
import IndividualPosts from './IndividualPosts';
import { TransactionContext } from "../context/TransactionContext";

const Posts = () => {
    const { getPosts, userPosts } =
        useContext(TransactionContext);
    const [fetched, setFetched] = useState(false);
    const samplePosts = [
        {
            username: "John Doe",
            post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod",
            likes: 10,
            comments: 5,
            verified: true,
            time: "2 hours ago"
        },
        {
            username: "John Doe2",
            post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod",
            likes: 30,
            comments: 15,
            verified: false,
            time: "5 hours ago"
        },
        {
            username: "John Doe3",
            post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod",
            likes: 20,
            comments: 10,
            verified: true,
            time: "1 hours ago"
        },
        {
            username: "John Doe4",
            post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod",
            likes: 40,
            comments: 20,
            verified: false,
            time: "3 hours ago"
        },



    ]
    useEffect(() => {
        getPosts()
        setFetched(true)
    }, [])
    console.log("POSTS", userPosts, fetched)
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
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "#000000", textAlign: "center", marginTop: "20px" }}>
                    No Posts Yet
                </Typography>
            </div>

        )
    }
    return (
        <div>
            {userPosts.map((post, index) => (
                <IndividualPosts key={index} user={post[5]} post={post[1]} likes={post[2]} comments={post[3]} verified={post[6]} time={changeTime(post[4]).toString()} />
            ))}

        </div>

    )
}

export default Posts