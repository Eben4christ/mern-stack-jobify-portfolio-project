import main from "../assets/images/main-alternative.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link, Navigate } from "react-router-dom";
import {useAppContext} from "../context/appContext"
import React from "react";

const Landing = () => {
  const {user} = useAppContext()
  return (
    <React.Fragment>
      {user && <Navigate to="/" />}
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Hey! Welcome to job App, a place where you can get hired or get
            competent employees to work with and catapult your organization to
            the next level. We look forward to seeing you achieving your goals
            with jobify. Thanks for joining us.
          </p>
          <Link to="/register" className="btn btn-hero">Login/Register</Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
    </React.Fragment>
  );
};

export default Landing;
