pragma solidity ^0.5.0;
/* ABIEncoderV2 is needed to return an array from a function. */
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
   * Get all medical records of a user.
   */
  function getDocuments(address user) public view returns (string[] memory) {
    return documents[user];
  }

  /**
   * A user can specify, which doctors are allowed to view their medical records.
   * Access is granted, when the user adds his address to a doctors list of patients.
   * As soon as the user address is removed from the list, access for the doctor is revoked.
   *
   * mapping: doctorsAddress -> patientsAddresses
   */
  mapping (address => address[]) public doctorsPermissions;

  /**
   * Allow a doctor to view all your documents.
   */
  function giveAccessToDoctor(address doctor) public {
    doctorsPermissions[doctor].push(msg.sender);
  }

  /**
   * Revoke a doctors access to your documents.
   */
  function revokeAccessFromDoctor(address doctor, uint index) public {
    require(doctorsPermissions[doctor][index] == msg.sender, 'You can only revoke access to your own documents.');
    delete doctorsPermissions[doctor][index];
  }

  /**
   * Returns all the patients addresses that gave the doctor access.
   */
  function getDoctorsPermissions(address doctor) public view returns (address[] memory) {
    return doctorsPermissions[doctor];
  }
}
