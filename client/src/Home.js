import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const redirect_to_roles = () => {
    navigate("/roles");
  };
  const redirect_to_addCrop = () => {
    navigate("/addCrop");
  };
  const redirect_to_supply = () => {
    navigate("/supply");
  };
  const redirect_to_track = () => {
    navigate("/track");
  };
  return (
    <div className="container">
      <div className="header">
        <h3>Agricultural Supply Chain Flow :- </h3>
      </div>
      <br />
      <div className="register">
        <h6>
          (Note: Here <u>Owner</u> is the person who deployed the smart contract
          on the blockchain)
        </h6>
        <h5>
          Step 1: Owner Should Register Raw material suppliers ,Manufacturers,
          Distributors and Retailers
        </h5>
        <h6>(Note: This is a one time step. Skip to step 2 if already done)</h6>
        <button
          onClick={redirect_to_roles}
          className="btn btn-outline-primary btn-sm"
        >
          Register
        </button>
      </div>
      <br />
      <div className="ordercrops">
        <h5>Step 2: Owner should order crops</h5>
        <button
          onClick={redirect_to_addCrop}
          className="btn btn-outline-primary btn-sm"
        >
          Order crops
        </button>
      </div>
      <br />
      <div className="controlchain">
        <h5>Step 3: Control Supply Chain</h5>
        <button
          onClick={redirect_to_supply}
          className="btn btn-outline-primary btn-sm"
        >
          Control Supply Chain
        </button>
      </div>
      <br />
      <div className="track">
        <h5>
          <b>Track</b> the crops:
        </h5>
        <button
          onClick={redirect_to_track}
          className="btn btn-outline-primary btn-sm"
        >
          Track crops
        </button>
      </div>
    </div>
  );
}

export default Home;
