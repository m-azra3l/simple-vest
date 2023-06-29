'use client';
import vestingAbi from './contractAbi.js';
import { vestingAddress } from './contractAddress';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const shortenAddress = (strAddress) => {
    let firstChars = strAddress.toString().substr(0, firstLength);
    let lastChars = strAddress.toString().substr(-lastLength);

    return firstChars + "..." + lastChars;
};

const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    });
};

const connectContract = async () => {
    try {
        // const web3Modal = new Web3Modal();
        // const connection = await web3Modal.connect();
        // const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
        const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
        // const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(vestingAddress, vestingAbi, signer);
        return contract;
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const signUp = async (
    name,
    symbol,
    email,
    orgAddress) => {
    try {
        const contract = await connectContract();
        const register = await contract.registerOrganization(name, symbol, email, orgAddress);
        const receipt = await register.wait();
        if (receipt.status === 1) {
            return true;
        }
        console.log(`Transaction hash: ${register.hash}`);
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const signIn = async (email) => {
    try {
        const contract = await connectContract();
        const [accountType, address] = await contract.signin(email);
        return accountType, address;
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const addStakeholder = async (
    stakeholderAddress,
    role,
    endTime,
    tokenAmount,
    email,
    orgId
) => {
    try {
        const contract = await connectContract();
        const stakeholder = await contract.addStakeholder(stakeholderAddress, role, endTime, tokenAmount, email, orgId);
        const receipt = await stakeholder.wait();
        if (receipt.status === 1) {
            return true;
        }
        console.log(`Transaction hash: ${stakeholder.hash}`);
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const whitelist = async (userId) => {
    try {
        const contract = await connectContract();
        const whitelistUser = await contract.whitelistStakeholder(userId);
        const receipt = await whitelistUser.wait();
        if (receipt.status === 1) {
            return true;
        }
        console.log(`Transaction hash: ${whitelistUser.hash}`);
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const claimToken = async (amount, userId) => {
    try {
        const contract = await connectContract();
        const claim = await contract.claimTokens(amount, userId);
        const receipt = await claim.wait();
        if (receipt.status === 1) {
            return true;
        }
        console.log(`Transaction hash: ${claim.hash}`);
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const getId = async (address) => {
    try {
        const contract = await connectContract();
        const id = await contract.address_to_id(address);
        id.wait();
        return id;
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const getUser = async (userId) => {
    try {
        const contract = await connectContract();
        const user = await contract.stakeholders(userId);
        const sDate = new Date(user.startTime, 10);
        const startDate = sDate.toDateString();
        const eDate = new Date(user.endTime, 10);
        const endDate = new eDate.toDateString();
        const userData = {
            id: user.id,
            role: user.role,
            endTime: endDate,
            startTime: startDate,
            tokenAmount: user.tokenAmount,
            claimedToken: user.claimedToken,
            totalToken: user.tokenAmount + user.claimedToken,
            whitelisted: user.whitelisted
        }
        return userData;
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const getUserOrg = async (orgId) => {
    try {
        const contract = await connectContract();
        const org = await contract.organizations(orgId);
        const orgData = {
            name: org.name,
            symbol: org.symbol
        }
        return orgData;
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const verifyUser = async (userId, userAddress) => {
    try {
        const contract = await connectContract();
        const user = await contract.stakeholders(userId);
        if (user.userAddress == userAddress) {
            return true;
        }
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const getOrg = async (orgId) => {
    try {
        const contract = await connectContract();
        const org = await contract.organizations(orgId);
        const orgData = {
            tokenName: org.name,
            tokenSymbol: org.symbol
        }
        return orgData;
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const verifyOrg = async (orgId, orgAddress) => {
    try {
        const contract = await connectContract();
        const org = await contract.organizations(orgId);
        if (org.orgAddress == orgAddress) {
            return true;
        }
    }
    catch (error) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

const getOrgStakeholders = async (orgId) => {
    try {
        const contract = await connectContract();
        const orgUsers = await contract.orgStakeholders(orgId);
        const orgStakeholders = [];
        for (let i = 0; i < orgUsers.length; i++) {
            const user = await contract.stakeholders(orgUsers[i]);
            const sDate = new Date(user.startTime, 10);
            const startDate = sDate.toDateString();
            const eDate = new Date(user.endTime, 10);
            const endDate = new eDate.toDateString();
            orgStakeholders.push({
                id: user.id,
                role: user.role,
                address: user.userAddress,
                endTime: endDate,
                startTime: startDate,
                tokenAmount: user.tokenAmount,
                claimedToken: user.claimedToken,
                totalToken: user.tokenAmount + user.claimedToken,
                whitelisted: user.whitelisted
            });
        }
        return orgStakeholders;
    }
    catch (err) {
        console.log(error.message);
        throw new Error("Error", error);
    }
};

export {
    shortenAddress,
    formatPercentage,
    connectContract,
    signUp,
    signIn,
    addStakeholder,
    whitelist,
    claimToken,
    getId,
    getUser,
    getUserOrg,
    verifyUser,
    getOrg,
    verifyOrg,
    getOrgStakeholders
}