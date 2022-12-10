import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import IndividualPosts from './IndividualPosts';
const Trending = () => {
    const samplePosts = [
        {
            username: "John Doe",
            post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod",
            likes: 10,
            comments: 5,
            verified: true,
            time: "2 hours ago"
        },
        {
            username: "John Doe2",
            post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod",
            likes: 30,
            comments: 15,
            verified: false,
            time: "5 hours ago"
        },
        {
            username: "John Doe3",
            post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod",
            likes: 20,
            comments: 10,
            verified: true,
            time: "1 hours ago"
        },
        {
            username: "John Doe4",
            post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod, nunc vel tincidunt luctus, nunc nisl aliquam nisl, eget aliquam nunc nisl euismod nisl. Sed euismod",
            likes: 40,
            comments: 20,
            verified: false,
            time: "3 hours ago"
        },



    ]

    return (
        <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "250px", width: "100%" }}>
            <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "40px", marginTop: "30px" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", color: "white" }}>Explore</Typography>
                <Typography variant="h6" sx={{ color: "white" }}>Top 10 Verses</Typography>
            </Box>
            <Divider sx={{ marginLeft: "40px", marginTop: "20px", marginBottom: "20px", backgroundColor: "#2F3336", width: "690px" }} />
            <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "0px", marginTop: "30px" }}>
                {
                    samplePosts.map((post, index) => {
                        return (
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Typography variant="h6" sx={{ color: "white", marginLeft: "40px", fontWeight: "bold" }}>{index + 1}.</Typography>
                                <IndividualPosts key={index} user={post.username} post={post.post} likes={post.likes} comments={post.comments} verified={post.verified} time={post.time} />
                            </Box>
                        )
                    })


                }
            </Box>

        </Box>

    )
}

export default Trending