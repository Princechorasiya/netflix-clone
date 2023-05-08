import {
	Add,
	PlayArrow,
	ThumbDownAltOutlined,
	ThumbUpAltOutlined,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./listItem.scss";
import axios from "axios";
const ListItem = ({ index, item }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [movie, setMovie] = useState({});
	console.log(item);

	// console.log(item);
	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await axios.get("/api/movies/find/" + item, {
					headers: {
						token:
							"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjdhYTUwNmVhMmIyYjI1ZGEyMTVlZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTU3NDUwNSwiZXhwIjoxNjkwMjE0NTA1fQ.tIbjrEtSqwvaxZhErVMOeHWSyZuFZ0ZXEMnSyefCjU0",
					},
				});
				setMovie(res?.data.data);
				console.log("movue", res?.data.data);
			} catch (err) {
				console.log(err);
			}
		};
		getMovie();
	}, [item]);
	return (
		<Link to={{ pathname: "/watch" }} state={movie}>
			<>
				<div
					className="listItem"
					style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					<img src={movie?.img} alt="" />
					{isHovered && (
						<>
							<video src={movie?.trailer} autoPlay={true} loop />

							<div className="itemInfo">
								<div className="icons">
									<PlayArrow className="icon" />
									<Add className="icon" />
									<ThumbUpAltOutlined className="icon" />
									<ThumbDownAltOutlined className="icon" />
								</div>

								<div className="itemInfoTop">
									<span>{movie?.duration}</span>
									<span className="limit">+{movie?.limit}</span>
									<span>{movie?.year}</span>
								</div>
								<div className="desc">{movie?.desc}</div>
								<div className="genre">{movie?.genre}</div>
							</div>
						</>
					)}
				</div>
			</>
		</Link>
	);
};

export default ListItem;
