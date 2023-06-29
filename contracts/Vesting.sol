// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Vesting is ERC20, ReentrancyGuard {
    using SafeMath for uint256;

    // mapping of account's mail id with account's wallet address
    mapping(string => address) public email_to_address;

    // mapping of wallet address with account id
    mapping(address => uint256) public address_to_id;

    // mapping of wallet address with bool representing account status (Organization/individual)
    mapping(address => bool) public is_organization;

    address payable owner;

    uint256 transactPrice = 0.0001 ether;

    struct Organization {
        address orgAddress;
        uint256 id;
        string name;
        string symbol;
        uint256[] stakeholders;
    }

    struct Stakeholder {
        uint256 id;  
        uint256 orgId;
        address userAddress;  
        string role;    
        uint256 endTime;
        uint256 startTime;
        uint256 vestingPeriod;
        uint256 tokenAmount;
        uint256 claimedToken;
        bool whitelisted;
    }
    
    Organization[] public organizations;

    Stakeholder[] public stakeholders;

    event CreatedStakeholder(uint256 startTime, uint256 vestingPeriod);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        owner = payable(msg.sender);
    }

    function getTransactPrice() public view returns (uint256) {
        return transactPrice;
    }

    function registerOrganization(
        string memory name,
        string memory symbol,
        string calldata email,
        address orgAddress
        ) public payable nonReentrant{
        require(msg.value == transactPrice, "Price must be equal to transaction price");
        require(
            email_to_address[email] == address(0),
            "error: account already exists!"
        );

        if (organizations.length == 0) {
            organizations.push(); // add dummy element at index 0
        }

        Organization memory org = Organization({
            orgAddress: orgAddress,
            id: organizations.length,
            name: name,
            symbol: symbol,
            stakeholders: new uint256[](0)
        });
        organizations.push(org);     
        email_to_address[email] = orgAddress;
        address_to_id[orgAddress] = org.id;        
        is_organization[msg.sender] = true;

        // Transfer the transaction fee to the contract owner
        owner.transfer(transactPrice);
    }

    function addStakeholder(
        address _stakeholderAddress,
        string memory _role,
        uint256 _endTime,
        uint256 _tokenAmount,
        string memory email,
        uint256 _orgId
    ) public payable nonReentrant{
        require(msg.value == transactPrice, "Price must be equal to transaction price");
        require(is_organization[msg.sender], "Unauthorized");
        require(
            _orgId < organizations.length,
            "error: organization does not exist"
        );
        require(
            email_to_address[email] == address(0),
            "error: account already exists!"
        );

        if (stakeholders.length == 0) {
            stakeholders.push(); // add dummy element at index 0
        }

        Stakeholder memory user = Stakeholder({
            id : stakeholders.length,
            orgId : _orgId,
            userAddress : _stakeholderAddress,
            role : _role, 
            endTime : _endTime,
            startTime : block.timestamp,
            vestingPeriod : block.timestamp.add(_endTime),
            tokenAmount : _tokenAmount,
            claimedToken : 0,
            whitelisted : false
        });
        
        stakeholders.push(user);
        email_to_address[email] = _stakeholderAddress;
        address_to_id[_stakeholderAddress] = user.id;
        
        organizations[_orgId].stakeholders.push(user.id);

        emit CreatedStakeholder(block.timestamp, user.vestingPeriod);

        // Transfer the transaction fee to the contract owner
        owner.transfer(transactPrice);
    }

    // Function to list current employees of an organization
    function orgStakeholders(uint256 id)
        public view
        returns (uint256[] memory)
    {
        return organizations[id].stakeholders;
    }

    // Create signin function
    function signin(string calldata email) public view returns (string memory accountType, address _address) {
        // checking the function caller's wallet address 
        // from global map containing email address mapped to wallet address
        require(
            msg.sender == email_to_address[email],
            "Error: Incorrect wallet address used for signing in"
        );

        if (is_organization[msg.sender]) {
            accountType = "organization";
            _address = msg.sender;
        } else {
            accountType = "stakeholder";
            _address = msg.sender;
        }

        return (accountType, _address);
    }

    function whitelistStakeholder(uint256 stakeholderId) external payable nonReentrant {
        require(msg.value == transactPrice, "Price must be equal to transaction price");
        require(is_organization[msg.sender], "Only organization can perform this action");
        require(
            stakeholders[stakeholderId].orgId == address_to_id[msg.sender],
            "error: user is not of the same organization"
        );
        
        stakeholders[stakeholderId].whitelisted = true;
        // Transfer the transaction fee to the contract owner
        owner.transfer(transactPrice);
    }

    
    function claimTokens(uint256 amount, uint256 userId) public payable nonReentrant{
        require(msg.value == transactPrice, "Price must be equal to transaction price");
        require(stakeholders[userId].whitelisted = true, "You are not whitelisted");
        require(block.timestamp >= stakeholders[userId].vestingPeriod, "Vesting period not over");
        require(stakeholders[userId].tokenAmount >= amount, 
        "You can't claim more tokens than was vested");
        _mint(stakeholders[userId].userAddress, amount);
        stakeholders[userId].tokenAmount -= amount;
        stakeholders[userId].claimedToken += amount;

        // Transfer the transaction fee to the contract owner
        owner.transfer(transactPrice);
    }    
}