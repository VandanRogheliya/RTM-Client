import React, { useState } from 'react'
import { Container } from 'reactstrap'
import qoutes from "../assets/thoughts/quotes.json"

function PageHeader() {
	const [thought, setThought] = useState(qoutes[Math.floor(Math.random() * 1642)])
	// console.log(Math.floor(Math.random() * 1642))
	return (
		<div className="page-header header-filter">
			<div className="squares square1" />
			<div className="squares square2" />
			<div className="squares square3" />
			<div className="squares square4" />
			<div className="squares square5" />
			<div className="squares square6" />
			<div className="squares square7" />
			<Container>
				<div className="content-center brand">
					<h1 className="h1-seo">RTM• Macro To Micro</h1>
					<h3 className="d-none d-sm-block">
						{thought.text} {thought.author && <i> - {thought.author}</i>}
					</h3>
				</div>
			</Container>
		</div>
	)
}

export default PageHeader
