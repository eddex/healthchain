pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Healthchain {

  mapping (address => string[]) public documents;

  /* Add a medical record.
   * Returns the index of the medical record.
   */
  function addDocument(string memory documentHash) public returns (uint) {
    address from = msg.sender;
    // push returns the array length
    return documents[from].push(documentHash) - 1;
  }

  function getMyDocuments() public view returns (string[] memory) {
    return documents[msg.sender];
  }
}
