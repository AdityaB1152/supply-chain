import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";

function AddCrop() {
  const navigate = useNavigate();
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [currentaccount, setCurrentaccount] = useState("");
  const [loader, setloader] = useState(true);
  const [SupplyChain, setSupplyChain] = useState();
  const [Crop, setCrop] = useState();
  const [CropName, setCropName] = useState();
  const [CropDes, setCropDes] = useState();
  const [CropStage, setCropStage] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchaindata = async () => {
    setloader(true);
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkId = await web3.eth.net.getId();
    const networkData = SupplyChainABI.networks[networkId];
    if (networkData) {
      const supplychain = new web3.eth.Contract(
        SupplyChainABI.abi,
        networkData.address
      );
      setSupplyChain(supplychain);
      var i;
      const CropCtr = await supplychain.methods.CropCtr().call();
      const Crop = {};
      const CropStage = [];
      for (i = 0; i < CropCtr; i++) {
        Crop[i] = await supplychain.methods.CropStock(i + 1).call();
        CropStage[i] = await supplychain.methods.showStage(i + 1).call();
      }
      setCrop(Crop);
      setCropStage(CropStage);
      setloader(false);
    } else {
      window.alert("The smart contract is not deployed to current network");
    }
  };
  if (loader) {
    return (
      <div>
        <h1 className="wait">Loading...</h1>
      </div>
    );
  }
  const redirect_to_home = () => {
    navigate("/");
  };
  const handlerChangeNameCrop = (event) => {
    setCropName(event.target.value);
  };
  const handlerChangeDesCrop = (event) => {
    setCropDes(event.target.value);
  };
  const handlerSubmitCrop = async (event) => {
    event.preventDefault();
    try {
      var reciept = await SupplyChain.methods
        .addcrop(CropName, CropDes)
        .send({ from: currentaccount });
      if (reciept) {
        loadBlockchaindata();
      }
    } catch (err) {
      alert("An error occured!!!");
    }
  };
  return (
    <div>
      <span>
        <b>Current Account Address:</b> {currentaccount}
      </span>
      <span
        onClick={redirect_to_home}
        className="btn btn-outline-danger btn-sm"
      >
        {" "}
        HOME
      </span>
      <br />
      <h5>Add crop Order:</h5>
      <form onSubmit={handlerSubmitCrop}>
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeNameCrop}
          placeholder="crop Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          onChange={handlerChangeDesCrop}
          placeholder="crop Description"
          required
        />
        <button
          className="btn btn-outline-success btn-sm"
          onSubmit={handlerSubmitCrop}
        >
          Order
        </button>
      </form>
      <br />
      <h5>Ordered crops:</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Stage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(Crop).map(function (key) {
            return (
              <tr key={key}>
                <td>{Crop[key].id}</td>
                <td>{Crop[key].name}</td>
                <td>{Crop[key].description}</td>
                <td>{CropStage[key]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AddCrop;
