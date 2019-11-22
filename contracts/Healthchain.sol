pragma solidity ^0.5.0;

contract Healthchain {
  string[] public documentHashes;

  function addDocument(string memory documentHash) public returns (uint) {
    // push returns the array length
    return documentHashes.push(documentHash) - 1;
  }

  function getDocument(uint index) public view returns (string memory) {
    require(index >= 0, 'index must be >= 0!');
    require(index < documentHashes.length, 'index out of range!');
    return documentHashes[index];
  }
}
