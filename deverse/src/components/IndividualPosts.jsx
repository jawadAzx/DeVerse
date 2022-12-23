import { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import { TransactionContext } from "../context/TransactionContext";

const IndividualPosts = (props) => {
    const { likePost, myLikes } =
        useContext(TransactionContext);
    const [finalPost, setFinalPost] = useState(null);
    const breakPost = () => {
        // break post in 99 character part each
        let post = props.post;
        // console.log("POST", post)
        let postArray = [];
        let postLength = post.length;
        let postPart = "";
        let postPartLength = 0;
        for (let i = 0; i < postLength; i++) {
            postPart += post[i];
            postPartLength++;
            if (postPartLength === 99) {
                postArray.push(postPart);
                postPart = "";
                postPartLength = 0;
            }
        }
        postArray.push(postPart);
        return postArray;

    }
    useEffect(() => {
        setFinalPost(breakPost());
    }, [])
    return (
        <Box sx={{ flexDirection: "column", display: "flex", alignItems: "flex-start", justifyContent: "flex-start", width: "70%" }}>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: "40px" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "white" }}>{props.user}</Typography>
                {
                    props.verified ? <VerifiedUserIcon sx={{ marginLeft: "10px", color: "green" }} /> : null
                }
                <Typography variant="h7" sx={{ color: "#808080", marginLeft: "10px" }}>- {props.time}</Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginLeft: "40px", marginTop: "30px", width: "69%" }}>
                {
                    finalPost ? finalPost.map((postPart, index) => {
                        return (
                            <Typography variant="h7" sx={{ color: "white" }} key={index}>{postPart}</Typography>
                        )
                    }) : null
                }

            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: "40px", marginTop: "40px" }}>
                {
                    myLikes.includes(props.postIDOwner) ? <FavoriteIcon sx={{ color: "red", marginRight: "10px", cursor: "pointer" }}
                    ></FavoriteIcon>
                        : <FavoriteBorderIcon sx={{ color: "white", marginRight: "10px", cursor: "pointer" }}
                            onClick={() => { likePost(props.postIDOwner) }}
                        />
                }

                <Typography variant="h7" sx={{ color: "white", marginRight: "10px" }}>{props.likes}</Typography>

                <ModeCommentIcon sx={{ color: "white", marginLeft: "10px", cursor: "pointer" }} />
                <Typography variant="h7" sx={{ color: "white", marginLeft: "10px" }}>{props.comments}</Typography>

            </Box>

            <Divider sx={{ marginLeft: "40px", marginTop: "10px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />

        </Box>
    )
}

export default IndividualPosts