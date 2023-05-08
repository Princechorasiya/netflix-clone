import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";

export const login = async (user, dispatch) => {
	dispatch(loginStart());
	try {
		const res = await axios.post("/api/auth/login", user);
		dispatch(loginSuccess(res.data.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};
