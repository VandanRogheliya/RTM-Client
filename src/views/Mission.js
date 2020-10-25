import React, { useEffect, useState } from 'react'

import {
	Button,
	Card,
	CardHeader,
	CardBody,
	Label,
	FormGroup,
	Form,
	Input,
	FormText,
	NavItem,
	NavLink,
	Nav,
	Table,
	TabContent,
	TabPane,
	Container,
	Row,
	Col,
	UncontrolledTooltip,
	UncontrolledCarousel,
	Badge,
	CardFooter,
} from 'reactstrap'
import EditModal from '../components/EditModal'

function Mission({ type, id, data, setHome }) {
	console.log(type, id)
	const [mission, setMission] = useState(data[type.toLowerCase()][id])
	const [editModal, setEditModal] = useState(false)

	// TODO: Handle invalid types and ids

	const getParentGoal = type => {
		let tmpType = type.toLowerCase()
		if (tmpType === 'task') {
			return <h5>Parent Goal: {data['week'][mission.parent_goal].topic}</h5>
		}
		if (tmpType === 'week') {
			return <h5>Parent Goal: {data['month'][mission.parent_goal].topic}</h5>
		}
		if (tmpType === 'month') {
			return <h5>Parent Goal: {data['long'][mission.parent_goal].topic}</h5>
		}
		if (tmpType === 'long') {
			return <h5>Deadline: {new Date(mission.deadline).toLocaleDateString()}</h5>
		}
	}

	// useEffect(() => {}, [mission])
	const markCompleted = () => {
		//async code ... Remove the tmp code below
		// Do not reload just update the data state of app.js
		let tmpMission = mission
		tmpMission.completed = 1
		tmpMission.complete_date = new Date().toISOString()
		setMission(tmpMission)
	}

	return (
		<>
			<EditModal
				isOpen={editModal}
				toggleModal={e => setEditModal(e)}
				type={type}
				mission={mission}
				data={data}
				setMission={e => setMission(e)}
			/>
			<h1 className="h1-seo mt-4">RTM</h1>
			<Button color="default" className="btn-round  back-btn" onClick={() => setHome(true)}>
				<i className="tim-icons icon-double-left" />
			</Button>

			<Container>
				<Row>
					<Col sm="12" md="3">
						<Card>
							<CardBody>
								<div>
									{mission.completed ? (
										<>
											<Badge color="success" pill>
												Completed
											</Badge>
											<h5 className="mt-2">Completed On: {new Date(mission.complete_date).toLocaleDateString()}</h5>
										</>
									) : (
										<Badge color="danger" pill>
											Pending
										</Badge>
									)}
								</div>
								<h5>Type: {type.toUpperCase()}</h5>
								{/* {new Date().toISOString()} */}
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
