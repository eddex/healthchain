pragma solidity ^0.5.0;

contract Healthchain {
  uint currentIndex;
  string[] public documentHashes;

  function addDocument(string memory documentHash) public returns (uint) {
    documentHashes[currentIndex] = documentHash;
    return currentIndex++;
  }

  function getDocument(uint index) public view returns (string memory) {
    require(index >= 0, 'index must be >= 0!');
    return documentHashes[index];
  }
}
