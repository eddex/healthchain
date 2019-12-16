import React, { Component } from "react";
import PatientView from './components/PatientView'
import DoctorView from './components/DoctorView'
import HealthchainContract from "./contracts/Healthchain.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import 'open-iconic/font/css/open-iconic-bootstrap.css'
import 'bootstrap/dist/css/bootstrap.css';
import LogInOrRegister from "./components/LogInOrRegister";
import { doctors, patients } from './helpers/users'

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    user: null,
    isDoctor: false,
    accountId: null
  };

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
  };

  render() {

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    const updateLogInFromLocalStorage = () => {
      const user = localStorage.getItem('user')
      const isDoctor = localStorage.getItem('isDoctor') === 'true'
      const accountId = parseInt(localStorage.getItem('accountId'))
      this.setState({ user, isDoctor, accountId })
    }
    document.addEventListener('logInSuccessful', updateLogInFromLocalStorage, false)

    const changeLogIn = (user, isDoctor, accountId) => {
      localStorage.setItem('user', user)
      localStorage.setItem('isDoctor', isDoctor)
      localStorage.setItem('accountId', accountId)
      this.setState({ user, isDoctor, accountId })
    }

    return (
      <div className="App">

        {/* DEBUG STUFF */}
        <button className="btn btn-warning debug-buttons" onClick={async () => {
          changeLogIn(patients[1].name, false, patients[1].account)
        }}>Log in as patient</button>

        <button className="btn btn-warning debug-buttons" onClick={async () => {
          changeLogIn(doctors[1].name, true, doctors[1].account)
        }}>Log in as doctor</button>

        <button className="btn btn-warning debug-buttons" onClick={async () => {
          changeLogIn(null, null, null)
        }}>Log off</button>

        <div className="card">

          <div className="card-header">
            <h1>
              <span className="header-icon oi oi-grid-three-up"></span>
              HEALTHCHAIN
            </h1>
            {this.state.user &&
              <h4>Logged in as {this.state.user}</h4>
            }
          </div>

          <div className="card-body">
            {!this.state.user && !this.state.isDoctor &&
              <LogInOrRegister />
            }
            {this.state.user && !this.state.isDoctor &&
              <PatientView accounts={this.state.accounts} contract={this.state.contract} accountId={this.state.accountId} />
            }
            {this.state.user && this.state.isDoctor &&
              <DoctorView accounts={this.state.accounts} contract={this.state.contract} accountId={this.state.accountId} />
            }
          </div>

        </div>
      </div>
    );
  }
}

export default App;
