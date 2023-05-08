import { AcUnit } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured.jsx";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import axios from "axios";
export default function Home({ type }) {
	const [lists, setLists] = useState([]);
	const [genre, setGenre] = useState(null);

	useEffect(() => {
		const getRandomList = async () => {
			try {
				const res = await axios.get(
					`/api/list${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
					{
						headers: {
							token:
								"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjdhYTUwNmVhMmIyYjI1ZGEyMTVlZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTU3NDUwNSwiZXhwIjoxNjkwMjE0NTA1fQ.tIbjrEtSqwvaxZhErVMOeHWSyZuFZ0ZXEMnSyefCjU0",
						},
					}
				);
				// console.log(res);

				setLists(res.data.data);
				console.log(res.data);
				// console.log({ ...lists }.title);
			} catch (err) {
				console.log(err);
			}
		};
		getRandomList();
	}, [type, genre]);
	return (
		<div className="home">
			<Navbar />
			<Featured type={type} setGenre={setGenre} />
			{/* <Featured /> */}
			{lists.map((list) => (
				<List list={list} />
			))}
			;
			
		</div>
	);
}
