// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleToken {
    string public name;
    string public symbol;
    uint8 public decimals = 18;

    uint256 public totalSupply;
    address public owner;

    mapping(address => uint256) private balances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Mint(address indexed to, uint256 value);
    event Burn(address indexed from, uint256 value);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply
    ) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;

        totalSupply = _initialSupply;
        balances[owner] = _initialSupply;

        emit Transfer(address(0), owner, _initialSupply);
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(to != address(0), "Zero address");
        require(balances[msg.sender] >= amount, "Insufficient balance");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function mint(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be > 0");

        totalSupply += amount;
        balances[owner] += amount;

        emit Mint(owner, amount);
        emit Transfer(address(0), owner, amount);
    }

    function burn(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be > 0");
        require(balances[owner] >= amount, "Insufficient balance");

        balances[owner] -= amount;
        totalSupply -= amount;

        emit Burn(owner, amount);
        emit Transfer(owner, address(0), amount);
    }
}
