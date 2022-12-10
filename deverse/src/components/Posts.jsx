import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import IndividualPosts from './IndividualPosts';
const Posts = () => {
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
        <div>
            {samplePosts.map((post,index) => (
                <IndividualPosts key={index} user={post.username} post={post.post} likes={post.likes} comments={post.comments} verified={post.verified} time={post.time} />
            ))}

        </div>

    )
}

export default Posts