import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import "./Featured.scss";
import axios from "axios";
import { Link } from 'react-router-dom';
const Featured = ({ type,setGenre }) => {
	const [content, setContent] = useState({});

	useEffect(() => {
		const getRandomContent = async () => {
			try {
				const res = await axios.get(`/api/movies/random?type=${type}`, {
					headers: {
						token:
							"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjdhYTUwNmVhMmIyYjI1ZGEyMTVlZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTU3NDUwNSwiZXhwIjoxNjkwMjE0NTA1fQ.tIbjrEtSqwvaxZhErVMOeHWSyZuFZ0ZXEMnSyefCjU0",
					},
				});
				console.log("featured", res.data[0]);
				setContent(res.data[0]);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomContent();
	}, [type]);
	return (
		<div className="featured">
			{type && (
				<div className="category">
					<span>{type === "movie" ? "Movies" : "Series"}</span>
					<select name="genre" id="genre" onChange={(e)=>setGenre(e.target.value)}>
						<option value="">Genre</option>
						<option value="adventure">Adventure</option>
						<option value="comedy">Comedy</option>
						<option value="crime">Crime</option>
						<option value="fantasy">Fantasy</option>
						<option value="historical">Historical</option>
						<option value="horror">Horror</option>
						<option value="romance">Romance</option>
						<option value="sci-fi">Sci-fi</option>
						<option value="thriller">Thriller</option>
						<option value="western">Western</option>
						<option value="animation">Animation</option>
						<option value="drama">Drama</option>
						<option value="documentary">Documentary</option>
					</select>
				</div>
			)}
			<img src={content.img} alt="" className="" width="100%" />
			<div className="info">
				<img src={content.imgTitle} alt="" className="" />
				<span className="desc">{content.desc}</span>
				<div className="buttons">
					<button className="play">
						<PlayArrow />
						<Link to="/watch" state={content}>

						<span >Play</span>
						</Link>
					</button>
					<button className="more">
						<InfoOutlined />
						<span>Info</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Featured;
