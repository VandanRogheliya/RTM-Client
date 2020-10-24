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
} from 'reactstrap'
import EditModal from '../components/EditModal'

function Mission({ type, id, data, setHome }) {
	const [mission, setMission] = useState(data[type.toLowerCase()][id])
	const [completed, setCompleted] = useState(mission.completed)
	const [editModal, setEditModal] = useState(false)

	const getParentGoal = type => {
		let tmpType = type.toLowerCase()
		if (tmpType === 'task') {
			return <div>Parent Goal: {data['week'][mission.parent_goal].topic}</div>
		}
		if (tmpType === 'week') {
			return <div>Parent Goal: {data['month'][mission.parent_goal].topic}</div>
		}
		if (tmpType === 'month') {
			return <div>Parent Goal: {data['long'][mission.parent_goal].topic}</div>
		}
		if (tmpType === 'long') {
			return <div>Deadline: {mission.deadline}</div>
		}
	}

	// useEffect(() => {}, [mission])
	const markCompleted = () => {
		//async code ... Remove the tmp code below
		let tmpMission = mission
		tmpMission.completed = 1
		tmpMission.complete_date = new Date().toISOString()
		setMission(tmpMission)
		setCompleted(1)
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
			{!mission.completed && (
				<Button color="success" onClick={() => markCompleted()}>
					Complete
				</Button>
			)}
			<Button color="default" onClick={() => setEditModal(true)}>
				Edit
			</Button>
			<Button color="default" onClick={() => setHome(true)}>
				Home
			</Button>
			<Container>
				<h5 className="mission-topic-type">{type.toUpperCase()}</h5>
				<h1 className="mission-topic">{mission.topic}</h1>
				<div>{mission.completed ? <p>Completed</p> : <p>Pending</p>}</div>
				{console.log(mission.completed)}
				<div className="typography-line">
					<span>Description</span>
					<blockquote>
						<p className="blockquote blockquote-info">{mission.description}</p>
					</blockquote>
				</div>
				<div>Created At: {mission.create_date}</div>
				{getParentGoal(type)}
			</Container>
		</>
	)
}

export default Mission
