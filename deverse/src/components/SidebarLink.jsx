import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
const SidebarLink = (props) => {
    return (
        <Box sx={{
            display: "flex", alignItems: "center", marginLeft: "40px", cursor: "pointer", '&:hover': {
                background: "#5A5A5A",
            }, borderRadius: "50px", height: "50px"
        }}
            onClick={() => props.onClick(props.label)}
        >
            <props.icon sx={{ color: "white", fontSize: "30px", marginRight: "20px", marginTop: "-4px" }} />
            <Typography sx={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>{props.label}</Typography>
        </Box>
    )
}

export default SidebarLink