// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;


interface WhiteListInterface {
 function whiteListedAddresses(address) external view returns (bool);
}   