import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { TransactionContext } from '../context/TransactionContext';

const Connect = () => {
    const { connectWallet } = useContext(TransactionContext);
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: 'black',
            color: 'white'
        }}>
            <Typography variant="h2" sx={{}}>DE-Verse</Typography>
            <Typography variant="h4" sx={{ marginBottom: '1rem' }}>Connect Wallet to get started</Typography>
            <Button variant="contained" onClick={connectWallet}>Connect</Button>
        </Box>

    )
}

export default Connect