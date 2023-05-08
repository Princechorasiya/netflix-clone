import {
	ArrowBackIosOutlined,
	ArrowForwardIosOutlined,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

const List = ({ list }) => {
	const [slideNumber, setSlideNumber] = useState(0);
	const [isMoved, setISMoved] = useState(false);
	const listRef = useRef();

	const handleClick = (direction) => {
		let distance = listRef.current.getBoundingClientRect().x - 50; //height of the components
		console.log(slideNumber);
		setISMoved(true);
		if (direction === "left" && slideNumber > 0) {
			setSlideNumber(slideNumber - 1);

			listRef.current.style.transform = `translateX(${230 + distance}px)`;
			console.log("clicked");
		}
		if (direction === "right" && slideNumber < 5) {
			setSlideNumber(slideNumber + 1);
			listRef.current.style.transform = `translateX(${-230 + distance}px)`;
			console.log("clicked");
		}
	};
	return (
		<>
			<div className="list">
				<span className="listTitle">{list?.title}</span>
				{/* //data was not loading when component was rendered so we make it such that it only loads when data is there  */}
				<div className="wrapper">
					<ArrowBackIosOutlined
						className="sliderArrow left"
						onClick={() => handleClick("left")}
						style={{ display: !isMoved && "none" }}
					/>

					<div className="container" ref={listRef}>
						{list?.content.map((item, i) => (
							<ListItem index={i} item={item} />
						))}
					</div>
					<ArrowForwardIosOutlined
						className="sliderArrow right"
						onClick={() => handleClick("right")}
					/>
				</div>
			</div>
		</>
	);
};

export default List;
