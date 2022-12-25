import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { Typography } from '@mui/material';
import { TransactionContext } from '../context/TransactionContext';
import TextField from '@mui/material/TextField';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
};

const Connect = () => {
    const { connectWallet, open, signUpUserName,
        handleSignUpUserName, signUp, handleClose } = useContext(TransactionContext);

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
            <Typography variant="h6">Note: Please use the Goerli Test Network</Typography>
            <Typography variant="h6">It takes on average 10 seconds to process a transaction,</Typography>
            <Typography variant="h6">Please be patient, and refresh the page if you don't see the changes after 10 seconds.</Typography>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Sign Up
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 1 }}>
                            Please enter your user name
                        </Typography>
                        <TextField sx={{ mt: 1 }} id="outlined-basic" label="User Name" variant="outlined"
                            value={signUpUserName}
                            onChange={handleSignUpUserName}
                        />
                        <Button sx={{ mt: 2 }} variant="contained" onClick={signUp}>Sign up</Button>
                    </Box>
                </Fade>
            </Modal>
        </Box>

    )
}

export default Connect