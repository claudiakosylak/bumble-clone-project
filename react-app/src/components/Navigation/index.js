import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<ul>
			{isLoaded && (
				<li className="upper-user-info">
					<ProfileButton user={sessionUser} />
					<p className="display-user-name">{sessionUser.first_name}</p>
				</li>
			)}
		</ul>
	);
}

export default Navigation;
