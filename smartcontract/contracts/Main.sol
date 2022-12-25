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
    struct PostStruct {
        uint256 postId;
        string postContent;
        uint256 likeCount;
        uint256 commentCount;
        string timeStamp;
        string userName;
        bool isVerified;
    }

    event User(
        address walletId,
        address userContractAddress,
        string userName,
        string password,
        bool isVerified
    );
    event Post(
        uint256 postId,
        string postContent,
        uint256 likeCount,
        uint256 commentCount,
        string timeStamp,
        string userName,
        bool isVerified
    );

    mapping(address => UserStruct) public userStructs;
    mapping(string => address) public userNameToWalletId;
    address[] public numberToWalletId;
    string[] public userNames;

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
        userNameToWalletId[_userName] = _walletId;
        userNames.push(_userName);
        numberToWalletId.push(_walletId);
        emit User(_walletId, uca, _userName, _password, false);
    }

    function getAllUserNames() public view returns (string[] memory) {
        return userNames;
    }

    function getUser(address _walletId)
        public
        view
        returns (
            address,
            string memory,
            string memory,
            bool,
            address
        )
    {
        if (userStructs[_walletId].walletId == address(0)) {
            return (
                address(0),
                "account does not exist",
                "",
                false,
                address(0)
            );
        }
        return (
            userStructs[_walletId].walletId,
            userStructs[_walletId].userName,
            userStructs[_walletId].password,
            userStructs[_walletId].isVerified,
            userStructs[_walletId].userContractAddress
        );
    }

    function getUserByUserName(string memory _userName)
        public
        view
        returns (
            address,
            string memory,
            string memory,
            bool,
            address
        )
    {
        address _walletId = userNameToWalletId[_userName];
        if (userStructs[_walletId].walletId == address(0)) {
            return (
                address(0),
                "account does not exist",
                "",
                false,
                address(0)
            );
        }
        return (
            userStructs[_walletId].walletId,
            userStructs[_walletId].userName,
            userStructs[_walletId].password,
            userStructs[_walletId].isVerified,
            userStructs[_walletId].userContractAddress
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

    function makePost(
        address _walletId,
        string memory _postContent,
        string memory timeStamp
    ) public {
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        uc.createPost(
            _postContent,
            timeStamp,
            userStructs[_walletId].userName,
            userStructs[_walletId].isVerified
        );
    }

    function makeComment(
        string memory _comment,
        string memory _postOwner,
        uint256 _postId
    ) public {
        address _walletId = userNameToWalletId[_postOwner];
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        uc.createComment(_comment, _postId);
    }

    function getComments(string memory _postOwner)
        public
        view
        returns (string[] memory)
    {
        address _walletId = userNameToWalletId[_postOwner];
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        return uc.getComments();
    }

    function likePost(
        string memory _userName,
        uint256 _postId,
        address _myWalletId
    ) public {
        address _walletId = userNameToWalletId[_userName];
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        uc.likePost(_postId);
        UserContract ucf = UserContract(
            userStructs[_myWalletId].userContractAddress
        );
        // concat postId and userName
        // string memory _postIdAndUserName = string(
        //     abi.encodePacked(_postId, " ", _userName)
        // );
        ucf.updateMylikes(_postId, _userName);
    }

    function followUser(address _walletId, address _followingId) public {
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        uc.followSomeone(_followingId);
        UserContract ucf = UserContract(
            userStructs[_followingId].userContractAddress
        );
        ucf.updateFollowersCount();
    }

    function getFollowing(address _walletId)
        public
        view
        returns (address[] memory)
    {
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        return uc.getFollowing();
    }

    function getFollowersCount(address _walletId)
        public
        view
        returns (uint256)
    {
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        return uc.getFollowersCount();
    }

    function getPosts(address _walletId)
        public
        view
        returns (UserContract.PostStruct[] memory)
    {
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        return uc.getPosts();
    }

    function getAllUsersAddress() public view returns (address[] memory) {
        return numberToWalletId;
    }

    function getPostCount(address _walletId) public view returns (uint256) {
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        return uc.getPostCount();
    }

    function getCommentCount(address _walletId) public view returns (uint256) {
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        return uc.getCommentCount();
    }

    function getLikeCount(address _walletId) public view returns (uint256) {
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        return uc.getLikeCount();
    }

    function getMyLikes(address _walletId)
        public
        view
        returns (UserContract.myLikeStruct[] memory)
    {
        UserContract uc = UserContract(
            userStructs[_walletId].userContractAddress
        );
        return uc.getMyLikes();
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

contract UserContract {
    uint256 postCounts;
    uint256 commentCounts;
    uint256 likeCounts;
    address owner;
    uint256 followersCount;
    address[] following;
    myLikeStruct[] myLikes;
    string[] comments;

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
        string timeStamp;
        string userName;
        bool isVerified;
    }
    // struct CommentStruct {
    //     uint256 commentId;
    //     string commentContent;
    //     uint256 likeCount;
    // }
    struct myLikeStruct {
        uint256 postId;
        string userName;
    }
    event Post(
        uint256 postId,
        string postContent,
        uint256 likeCount,
        uint256 commentCount,
        string timeStamp,
        string userName,
        bool isVerified
    );
    // event Comment(uint256 commentId, string commentContent, uint256 likeCount);
    event Like(uint256 likeCount);

    mapping(uint256 => PostStruct) public postStructs;

    // mapping(uint256 => CommentStruct) public commentStructs;

    function createPost(
        string memory _postContent,
        string memory timeStamp,
        string memory userName,
        bool isVerified
    ) public {
        postStructs[postCounts].postId = postCounts;
        postStructs[postCounts].postContent = _postContent;
        postStructs[postCounts].likeCount = 0;
        postStructs[postCounts].commentCount = 0;
        postStructs[postCounts].timeStamp = timeStamp;
        postStructs[postCounts].userName = userName;
        postStructs[postCounts].isVerified = isVerified;

        postCounts++;
        emit Post(
            postCounts,
            _postContent,
            0,
            0,
            timeStamp,
            userName,
            isVerified
        );
    }

    function createComment(string memory _commentContent, uint256 _postId)
        public
    {
        comments.push(_commentContent);
        postStructs[_postId].commentCount++;
    }

    function getComments() public view returns (string[] memory) {
        return comments;
    }

    function likePost(uint256 _postId) public {
        postStructs[_postId].likeCount++;
        emit Like(postStructs[_postId].likeCount);
    }

    function updateMylikes(uint256 _postId, string memory _userName) public {
        myLikes.push(myLikeStruct(_postId, _userName));
    }

    function followSomeone(address _walletId) public {
        following.push(_walletId);
    }

    function updateFollowersCount() public {
        followersCount++;
    }

    function getFollowersCount() public view returns (uint256) {
        return followersCount;
    }

    function getFollowing() public view returns (address[] memory) {
        return following;
    }

    function getPosts() public view returns (PostStruct[] memory) {
        PostStruct[] memory posts = new PostStruct[](postCounts);
        for (uint256 i = 0; i < postCounts; i++) {
            posts[i] = postStructs[i];
        }
        return posts;
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

    function getMyLikes() public view returns (myLikeStruct[] memory) {
        return myLikes;
    }
}
