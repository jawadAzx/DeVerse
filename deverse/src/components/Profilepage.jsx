import React, { useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { TransactionContext } from "../context/TransactionContext";
import Posts from './Posts';

const Profilepage = (props) => {
    const { userDetails, currentAccount, getFollowers,
        getFollowing, followers, following, followUser } =
        useContext(TransactionContext);
    const [userData, setUserData] = useState([]);
    const [acc, setAcc] = useState("");

    useEffect(() => {
        if (props.owner == true) {
            setAcc(currentAccount);
        }
        else if (props.owner == false) {
            setAcc(props.user[0]);
        }
    }, [])
    useEffect(() => {
        if (props.owner == true) {
            setUserData(userDetails);
        }
        else {
            setUserData(props.user);
        }
    }, [userDetails, props.userDetails])
    useEffect(() => {
        if (acc != "") {
            getFollowers(acc);
            getFollowing(acc);
        }
    }, [acc])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "250px", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "40px", marginTop: "30px" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>Profile</Typography>
            </Box>
            <Divider sx={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
            <Box sx={{ marginLeft: "40px", width: "100%", display: "flex", flexDirection: "row" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>Name: {userData[1]}</Typography>
                {
                    props.owner == true ? null :
                        <Button sx={{
                            color: "white", fontWeight: "bold", fontSize: "15px", textTransform: "none", marginLeft: "430px", backgroundColor: "green", borderRadius: "20px", width: "130px", '&:hover': {
                                background: "#FF2E2E",
                            },
                        }}
                            onClick={() => followUser(currentAccount, acc)}
                        >Follow
                        </Button>
                }
            </Box>
            <Box sx={{ marginLeft: "40px", width: "100%", display: "flex", flexDirection: "row" }}>
                <Typography variant="h7" sx={{ fontWeight: "bold", color: "white" }}>Followers: {followers}</Typography>
                <Typography variant="h7" sx={{ fontWeight: "bold", color: "white", marginLeft: "100px" }}>Following: {following.length}</Typography>
            </Box>
            <Box sx={{ marginLeft: "40px", width: "100%", display: "flex", flexDirection: "row", marginTop: "10px" }}>
                <Typography variant="h7" sx={{ fontWeight: "bold", color: "white" }}>Token Count: 100</Typography>
            </Box>
            <Divider sx={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
            <Box sx={{ marginLeft: "40px", width: "100%", display: "flex", flexDirection: "row" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>Verses </Typography>
            </Box>
            <Divider sx={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
            {acc != "" ?
                <Posts account={acc} owner={props.owner} />
                :
                null}
        </Box>

    )
}

export default Profilepage