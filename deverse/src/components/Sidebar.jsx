import React, { useEffect, useState, useContext } from "react";
import Box from '@mui/material/Box';
import SidebarLink from './SidebarLink';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import { Button } from '@mui/material';
import Mainpage from './Mainpage';
import Trending from './Trending';
import Notifications from './Notifications';
import Profilepage from "./Profilepage";
import SearchUser from "./SearchUser";
import Comments from "./Comments";
import { TransactionContext } from "../context/TransactionContext";

const Sidebar = () => {
    const { disconnectWallet, currentAccount, searchUserDetails,
        setSearchUserDetails, userQueryResult, setUser, getPosts } =
        useContext(TransactionContext);
    const [active, setActive] = useState("Home");
    const [profileOwner, setProfileOwner] = useState(true);
    const [viaSearch, setViaSearch] = useState(false);
    const handleProfileChanges = (user) => {
        if (profileOwner == true) {
            setProfileOwner(false);
            setViaSearch(true);
            setSearchUserDetails(user);
            setActive("ProfileSearch");
        }
        else {
            setProfileOwner(true);
            setViaSearch(false);
            setSearchUserDetails(currentAccount);
        }
    }
    const commentsTime = () => {
        setActive("Comments");
    }
    useEffect(() => {
        if (active != "ProfileSearch") {
            setProfileOwner(true);
            setViaSearch(false);
            setSearchUserDetails(currentAccount);
            setUser()
        }
    }, [active])
    return (
        <span>
            <Box sx={{ width: 250, height: "100%", flex: "column", position: "fixed" }}>
                <Box sx={{ marginLeft: "40px", marginTop: "30px" }}>
                    <img src={require('./logo.png')} alt="Deverse" width={40} height={40} />
                </Box>
                <Box sx={{ marginTop: "30px" }}>
                    <SidebarLink icon={HomeIcon} label="Home" onClick={setActive} />
                    {/* <SidebarLink icon={TagIcon} label="Explore" onClick={setActive} />
                    <SidebarLink icon={NotificationsIcon} label="Notifications" onClick={setActive} /> */}
                    <SidebarLink icon={PeopleIcon} label="Following" onClick={setActive} />
                    <SidebarLink icon={PersonIcon} label="Profile" onClick={setActive} />
                    <SidebarLink icon={SearchIcon} label="Search" onClick={setActive} />
                </Box>
                <Button sx={{
                    color: "white", fontWeight: "bold", fontSize: "20px", textTransform: "none", marginLeft: "60px", backgroundColor: "red", borderRadius: "20px", width: "50%", marginTop: "25px", '&:hover': {
                        background: "#FF2E2E",
                    },
                }
                }
                    onClick={disconnectWallet}
                >Logout
                </Button>
            </Box>
            {
                active == "Explore" ? <Trending /> : active == "Notifications" ? <Notifications /> : active == "Profile" ? <Profilepage owner={profileOwner} search={viaSearch} user={userQueryResult} /> : active == "Search" ? <SearchUser helper={handleProfileChanges} /> : active == "ProfileSearch" ? <Profilepage owner={profileOwner} search={viaSearch} user={userQueryResult} /> : active == "Home" ?
                    <Mainpage commentsHelper={commentsTime} following={false} comments={false} /> : active == "Comments" ?
                        <Mainpage commentsHelper={commentsTime} following={false} comments={true} /> : active == "Following" ?
                            <Mainpage commentsHelper={commentsTime} following={true} comments={false} /> : null

            }
        </span >
    )
}

export default Sidebar