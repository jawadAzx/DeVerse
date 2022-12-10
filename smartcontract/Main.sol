// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

contract Maincontract {
    uint256 userCounts;
    uint256 verifiedUserCounts;

    constructor() {
        userCounts = 0;
        verifiedUserCounts = 0;
    }

    struct UserStruct {
        address walletId;
        address userContractAddress;
        string userName;
        string password;
        bool isVerified;
    }

    event User(
        address walletId,
        address userContractAddress,
        string userName,
        string password,
        bool isVerified
    );

    mapping(address => UserStruct) public userStructs;

    function createUser(
        address _walletId,
        string memory _userName,
        string memory _password
    ) public {
        address uca = address(new UserContract(_walletId));
        userStructs[_walletId].walletId = _walletId;
        userStructs[_walletId].userName = _userName;
        userStructs[_walletId].password = _password;
        userStructs[_walletId].isVerified = false;
        userStructs[_walletId].userContractAddress = uca;
        userCounts++;
        emit User(_walletId, uca, _userName, _password, false);
    }

    function getUser(address _walletId)
        public
        view
        returns (
            address,
            string memory,
            string memory,
            bool
        )
    {
        return (
            userStructs[_walletId].walletId,
            userStructs[_walletId].userName,
            userStructs[_walletId].password,
            userStructs[_walletId].isVerified
        );
    }

    function getUserCount() public view returns (uint256) {
        return userCounts;
    }

    function getVerifiedUserCount() public view returns (uint256) {
        return verifiedUserCounts;
    }

    function verifyUser(address _walletId) public {
        userStructs[_walletId].isVerified = true;
        verifiedUserCounts++;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

contract UserContract {
    uint256 postCounts;
    uint256 commentCounts;
    uint256 likeCounts;
    address owner;

    constructor(address walletId) {
        owner = walletId;
        postCounts = 0;
        commentCounts = 0;
        likeCounts = 0;
    }

    struct PostStruct {
        uint256 postId;
        string postContent;
        uint256 likeCount;
        uint256 commentCount;
    }
    struct CommentStruct {
        uint256 commentId;
        string commentContent;
        uint256 likeCount;
    }

    event Post(
        uint256 postId,
        string postContent,
        uint256 likeCount,
        uint256 commentCount
    );
    event Comment(uint256 commentId, string commentContent, uint256 likeCount);
    event Like(uint256 likeCount);

    mapping(uint256 => PostStruct) public postStructs;
    mapping(uint256 => CommentStruct) public commentStructs;

    function createPost(string memory _postContent) public {
        if (msg.sender == owner) {
            postStructs[postCounts].postId = postCounts;
            postStructs[postCounts].postContent = _postContent;
            postStructs[postCounts].likeCount = 0;
            postStructs[postCounts].commentCount = 0;
            postCounts++;
            emit Post(postCounts, _postContent, 0, 0);
        }
    }

    function createComment(uint256 _postId, string memory _commentContent)
        public
    {
        commentStructs[commentCounts].commentId = commentCounts;
        commentStructs[commentCounts].commentContent = _commentContent;
        commentStructs[commentCounts].likeCount = 0;
        postStructs[_postId].commentCount++;
        commentCounts++;
        emit Comment(commentCounts, _commentContent, 0);
    }

    function likePost(uint256 _postId) public {
        postStructs[_postId].likeCount++;
        emit Like(postStructs[_postId].likeCount);
    }

    function getPosts() public view returns (PostStruct[] memory) {
        PostStruct[] memory posts = new PostStruct[](postCounts);
        for (uint256 i = 0; i < postCounts; i++) {
            posts[i] = postStructs[i];
        }
        return posts;
    }

    function getComments() public view returns (CommentStruct[] memory) {
        CommentStruct[] memory comments = new CommentStruct[](commentCounts);
        for (uint256 i = 0; i < commentCounts; i++) {
            comments[i] = commentStructs[i];
        }
        return comments;
    }

    function getPostCount() public view returns (uint256) {
        return postCounts;
    }

    function getCommentCount() public view returns (uint256) {
        return commentCounts;
    }

    function getLikeCount() public view returns (uint256) {
        return likeCounts;
    }
}
