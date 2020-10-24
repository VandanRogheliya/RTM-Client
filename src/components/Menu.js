import React, { useState } from 'react'

import {
	Button,
	Label,
	FormGroup,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
} from 'reactstrap'
import AddModal from './AddModal'

function Menu({ setCategoryTo, data }) {
	const [addToggle, setAddToggle] = useState(false)

	return (
		<Container>
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
			<Row className="mt-2">
				<Col>
					<Button color="success" className="mb-5" size="sm" onClick={() => setAddToggle(!addToggle)}>
						Add New Task/Goal
					</Button>
				</Col>
			</Row>
			<AddModal isOpen={addToggle} toggleModal={e => setAddToggle(e)} data={data} />
		</Container>
	)
}

export default Menu
