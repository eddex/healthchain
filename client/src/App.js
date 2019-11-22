import React, { Component } from "react";
import HealthchainContract from "./contracts/Healthchain.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";

class App extends Component {
  state = { storageValue: '0', web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HealthchainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        HealthchainContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    console.log('hello12')
    
    const documentHash = '0x23uih41249geiles12345678'
    // use call to get the value from this transaction, no changes made yet!!!
    const documentIndex = await contract.methods.addDocument(documentHash).call();
    // actual changes here!!!
    await contract.methods.addDocument(documentHash).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getDocument(documentIndex).call();

    // Update state with the result.
    this.setState({ storageValue: response });
    console.log("response from getDocument", response)
  };

  uploadMedicalRecord = async (medicalRecord) => {
    const { accounts, contract } = this.state;
    const documentIndex = await contract.methods.addDocument(medicalRecord).call();
    await contract.methods.addDocument(medicalRecord).send({ from: accounts[0] });
    const response = await contract.methods.getDocument(documentIndex).call();

    // Update state with the result.
    this.setState({ storageValue: response });
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="card">
          <div className="card-header">
            <h1>HEALTHCHAIN</h1>
          </div>
          <div className="card-body">
            <h2>Upload a medical record</h2>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Medical record:</span>
              </div>
              <input id="medical-record-input" type="text" className="form-control" placeholder="todo: this will be a file upload" />
            </div>
            <button className="btn btn-primary" onClick={() => this.uploadMedicalRecord(document.getElementById('medical-record-input').value)}>upload</button>
            <div>The stored value is: {this.state.storageValue}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
