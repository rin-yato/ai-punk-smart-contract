// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract Komnou is ERC721, Ownable {
    string _baseTokenURI;

    //  _price is the price of one Crypto Dev NFT
    uint256 public _price = 0.01 ether;

    // _paused is used to pause the contract in case of an emergency
    bool public _paused;

    // max number of CryptoDevs
    uint256 public maxTokenIds = 1000;

    // total number of tokenIds minted
    uint256 public tokenIds;

    mapping(address => uint256[]) getNFTFromAddress;

    modifier onlyWhenNotPaused() {
        require(!_paused, 'Contract currently paused');
        _;
    }

    constructor(string memory baseURI) ERC721('AI Punk', 'AIP') {
        _baseTokenURI = baseURI;
    }

    function getCollection(
        address _address
    ) public view returns (uint256[] memory) {
        return getNFTFromAddress[_address];
    }

    function mint() public payable onlyWhenNotPaused {
        require(tokenIds < maxTokenIds, 'Exceed maximum Crypto Devs supply');
        require(msg.value >= _price, 'Ether sent is not correct');
        if (tokenIds == 19) {
            tokenIds += 1;
        }
        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);
        getNFTFromAddress[msg.sender].push(tokenIds);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setPaused(bool val) public onlyOwner {
        _paused = val;
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{ value: amount }('');
        require(sent, 'Failed to send Ether');
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        string memory baseURI = _baseURI();

        return string.concat(baseURI, Strings.toString(tokenId), '.png');
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
