// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SampleToken {
    string public name = "Sample Token";
    string public symbol = "SMT";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000000 * (10 ** uint256(decimals));
    mapping(address => uint256) public balanceOf;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    event CustomEvent(address indexed user, uint256 timestamp);

    function triggerEvent() public {
        // Emit the CustomEvent
        emit CustomEvent(msg.sender, block.timestamp);
    }

    function transfer(address to, uint256 value) public {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
    }
}
