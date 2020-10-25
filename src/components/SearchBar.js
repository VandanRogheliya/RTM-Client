import React from 'react'

// Importing Bootstap components
import { Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from 'reactstrap'

// Search Bar component defination
function SearchBar({ setSearchQuery }) {
	// Rendering JSX
	return (
		<Container>
			<Row className="mt-5 mb-5">
				<Col>
					<InputGroup size="lg">
						{/* when value is changed searchQuery is updated */}
						<Input placeholder="Search" type="text" onChange={e => setSearchQuery(e.target.value)} />
						<InputGroupAddon addonType="append">
							{/* Search Icon */}
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
