import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import axios from "axios";

export default function Login(props){
	// Allows us to consume the User Context object and its properties to use for user validation
	const { user, setUser } = useContext(UserContext);

	// State hooks to store the values of the input fields
	const [email, setEmail] = useState('');
	const [password,setPassword] = useState('');
	// State to determine whether the submit button is enabled or not
	const [isActive, setIsActive] = useState(false);
	const [access, setaccess] = useState('');


	const navRegister = () => {
		console.log("register");
	}

	// Function to simulate user registration
	async function authenticate(e) {
		e.preventDefault();
		//Prevents page redirection via form submission
		// Set the email of the authenticated user in the local storage
		/*
			Syntax:
				localStorage.setItem('propertyName', value);
		*/
		
		// though access to the user information can be done via localStorage, this is necessary to update the user state which will help update the App Component and rerender it to avoid refreshing the page upon user login/logout
		
		// clear input fields
		// setEmail('');
		// setPassword('');

		await axios
      .post("http://localhost:5000/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
		console.log(response.data.access);
		if (response.data.access != null){
			setaccess(response.data.access);
			setUser({
				email: email,
				access: response.data.access,
			});
			localStorage.setItem('access', response.data.access);
		}
      });

		alert(`${email} has been verified! Welcome Back!`);
	}

	useEffect(() => {
		// Validation to enable submit button when all fields are populated and both passwords match
		if(email !== '' && password !== ''){
			setIsActive(true);
		}
		else{
			setIsActive(false);
		}
	}, [email, password]);

		return(
			(user.email !== null) ?
			<Navigate to="/courses" />
			:
			<Form onSubmit={(e) => authenticate(e)}>
				<h1>Login</h1>
			    <Form.Group className="mb-3" controlId="userEmail">
				    <Form.Label>Email address</Form.Label>
			        <Form.Control 
			        	type="email" 
			        	placeholder="Enter email" 
			        	value = {email}
			        	onChange={e => setEmail(e.target.value)}
			        	required
			        />

			    </Form.Group>
				{/* We will now do 2 way binding */}
			    <Form.Group className="mb-3" controlId="password">
			   	    <Form.Label>Password</Form.Label>
			        <Form.Control 
			        	type="password"
			        	placeholder="Password"
			        	value = {password}
			        	onChange={e => setPassword(e.target.value)} 
			        	required 
			        />
			    </Form.Group>

			    {/* Conditional render submit button based on isActive state */}
			    { isActive ?
			    <Button variant="success" type="submit" id="submitBtn">
			        Login
			    </Button>
			    :
			    <Button variant="success" type="submit" id="submitBtn" disabled>
			        Login
			    </Button>

			}
			<p>Don't have an account yet? <a onClick={navRegister}>Click here</a> to register</p>

		</Form>		
	)
}