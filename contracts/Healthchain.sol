pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract Healthchain {

  /* Every user has a list of documents. */
  mapping (address => string[]) public documents;

  /**
   * Add a medical record.
   * Returns the index of the medical record.
   */
  function addDocument(string memory documentHash) public returns (uint) {
    address from = msg.sender;
    // push returns the array length
    return documents[from].push(documentHash) - 1;
  }

  /**
   * Get all documents of the user who calls this function.
   */
  function getMyDocuments() public view returns (string[] memory) {
    return documents[msg.sender];
  }

  /**
   * A user can specify, which doctors are allowed to view their medical records.
   * Access is granted, when the user adds his address to a doctors list of patients.
   * As soon as the user address is removed from the list, access for the doctor is revoked.
   *
   * mapping: doctorsAddress -> patientsAddresses
   */
  mapping (address => address[]) public doctors;

  function registerAsDoctor() public {
    address from = msg.sender;
    require(doctors[from][0] != from, 'You are already registered as a doctor!');
    doctors[from].push(from);
  }

  function giveAccessToDoctor(address doctorsAddress) public {
  }
}
