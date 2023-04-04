import { Row, Col, Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default function Highlights() {
	return (
		<div className="pb-5">
			<div>
				<Row>
					{/* 1st Card */}
					<Col xs={12} md={4}>
						<Card className="cardHighlight p-3">
					  		<Card.Body>
					    		<Card.Title>
					    			<h2>Learn from Home</h2>
					    		</Card.Title>
					    		<Card.Text>
					  				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					    		</Card.Text>
						  	</Card.Body>
						</Card>
					</Col>

					{/* 2nd Card */}
					<Col xs={12} md={4}>
						<Card className="cardHighlight p-3">
					  		<Card.Body>
					    		<Card.Title>
					    			<h2>Study Now, Pay later</h2>
					    		</Card.Title>
					    		<Card.Text>
					  				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					    		</Card.Text>
						  	</Card.Body>
						</Card>
					</Col>

					{/* 3rd Card */}
					<Col xs={12} md={4}>
						<Card className="cardHighlight p-3">
					  		<Card.Body>
					    		<Card.Title>
					    			<h2>Be Part of Our Community</h2>
					    		</Card.Title>
					    		<Card.Text>
					  				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					    		</Card.Text>
						  	</Card.Body>
						</Card>
					</Col>
				</Row>
			</div>
		
		{/* S50 Activity */}
		
			<div>
				<Row className="pt-3 pb-3">
					<Col xs={12} md={12}>
						<Card className="cardHighlight ">
					  		<Card.Body>
					    		<Card.Title>
					    			<h4>Sample Course</h4>
					    		</Card.Title>
					    		<Card.Text>
					    			<div>
					    				<h5 className="mb-0">Description:</h5>
					    				<p>This is a sample course offering</p>
					    			</div>

					    			<div>
					    				<h5 className="mb-0">Price:</h5>
					    				<p>PhP 40,000</p>
					    			</div>

					    			<div>
					    				<Button variant="primary">Enroll</Button>
					    			</div>
					    		</Card.Text>
						  	</Card.Body>
						</Card>
					</Col>
				</Row>
		</div>
	</div>
	)
}