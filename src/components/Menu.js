import React from 'react'

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

function Menu({setCategoryTo}) {
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
						Long Term
					</Button>
				</Col>
			</Row>
		</Container>
	)
}

export default Menu
