import React, { Component } from "react";
import PatientView from './components/PatientView'
import DoctorView from './components/DoctorView'
import HealthchainContract from "./contracts/Healthchain.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import 'open-iconic/font/css/open-iconic-bootstrap.css'
import 'bootstrap/dist/css/bootstrap.css';
import LogInOrRegister from "./components/LogInOrRegister";

class App extends Component {
  state = { storageValue: '0', web3: null, accounts: null, contract: null, jwt: null };

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
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    let jwt = localStorage.getItem('jwt')
    this.setState({ jwt })
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

        {/* DEBUG STUFF */}
        <button className="btn btn-warning debug-buttons" onClick={async () => {
            localStorage.setItem('jwt', 'debug')
            const jwt = localStorage.getItem('jwt')
            const isDoctor = false
            this.setState({jwt, isDoctor})
            }}>Log in as patient</button>

        <button className="btn btn-warning debug-buttons" onClick={async () => {
            localStorage.setItem('jwt', 'debug')
            const jwt = localStorage.getItem('jwt')
            const isDoctor = true
            this.setState({jwt, isDoctor})
            }}>Log in as doctor</button>

        <button className="btn btn-warning debug-buttons" onClick={async () => {
            localStorage.removeItem('jwt')
            const jwt = null
            const isDoctor = false
            this.setState({jwt, isDoctor})
            }}>Log off</button>

        <div className="card">

          <div className="card-header">
            <h1>
              <span className="header-icon oi oi-grid-three-up"></span>
              HEALTHCHAIN
            </h1>
          </div>

          <div className="card-body">
            {!this.state.jwt && !this.state.isDoctor &&
              <LogInOrRegister />
            }
            {this.state.jwt && !this.state.isDoctor &&
              <PatientView accounts={this.state.accounts} contract={this.state.contract} />
            }
            {this.state.jwt && this.state.isDoctor &&
              <DoctorView />
            }
          </div>

        </div>
      </div>
    );
  }
}

export default App;
