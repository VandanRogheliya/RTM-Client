import React, { useState } from 'react'

// Importing Components
import AddModal from './AddModal'

// Importing Bootstrap Components
import { Button, Container, Row, Col } from 'reactstrap'

function Menu({ setCategoryTo, data, setHome }) {
	// addModal's toggle state
	const [addToggle, setAddToggle] = useState(false)

	// Rendering JSX
	return (
		<Container>
			{/* Catagory Buttons */}
			<Row>
				<Col>
					<Button color="primary" className="w-50" size="lg" onClick={() => setCategoryTo('task')}>
						Tasks
					</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button color="default" className="w-50" size="lg" onClick={() => setCategoryTo('week')}>
						Weekly Goals
					</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button color="default" className="w-50" size="lg" onClick={() => setCategoryTo('month')}>
						Monthly Goals
					</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button color="default" className="w-50 mb-5" size="lg" onClick={() => setCategoryTo('long')}>
						Long Term Goals
					</Button>
				</Col>
			</Row>

			{/* Add new Task/Goal Button */}
			<Row className="mt-2">
				<Col>
					<Button color="success" size="sm" onClick={() => setAddToggle(!addToggle)}>
						Add New Task/Goal
					</Button>
				</Col>
			</Row>
			<Row className="mt-2">
				<Col>
					<Button color="default" className="mb-5" size="sm" onClick={() => setHome(2)}>
						Visualize
					</Button>
				</Col>
			</Row>
			<AddModal isOpen={addToggle} toggleModal={e => setAddToggle(e)} data={data} />
		</Container>
	)
}

export default Menu
