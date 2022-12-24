import React, { useEffect, useState, useContext } from "react";
import { Typography } from '@mui/material';
import IndividualPosts from './IndividualPosts';
import { TransactionContext } from "../context/TransactionContext";

const Posts = (props) => {
    const { getPosts, userPosts, currentAccount, getFollowingsPosts, setUserPosts, comments, } =
        useContext(TransactionContext);
    const [fetched, setFetched] = useState(false);
    const [showComments, setShowComments] = useState(false);
    // console.log(props.whatToShow, fetched)

    useEffect(() => {
        if (fetched == false) {
            if (props.account == currentAccount && props.owner == false && props.whatToShow == "following") {
                // console.log("Notfdsafad")
                setUserPosts([])
                getFollowingsPosts()
            }
            else if (props.account == currentAccount && props.owner == false && props.whatToShow == "home") {
                // getPosts(currentAccount)
                setUserPosts([])
                console.log("Not implemented yet")
            }
            else if (props.account == currentAccount && props.owner == false && props.whatToShow == "comments") {
                // getPosts(currentAccount)
                setUserPosts([])
                console.log(comments)
                // console.log("Not implemented yet")
            }
            else {
                setUserPosts([])
                getPosts(props.account)
            }
            setFetched(false)
        }
    }, [props.whatToShow, comments])
    useEffect(() => {
        if (props.whatToShow == "comments") {
            setShowComments(true)
        }
        else {
            setShowComments(false)
        }
    }, [comments])

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
    if (userPosts[0] === undefined && props.whatToShow == "following" || props.whatToShow == "home") {
        return (
            <div>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", textAlign: "center", marginTop: "20px" }}>
                    No Posts Yet
                </Typography>
            </div>

        )
    }
    if (props.whatToShow == "following" || props.whatToShow == "home") {
        return (
            <div>

                {userPosts.map((post, index) => (
                    <IndividualPosts key={post[0] + post[5]} user={post[5]} post={post[1]} likes={post[2]} comments={post[3]} verified={post[6]} time={changeTime(post[4]).toString()} postIDOwner={post[0] + " " + post[5]}
                        commentsHelper={props.commentsHelper} commentStatus={props.comments}
                        postIdFunction={props.postIdFunction}
                    />
                ))}

            </div>

        )
    }
    else if (props.whatToShow == "comments" && showComments) {
        return (
            <div>
                {
                    comments.map((data, index) => (
                        < IndividualPosts key={index + data.commenter} user={data.commenter} post={data.comment} verified={data[6]} time={changeTime(Number(data.commentTime))} postIDOwner={"F"}
                            commentsHelper={props.commentsHelper} commentStatus={props.comments}
                            postIdFunction={props.postIdFunction}
                        />
                    ))

                }
            </div>
        )
    }
}

export default Posts