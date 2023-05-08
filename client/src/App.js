import React, { useContext } from "react";
import "./App.scss";
import Home from "./pages/home/Home.jsx";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {
	BrowserRouter,
	Routes,
	Route,
	Switch,
	Navigate,
	// Redirect, replaced in v6
} from "react-router-dom";

import { AuthContext } from "./authContext/authContext";
function App() {
	const { user } = useContext(AuthContext);
	return (
		<BrowserRouter>
			<Routes>
				<Route
					exact
					path='/'
					element={user ? <Home /> : <Navigate to='/register' />}
				/>
				<Route path='/movies' element={<Home type='movie' />} />
				<Route path='/series' element={<Home type='series' />} />
				<Route path='/watch' element={<Watch />} />
				<Route
					path='/register'
					element={!user ? <Register /> : <Navigate to='/' />}
				/>
				<Route
					path='/login'
					element={!user ? <Login /> : <Navigate to='/' />}
				/>
				{user && (
					<>
						<Route path='/movies' element={<Home type='movie' />} />
						<Route path='/series' element={<Home type='series' />} />
						<Route path='/watch' element={<Watch />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}
export default App;
