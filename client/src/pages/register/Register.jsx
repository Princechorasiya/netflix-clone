import "./resgister.scss";
import React, { useState, useRef } from "react";
import  axios  from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const navigate = useNavigate();


	const emailRef = useRef();
	const passwordRef = useRef();
	const usernameRef = useRef();

	const handleStart = () => {
		// console.log(emailRef);
		setEmail(emailRef.current.value);
	};
	const handleFinish = async (e) => {
		e.preventDefault();
		setPassword(passwordRef.current.value);
		setUsername(usernameRef.current.value);
		try {
			
			await axios.post("/api/auth/register", { email, password, username });
			navigate("/login");
		} catch (err) {
			console.log(err);
		}

	};
	return (
		<div className="register">
			<div className="top">
				<div className="wrapper">
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt="logo"
						className="logo"
					/>
					<button className="loginButton" onClick={(e) => navigate("/login")}>Sign In</button>
				</div>
			</div>
			<div className="container">
				<h1>Unlimited Movies,Tv shows, and more.</h1>
				<h2>Watch anywhere.Cancel anytime.</h2>
				<p>
					Ready to watch? Enter your email to create or restart your membership.
				</p>
				{!email ? (
					<div className="input">
						<input type="email" name="" id="" placeholder="email" ref={emailRef} />
						<button className="registerButton" onClick={handleStart}>
							Get started
						</button>
					</div>
				) : (
					<form action="" className="input">
						<input type="password" className="password" ref={passwordRef} />
						<input type="text" placeholder="username" className="username" ref={usernameRef} />
						<button className="registerButton" onClick={handleFinish}>
							Start
						</button>
					</form>
				)}
			</div>
		</div>
	);
};

export default Register;
