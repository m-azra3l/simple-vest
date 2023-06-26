pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@zeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract OrganizationToken is ERC20Pausable, ERC20Snapshot, Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct Stakeholder {
        uint256 vestingPeriod;
        uint256 startTime;
        uint256 amount;
        bool whitelisted;
    }

    mapping(address => mapping(uint8 => Stakeholder)) public stakeholders;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function registerOrganization(string memory name, string memory symbol) public onlyOwner {
        _mint(msg.sender, 1000000 * (10 ** decimals()));
    }

    function setStakeholderType(address stakeholder, uint8 stakeholderType, uint256 vestingPeriod, uint256 amount) public onlyOwner {
        require(stakeholder != address(0), "Invalid stakeholder address");
        stakeholders[stakeholder][stakeholderType] = Stakeholder(vestingPeriod, block.timestamp, amount, false);
    }

    function whitelistStakeholder(address stakeholder, uint8 stakeholderType) public onlyOwner {
        require(stakeholder != address(0), "Invalid stakeholder address");
        require(!stakeholders[stakeholder][stakeholderType].whitelisted, "Stakeholder already whitelisted");
        stakeholders[stakeholder][stakeholderType].whitelisted = true;
    }

    function claimTokens(uint8 stakeholderType) public {
        require(stakeholders[msg.sender][stakeholderType].whitelisted, "Not whitelisted");
        require(block.timestamp >= stakeholders[msg.sender][stakeholderType].startTime.add(stakeholders[msg.sender][stakeholderType].vestingPeriod), "Vesting period not over");

        uint256 amount = stakeholders[msg.sender][stakeholderType].amount;
        stakeholders[msg.sender][stakeholderType].amount = 0;
        _mint(msg.sender, amount);
    }
}
