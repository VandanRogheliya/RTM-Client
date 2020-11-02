import React, { useState } from 'react'

// Importing components
import EditModal from '../components/EditModal'

// Importing Bootstrap components
import { Button, Card, CardHeader, CardBody, Container, Row, Col, Badge, CardFooter } from 'reactstrap'

// Mission Component Defination
function Mission({ type, id, data, setHome }) {
	// Mission state
	const [mission, setMission] = useState(data[type.toLowerCase()][id])

	// EditModal's toggle
	const [editModal, setEditModal] = useState(false)

	// Gets the topic of the parent goal
	const getParentGoal = type => {
		let tmpType = type.toLowerCase()
		if (tmpType === 'task') {
			if (mission.parent_goal) return <h5>Parent Goal: {data['week'][mission.parent_goal].topic}</h5>
			else return <h5>Parent Goal: NONE</h5>
		}
		if (tmpType === 'week') {
			if (mission.parent_goal) return <h5>Parent Goal: {data['month'][mission.parent_goal].topic}</h5>
			else return <h5>Parent Goal: NONE</h5>
		}
		if (tmpType === 'month') {
			if (mission.parent_goal) return <h5>Parent Goal: {data['long'][mission.parent_goal].topic}</h5>
			else return <h5>Parent Goal: NONE</h5>
		}
		if (tmpType === 'long') {
			return <h5>Deadline: {new Date(mission.deadline).toLocaleDateString()}</h5>
		}
	}

	// Renders JSX
	return (
		<>
			{/* Edit Modal. Pops up when editModal State is true */}
			<EditModal
				isOpen={editModal}
				toggleModal={e => setEditModal(e)}
				type={type}
				mission={mission}
				data={data}
			/>

			{/* Title */}
			<h1 className="h1-seo mt-4">RTM</h1>

			{/* Back Button */}
			<Button color="default" className="btn-round  back-btn" onClick={() => setHome(1)}>
				<i className="tim-icons icon-double-left" />
			</Button>

			{/* Contents */}
			<Container>
				<Row>
					{/* Displays status, create date, parent goal/deadline, complete date and edit button */}
					<Col sm="12" md="3">
						<Card>
							<CardBody>
								<div>
									{mission.completed ? (
										<>
											<Badge color="success" pill>
												Completed
											</Badge>
											<h5 className="mt-2">
												Completed On: {new Date(mission.complete_date).toLocaleDateString()}
											</h5>
										</>
									) : (
										<Badge color="danger" pill>
											Pending
										</Badge>
									)}
								</div>
								<h5>Type: {type.toUpperCase()}</h5>
								<h5>Created At: {new Date(mission.create_date).toLocaleDateString()}</h5>
								{getParentGoal(type)}
							</CardBody>
							<CardFooter>
								<Button color="primary" size="sm" onClick={() => setEditModal(true)}>
									Edit
								</Button>
							</CardFooter>
						</Card>
					</Col>
					{/* Displays topic and description of the mission */}
					<Col sm="12" md="9">
						<Card>
							<CardBody>
								<CardHeader>
									<h1 className="mission-topic">{mission.topic}</h1>
								</CardHeader>
								<p className="blockquote blockquote-info">{mission.description}</p>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Mission
