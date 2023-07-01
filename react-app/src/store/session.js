// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

// thunk to update the about section for the current user

export const updateAboutThunk = (about) => async dispatch => {
	const res = await fetch(`/api/users/about`, {
		method: "PUT",
		headers: { "Content-Type" : "application/json"},
		body: JSON.stringify(about)
	})
	if (res.ok) {
		const newUser = await res.json();
		dispatch(setUser(newUser))
		return newUser;
	} else {
		return ["An error occurred. Please try again."];
	}
}

// thunk to update a user's search filter preferences
export const updateFiltersThunk = (gender, ageMin, ageMax) => async dispatch => {
	const res = await fetch("/api/users/filters", {
		method: "PUT",
		headers: { "Content-Type" : "application/json"},
		body: JSON.stringify({
			gender,
			age_min: ageMin,
			age_max: ageMax
		})
	})
		if (res.ok) {
			const newUser = await res.json()
			dispatch(setUser(newUser))
			return newUser;
		}
}

// thunk to update a photo for the current user

export const updatePhotoThunk = (photoNum, picture_url) => async dispatch => {
	const res = await fetch(`/api/users/update-photo/${photoNum}`, {
		method: "PUT",
		headers: { "Content-Type" : "application/json"},
		body: JSON.stringify({picture_url})
	})
	if (res.ok) {
		const newUser = await res.json();
		dispatch(setUser(newUser))
		return newUser;
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = (user) => async (dispatch) => {

	console.log("USER: ", user)
	const response = await fetch("/api/auth/signup", {
		method: "POST",
	// 	 headers: {
    //     'Accept': 'application/json',
    //     "Content-Type": "application/json",
    //   },
		body: user
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
