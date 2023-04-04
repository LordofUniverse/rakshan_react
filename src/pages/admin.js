import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import './admin.css'

export default function Admin(){
	// State hooks to store the values of the input fields
	const [email, setEmail] = useState('');
	const [password1, setPassword1] = useState('');
	const [password2,setPassword2] = useState('');
	// State to determine whether the submit button is enabled or not
	const [isadmin, setadmin] = useState(false);
	const [isprocessed, setprocessed] = useState(false);
	const [products, setproducts] = useState([]);
	const [name, setname] = useState('');
	const [desc, setdesc] = useState('');
	const [price, setprice] = useState();
	const [users, setusers] = useState([]);
	const [orders, setuserorders] = useState([]);

    useEffect(() => {

        if (localStorage.getItem('access') != null){

            axios
            .get("http://localhost:5000/users/isadmin",{
                headers : {
                    'authorization':localStorage.getItem('access')
                }
            }
            ).then((response) => {
                console.log(response.data);
                if (response.data === true){
                    setprocessed(true);
                    setadmin(true);
                    getdata();
                    getusers();
                    getuserorders();
                } else {
                    setprocessed(true);
                }
            })
            
        } else {
            setprocessed(true);
        }
    }, []);

    const getdata = () => {
        axios
			.get("http://localhost:5000/products/allProducts",  {
				headers: {
					'authorization':localStorage.getItem('access')
				}
			})
			.then((response) => {
                console.log(response.data);
				setproducts(response.data);
			});
    }

    const getusers = () => {
        axios
			.get("http://localhost:5000/users/allusers",  {
				headers: {
					'authorization':localStorage.getItem('access')
				}
			})
			.then((response) => {
                console.log(response.data);
				setusers(response.data);
			});
    }

    const getuserorders = () => {
        axios
			.get("http://localhost:5000/users/userorders",  {
				headers: {
					'authorization':localStorage.getItem('access')
				}
			})
			.then((response) => {
                console.log(response.data);
                if (response.data !== false){
                    setuserorders(response.data);
                }
			});
    }

    const reverseflipcourse = (name) => {
        axios
			.post("http://localhost:5000/products/archive", {
                name: name
            }, {
				headers: {
					'authorization':localStorage.getItem('access')
				}
			})
			.then((response) => {
                console.log(response.data);
                if (response.data === true) {
                    getdata();
                }
			});

    }

    const flipcourse = (name) => {
        axios
        .post("http://localhost:5000/products/activate", {
            name: name
        }, {
            headers: {
                'authorization':localStorage.getItem('access')
            }
        })
        .then((response) => {
            console.log(response.data);
            if (response.data === true) {
                getdata();
            }
        });
    }

    const flipadmin = (email) => {
        console.log("making admin");
        axios
        .post("http://localhost:5000/users/makeadmin", {
            email: email
        }, {
            headers: {
                'authorization':localStorage.getItem('access')
            }
        })
        .then((response) => {
            console.log(response.data);
            if (response.data === true) {                        
                getdata();
                getusers();
            }
        });
    }

    const reverseflipadmin = (email) => {
        console.log("revoking admin");
        axios
        .post("http://localhost:5000/users/revokeadmin", {
            email: email
        }, {
            headers: {
                'authorization':localStorage.getItem('access')
            }
        })
        .then((response) => {
            console.log(response.data);
            if (response.data === true) {
                getdata();
                getusers();
            }
        });
    }

    const createproduct = async () => {
        await axios
        .post("http://localhost:5000/products/create", {
            name: name,
            description: desc,
            price: price
        }, {
            headers: {
                'authorization':localStorage.getItem('access')
            }
        })
        .then((response) => {
            console.log(response.data);
            if (response.data === true) {
                getdata();
            }
        });

        document.getElementById("closebutton").click();
        
        alert("Created product " + name);

        getdata();

        setname('');
        setdesc('');
        setprice('');
    }

    const handleName = (event) => {
        setname(event.target.value);
    };

    const handleDesc = (event) => {
        setdesc(event.target.value);
    };

    const handlePrice = (event) => {
        setprice(event.target.value);
    };

		return(
            <div id = "adminpage">
                <div id = "admintitle">
                    Admin Dashboard
                </div>
                <div id = "buttons">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add new product</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">Make admin</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal3">Show User orders</button>
                </div>
                <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">User Orders</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        
                        <table class="table">
                            <thead>
                                <tr class="table-dark">
                                <th scope="col">User</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map( prod => {
                                        return (
                                            <tr>
                                                <th>{prod.email}</th>
                                                <th>{prod.order.productName}</th>
                                                <th>{prod.order.quantity}</th>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>  

                        </div>
                        <div class="modal-footer">
                            <button id = "closebutton" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">New Product</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Name</span>
                            <input onChange={handleName} type="text" class="form-control" placeholder="Name of Product" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>


                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Description</span>
                            <input onChange={handleDesc} type="text" class="form-control" placeholder="Description of Product" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Price</span>
                            <input onChange={handlePrice} type="text" class="form-control" placeholder="Price of Product" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>


                        </div>
                        <div class="modal-footer">
                            <button id = "closebutton" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={createproduct} type="button" class="btn btn-primary">Create</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Users list</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        
                        <table class="table">
                            <thead>
                                <tr class="table-dark">
                                <th scope="col">Email</th>
                                <th scope="col">Admin</th>
                                <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map( user => {
                                        return (
                                            <tr>
                                                <th>{user.email}</th>
                                                <th>{user.isAdmin ? "true" : "false"}</th>
                                                <th>
                                                    <div id = "buttongrp">
                                                        <button type="button" class="btn btn-primary" onClick={() => flipadmin(user.email)}>Make admin</button>
                                                        <button type="button" class="btn btn-danger" onClick={() => reverseflipadmin(user.email)}>Revoke admin</button>
                                                    </div>
                                                </th>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>          

                        </div>
                        <div class="modal-footer">
                            <button id = "closebutton" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={createproduct} type="button" class="btn btn-primary">Create</button>
                        </div>
                        </div>
                    </div>
                </div>
                <div id = "box">
                <table class="table">
                    <thead>
                        <tr class="table-dark">
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Availability</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map( course => {
                                return (
                                    <tr>
                                        <th>{course.name}</th>
                                        <th>{course.description}</th>
                                        <th>{course.price}</th>
                                        <th>{course.isActive ? "Available" : "Unavaliable"}</th>
                                        <th>
                                            <div id = "buttongrp">
                                                <button type="button" class="btn btn-primary" onClick={() => flipcourse(course.name)}>Update</button>
                                                <button type="button" class="btn btn-danger" onClick={() => reverseflipcourse(course.name)}>Disable</button>
                                            </div>
                                        </th>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>                       
                </div>
            </div>
        )
}