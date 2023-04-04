import { useState, Fragment, useEffect } from 'react';
import coursesData from '../mockData/coursesData';
import CourseCard from '../components/CourseCard';
import './courses.css';
import axios from "axios";
import { Navigate } from 'react-router-dom';

export default function Courses(){
	// checks if the import is successful
	// console.log(coursesData);
	// console.log(coursesData[0]);


	const [products, setproducts] = useState([]);
	var backoff = false;

	const courses = coursesData.map( course => {
	    return (
	        <CourseCard key={course.id} courseProp={course}/>
	    );
	})

	useEffect(() => {

		console.log(localStorage.getItem('access'));

		if (localStorage.getItem('access') != null) {

			
			axios
			.get("http://localhost:5000/products/activeProducts", {
				headers: {
					'authorization':localStorage.getItem('access')
				}
			})
			.then((response) => {
				setproducts(response.data);
			});
		} else {
			backoff = true;
		}
	}, []);


	// the "courseProp" in the CourseCard component is called "prop" which is a shorthand for "property"
	// the curly braces are used to signify that we are providing information using JS expressions rather than hard coded values which use double quotes
	if (backoff) {
		return( 
			<Navigate to='/login' />
			)
	} else {

		console.log("backofffff");

		return(
			<Fragment classname = "frag">
			<div id = "coursediv">
				{
					products.map( course => {
						return (
							<CourseCard key={course._id} courseProp={course}/>
						);
					})
				}
			</div>
			</Fragment>
		)
	}
}

