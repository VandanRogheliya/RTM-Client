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

function SearchBar({ setSearchQuery }) {
	return (
		<Container>
			<Row className="mt-5 mb-5">
				<Col>
					<InputGroup size="lg">
						<Input placeholder="Search" type="text" onChange={e => setSearchQuery(e.target.value)} />
						<InputGroupAddon addonType="append">
							<InputGroupText>
								<i className="tim-icons icon-zoom-split" />
							</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
				</Col>
			</Row>
		</Container>
	)
}

export default SearchBar
