import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from "axios";
import './coursecard.css'

export default function CourseCard({courseProp}) {


	// we will be using state hook for this component to be able to store its state
	// States are used to keep track of information related to individual components
	// SYNTAX:
		// const [getter, setter] = useState(initialGetterValue)
	const [ count, setCount ] = useState(0);
	// console.log(useState(0));

	// checks the value of props
	// console.log(courseProp)
	// console.log(typeof courseProp)
	
	// Deconstruct the courseProp properties into their own variables
	const { _id, name, description, price, isActive, createdOn, orders, __v } = courseProp;
	// console.log(name);
	// console.log(description);
	// console.log(price);

	// Function that keeps track of the enrollees for a course
	// By default JavaScript is synchronous it executes code from the top of the file all the way to the bottom and will wait for the completion of one expression before it proceeds to the next
	// The setter function for useStates are asynchronous allowing it to execute separately from other codes in the program
	// The "setCount" function is being executed while the "console.log" is already completed resulting in the value to be displayed in the console to be behind by one count

	// Use state hook for getting and setting the seats for this course
	const [order, setorder] = useState(0);


	const checkout = async (name, order) => {
		console.log(order);
		if (order === 0) {
			alert("Quantity 0 is not valid");
			return;
		}
		console.log("checking out");
		console.log(name);
		console.log(order);	

	  await axios
      .post("http://localhost:5000/users/createOrder", [
		{
			"productName": name,
			"quantity": order,
		}
	  ], {
        headers: {
			'authorization':localStorage.getItem('access')
		},

      })
      .then((response) => {
        console.log(response.data);
		setorder(0);
		let a = document.getElementsByClassName("btn-close");
		for (let i = 0; i < a.length; i++) {
			a[i].click();
		}
		alert("Created order on " + name);
      });

	}

	const [isOpen, setIsOpen] = useState(true);

	const reset = () => {
		setorder(0);
	}

	const increment=()=> {
		setorder(order+1);
	}
	
	const decrement=()=> {
		if (order > 0){
			setorder(order-1);
		}
	}

    return (
        <Card>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Price:</Card.Subtitle>
                <Card.Text>P {price}</Card.Text>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={"#" + (name + price).replaceAll(' ', '')}>
  					Details
				</button>
				<div class="modal fade" id={(name + price).replaceAll(' ', '')} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="exampleModalLabel">{name}</h1>
							<button type="button" id = "closebut" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							{description} <br/>
							price: {price} <br/>
							Quantity:
						</div>
						<div class="modal-footer">
							<p>Quantity:</p>
							<div id = "footer1">
								<div id = "plus" onClick={increment}>+</div>
								<div id = "quantity">{order}</div>
								<div id = "minus" onClick={decrement}>-</div>
							</div>
							<div id = "footer2">
								<button onClick={() => checkout(name, order)} type="button" class="btn btn-primary">Checkout</button>
							</div>
						</div>
						</div>
					</div>
				</div>
            </Card.Body>
        </Card>
    )
}

CourseCard.propTypes = {
    // The "shape" method is used to check if a prop object conforms to a specific "shape"
    course: PropTypes.shape({
        // Define the properties and their expected types
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}

