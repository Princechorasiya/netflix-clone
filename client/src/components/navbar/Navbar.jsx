import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from './../../authContext/authContext';
import { logoutStart } from "../../authContext/AuthAction";

const Navbar = () => {
	const { dispatch } = useContext(AuthContext);

	const [isScrolled, setIsScrolled] = useState(false);
	window.onscroll = () => {
		setIsScrolled(window.pageYOffset === 0 ? false : true);
		return () => window.onscroll == null;
	};

	const handleLogout = (e) => {
		e.preventDefault();
		console.log("logout clicked");
		dispatch(logoutStart());
	}

	return (
		<div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
			<div className="container">
				<div className="left">
					{/* <img
						src={require("./images/HD-wallpaper-red-netflix-word-black-background-netflix.jpg")}
						alt="logo"
					/> */}
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
						alt="logo"
					/>

					<Link to="/" className="link">
						<span>Homepage</span>
					</Link>
					<Link to="/series" className="link">
						<span>Series</span>
					</Link>
					<Link to="/movies" className="link">
						<span>Movies</span>
					</Link>
					<span>Now and Popular</span>
					<span>My List</span>
				</div>
				<div className="right">
					<Search className="icons" />
					<span>KID</span>
					<Notifications className="icons" />
					<img
						src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=170667a&w=0&k=20&c=YQ_j83pg9fB-HWOd1Qur3_kBmG_ot_hZty8pvoFkr6A="
						alt=""
						className=""
					/>
					<div className="profile">
						<ArrowDropDown className="icons" />
						<div className="options">
							<span className="">Settings</span>
							<span className="" onClick={handleLogout}>Logout</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
