import React, { useState, useRef } from "react";
import "./login.scss";
import { AuthContext } from './../../authContext/authContext';
import { useContext } from "react";
import { login } from "../../authContext/apiCalls";
import { useNavigate } from 'react-router-dom';
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { dispatch } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		
		login({ email, password }, dispatch);

	};

	return (
		<div className="login">
			<div className="top">
				<div className="wrapper">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt="logo"
						className="logo"
					/>
					<button className="loginButton">Sign In</button>
				</div>
			</div>
			<div className="container">
				<form action="">
					<h1>Sign In</h1>
					<input
						type="email"
						name=""
						id=""
						placeholder="Email or phone number"
						onChange ={(e)=>setEmail(e.target.value)}
					/>
					<input type="password" name="" id="" placeholder="password"
						onChange={ (e)=>setPassword(e.target.value)} />
					<button className="loginButton" onClick={handleLogin}>Sign In</button>
					<span>
						New to Netflix?<span onClick={(e)=>navigate("/register")} className="register__link">
						<b>Sign Up now.</b>
						</span>
							
					</span>
					<small>
						This page is protected by Google reCAPTCHA to ensure you're not a
						bot. <strong>Learn More</strong>
					</small>
				</form>
			</div>
		</div>
	);
};

export default Login;
