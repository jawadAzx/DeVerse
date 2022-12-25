import React, { useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Posts from './Posts';
import { TransactionContext } from "../context/TransactionContext";

const Mainpage = (props) => {
    const { makePost, handlePost, post, getPosts, currentAccount, makeComment, comment, handleComment, getComments, getAllPosts } =
        useContext(TransactionContext);
    const [postoComment, setPostoComment] = useState("");
    const handlePostt = async () => {
        if (post != "") {
            await makePost();
            await getAllPosts()
        }
        else {
            alert("Please enter something ;)");
        }
    };
    const handleCommentt = async () => {
        if (comment != "") {
            await makeComment(postoComment);
            await getComments(postoComment);
        }
        else {
            alert("Please enter something ;)");
        }
    }
    const handleCommentPostId = (postNumber) => {
        setPostoComment(postNumber);
    }
    useEffect(() => {
        if (props.comments) {
            // console.log("Called")
            getComments(postoComment);
        }
    }, [props.comments])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "250px", width: "100%" }}>

            <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "40px", marginTop: "30px" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>
                    {props.following ? "Following" : props.comments ? "Comments" : props.trending ? "Trending" : "Home"}
                </Typography>
            </Box>
            <Divider sx={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
            {
                !props.following && !props.trending ?
                    <Box >
                        <Box sx={{ marginLeft: "40px", width: "100%", display: "flex", flexDirection: "column" }}>
                            <TextField
                                id="outlined-multiline-static"
                                value={props.comments ? comment : post}
                                onChange={props.comments ? handleComment : handlePost}
                                multiline
                                rows={4}
                                variant="standard"
                                placeholder=
                                {props.comments ? "Write your comments." : "What's on your mind?"}
                                sx={{ width: "690px", color: "white", '& .MuiInputBase-input': { color: "white" }, '& .MuiInputLabel-root': { color: "white" }, '& .MuiInputLabel-root.Mui-focused': { color: "white" }, '& .MuiOutlinedInput-notchedOutline': { borderColor: "white" }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: "white" }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: "white" } }}
                            />
                        </Box>
                        <Button
                            onClick={props.comments ? handleCommentt : handlePostt}
                            sx={{
                                color: "white", fontWeight: "bold", fontSize: "15px", textTransform: "none", marginLeft: "600px", backgroundColor: "#365b6d", borderRadius: "20px", width: "130px", '&:hover': {
                                    background: "#6ca2bd",
                                },
                                marginTop: "20px"
                            }}>
                            {props.comments ? "Comment" : "Post"}
                        </Button>
                        <Divider sx={{ marginLeft: "40px", marginTop: "10px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
                    </Box>
                    : null
            }
            {

            }
            <Posts account={currentAccount} owner={false} commentsHelper={props.commentsHelper} comments={props.comments} postIdFunction={handleCommentPostId} whatToShow={
                props.following ? "following" : props.comments ? "comments" : props.trending ? "trending" : "home"
            }
                trending={props.trending}
            />

        </Box>



    )
}

export default Mainpage