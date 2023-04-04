import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";

export default function Register(){
	// State hooks to store the values of the input fields
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2,setPassword2] = useState('');
	// State to determine whether the submit button is enabled or not
	const [isActive, setIsActive] = useState(false);


	// Function to simulate user registration
	async function registerUser(e) {
		e.preventDefault();

		await axios
      .post("http://localhost:5000/register", {
        email: email,
        password: password1,
      })
      .then((response) => {
        console.log(response.data);
      });

		// clear input fields
		// setEmail('');
		// setPassword1('');
		// setPassword2('');

		alert('Thank you for your registration!');
	}

	const navLogin = () => {
		console.log("login");
	}

	useEffect(() => {
		// Validation to enable submit button when all fields are populated and both passwords match
		if((email !== '' && password1 !== '') && (password1 === password2)){
			setIsActive(true);
		}
		else{
			setIsActive(false);
		}
	}, [email, password1, password2]);

	return(
		<Form onSubmit={(e) => registerUser(e)}>
			<h1>Register</h1>
		    <Form.Group className="mb-3" controlId="userEmail">
			    <Form.Label>Email address</Form.Label>
		        <Form.Control 
		        	type="email" 
		        	placeholder="Enter email" 
		        	value = {email}
		        	onChange={e => setEmail(e.target.value)}
		        	required
		        />
		        <Form.Text className="text-muted">
		        	We'll never share your email with anyone else.
		        </Form.Text>
		    </Form.Group>
			{/* We will now do 2 way binding */}
		    <Form.Group className="mb-3" controlId="password1">
		   	    <Form.Label>Password</Form.Label>
		        <Form.Control 
		        	type="password"
		        	placeholder="Password"
		        	value = {password1}
		        	onChange={e => setPassword1(e.target.value)} 
		        	required 
		        />
		    </Form.Group>
		    
		    <Form.Group className="mb-3" controlId="password2">
		    	    <Form.Label>Verify Password</Form.Label>
		        <Form.Control 
		         	type="password"
		         	placeholder="Password" 
		         	value = {password2}
		         	onChange={e => setPassword2(e.target.value)}
		         	required 
		        />
		     </Form.Group>
		     {/* Conditional render submit button based on isActive state */}
		     { isActive ?
		     <Button variant="primary" type="submit" id="submitBtn">
		         Submit
		     </Button>
		     :
		     <Button variant="danger" type="submit" id="submitBtn" disabled>
		         Submit
		     </Button>

		}
			<p>Already have an account? <a onClick={navLogin}>Click here</a> to login</p>

		</Form>		
	)
}