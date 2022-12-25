import React, { useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { TransactionContext } from "../context/TransactionContext";
const SearchUser = (props) => {
    const { searchUser,
        userQueryResult,
        handleQuery,
        query } = useContext(TransactionContext);
    const [searched, setSearched] = useState(false);
    useEffect(() => {
        if (userQueryResult.length > 0) {
            setSearched(true);
        }
    }, [userQueryResult])
    return (
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "250px", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "40px", marginTop: "30px" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>Search User</Typography>
            </Box>
            <Divider sx={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
            <Box sx={{ marginLeft: "40px", width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <TextField
                    id="outlined-basic"
                    label="Search User"
                    variant="outlined"
                    value={query}
                    onChange={handleQuery}
                    sx={{ color: "white", '& .MuiInputBase-input': { color: "white" }, '& .MuiInputLabel-root': { color: "white" }, '& .MuiInputLabel-root.Mui-focused': { color: "white" }, '& .MuiOutlinedInput-notchedOutline': { borderColor: "white" }, '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: "white" }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: "white" } }}
                />
                <Button sx={{
                    color: "white", fontWeight: "bold", fontSize: "15px", textTransform: "none", marginLeft: "40px", backgroundColor: "#365b6d", borderRadius: "20px", width: "130px", '&:hover': {
                        background: "#6ca2bd",
                    },
                }}
                    onClick={searchUser}
                >Search
                </Button>
            </Box>
            <Divider sx={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
            {
                searched && userQueryResult[1] != "account does not exist" ? (
                    <Box sx={{ marginLeft: "40px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", border: "1px solid #2F3336", borderRadius: "10px", padding: "20px", cursor: "pointer" }}
                        onClick={() => props.helper(userQueryResult[0])}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>User Details</Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>Name: {userQueryResult[1]}</Typography>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>ID: {userQueryResult[0]}</Typography>
                    </Box>

                ) : searched && userQueryResult[1] == "account does not exist" ? (
                    <Box sx={{ marginLeft: "40px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>User not found :( </Typography>
                    </Box>
                )
                    : null
            }
        </Box >

    )
}

export default SearchUser