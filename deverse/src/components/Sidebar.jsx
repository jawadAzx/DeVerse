import React, { useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import SidebarLink from './SidebarLink';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import Mainpage from './Mainpage';
import Trending from './Trending';
import Notifications from './Notifications';
import { TransactionContext } from "../context/TransactionContext";

const Sidebar = () => {
    const { disconnectWallet } =
        useContext(TransactionContext);
    const [active, setActive] = useState("Home");
    return (
        <span>
            <Box sx={{ width: 250, height: "100%", flex: "column", position: "fixed" }}>
                <Box sx={{ marginLeft: "40px", marginTop: "30px" }}>
                    <img src={require('./logo.png')} alt="Deverse" width={40} height={40} />
                </Box>
                <Box sx={{ marginTop: "30px" }}>
                    <SidebarLink icon={HomeIcon} label="Home" onClick={setActive} />
                    <SidebarLink icon={TagIcon} label="Explore" onClick={setActive} />
                    <SidebarLink icon={NotificationsIcon} label="Notifications" onClick={setActive} />
                    <SidebarLink icon={PersonIcon} label="Profile" onClick={setActive} />
                </Box>
                <Button sx={{
                    color: "white", fontWeight: "bold", fontSize: "20px", textTransform: "none", marginLeft: "60px", backgroundColor: "red", borderRadius: "20px", width: "50%", marginTop: "25px", '&:hover': {
                        background: "#FF2E2E",
                    },
                }
                }
                >Logout
                </Button>

            </Box>
            {
                active == "Home" ? <Mainpage /> : active == "Explore" ? <Trending /> : active == "Notifications" ? <Notifications /> : null
            }


        </span >


    )
}

export default Sidebar