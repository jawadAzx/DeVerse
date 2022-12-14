import React, { useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Posts from './Posts';
import { TransactionContext } from "../context/TransactionContext";

const Mainpage = () => {
    const { makePost, handlePost, post, getPosts } =
        useContext(TransactionContext);
    const handlePostt = async () => {
        if (post != "") {
            await makePost();
            await getPosts();

        }
        else {
            alert("Please enter something ;)");
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "250px", width: "100%" }}>

            <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "40px", marginTop: "30px" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>Home</Typography>
            </Box>
            <Divider sx={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
            <Box sx={{ marginLeft: "40px", width: "100%", display: "flex", flexDirection: "column" }}>
                <TextField
                    id="outlined-multiline-static"
                    value={post}
                    onChange={handlePost}
                    multiline
                    rows={4}
                    variant="standard"
                    placeholder="What's on your mind?"
                    sx={{ width: "690px", color: "white", '& .MuiInputBase-input': { color: "white" }, '& .MuiInputLabel-root': { color: "white" }, '& .MuiInputLabel-root.Mui-focused': { color: "white" }, '& .MuiOutlinedInput-notchedOutline': { borderColor: "white" }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: "white" }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: "white" } }}
                />

            </Box>
            <Button
                onClick={handlePostt}
                sx={{
                    color: "white", fontWeight: "bold", fontSize: "15px", textTransform: "none", marginLeft: "600px", backgroundColor: "green", borderRadius: "20px", width: "130px", '&:hover': {
                        background: "#FF2E2E",
                    },
                    marginTop: "20px"
                }}>Post
            </Button>
            <Divider sx={{ marginLeft: "40px", marginTop: "10px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />

            <Posts />

        </Box>



    )
}

export default Mainpage