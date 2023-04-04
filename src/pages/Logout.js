import { Navigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../UserContext';

export default function Logout() {

	// consume the UserContext object and destructure it to access user state and unsetUser function

	const { unsetUser, setUser } = useContext(UserContext);

	// clears the LocalStorage
	unsetUser();

	// placing the setUser setter function inside the useEffect is necessary because of updates within React JS that a state of another component cannot be updated while trying to render a different component.

	// by adding the useEffect, this will allow the Logout page to render first before triggering the useEffect which changes the state of our user

	useEffect(() => {
		setUser({email:null, access:null});
	})
	// localStorage.clear();

	// Redirect back to login
	return( 
	<Navigate to='/login' />
	)
}
