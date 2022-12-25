import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
const Notifications = () => {
    const sampleNotifications = {
        "notifications": [
            {
                "id": 1,
                "username": "John Doe",
                "notification": "liked your post",
                "time": "2 hours ago"
            },
            {
                "id": 2,
                "username": "John Doe2",
                "notification": "commented on your post",
                "time": "5 hours ago"
            },
            {
                "id": 3,
                "username": "John Doe3",
                "notification": "liked your post",
                "time": "1 hours ago"
            },
            {
                "id": 4,
                "username": "John Doe4",
                "notification": "commented on your post",
                "time": "3 hours ago"
            },
            {
                "id": 5,
                "username": "John Doe5",
                "notification": "liked your post",
                "time": "2 hours ago"
            },

        ]
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "250px", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "40px", marginTop: "30px" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>Notifications</Typography>
            </Box>
            <Divider sx={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
            <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "0px" }}>
                {
                    sampleNotifications.notifications.map((notification) => {
                        return (
                            <div>
                                <Box sx={{ display: "flex", flexDirection: "row" }}>

                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", marginLeft: "40px" }}>{notification.username}</Typography>
                                    <Typography variant="h6" sx={{ color: "white", marginLeft: "10px" }}>{notification.notification}</Typography>
                                    <Typography variant="h7" sx={{ fontWeight: "bold", color: "#B3B5B8", marginLeft: "10px", marginTop:"5px" }}>{notification.time}</Typography>

                                </Box>
                                <Divider sx={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
                            </div>

                        )
                    }
                    )
                }
            </Box>

        </Box>

    )
}

export default Notifications