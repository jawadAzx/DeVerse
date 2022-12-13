// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

contract Parent{
    uint256 public x;
    address public childd;
    constructor(){
        x = 10;
    }
    function makeChild() public returns(address){
        Child c = new Child();
        childd = address(c);
        return address(c);
    }
    function getSex() public view returns(string memory){
        // call sex function of childd
        Child c = Child(childd);
        return c.sex();
    }
    
}

contract Child {

    function sex() public view returns (string memory){
        return
        "hi there";
        
    }
}


