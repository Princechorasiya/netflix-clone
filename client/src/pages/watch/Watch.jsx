import { ArrowBackOutlined } from "@mui/icons-material";
import React from "react";
import "./watch.scss";
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
	// const location = useLocation();
	const { state } = useLocation();
	console.log(state.trailer);
	
	// console.log(movie.trailer);
	return (
		<>
			<div className="watch">
				<Link to="/">
					<div className="back">
						<ArrowBackOutlined />
						Home
					</div>
				</Link>
				<video
					className="video"
					autoPlay
					progress
					controls
					src={state.video}
				></video>
			</div>
		</>
	);
};

export default Watch;
