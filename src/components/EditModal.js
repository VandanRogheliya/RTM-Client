import React, { useReducer, useState } from 'react'
import classnames from 'classnames'
import {
	Button,
	Label,
	FormGroup,
	Form,
	Input,
	Modal,
	InputGroup,
	InputGroupText,
	InputGroupAddon,
	CardSubtitle,
	Alert,
} from 'reactstrap'
import Switch from 'react-bootstrap-switch'
import DeleteModal from './DeleteModal'

const initialState = {
	topicFocus: false,
	descFocus: false,
	parentGoal: false,
}

const reducer = (state, action) => {
	switch (action) {
		case 'topic':
			return {
				topicFocus: true,
				descFocus: false,
				parentGoal: false,
			}
		case 'desc':
			return {
				topicFocus: false,
				descFocus: true,
				parentGoal: false,
			}
		case 'parent':
			return {
				topicFocus: false,
				descFocus: false,
				parentGoal: true,
			}
		default:
			return initialState
	}
}

const populateGoalsHelper = (parentType, data) => {
	var options = []
	for (var key in data[parentType]) {
		options.push(<option value={key}>{data[parentType][key].topic}</option>)
	}

	return options
}

function EditModal({ isOpen, toggleModal, type, mission, data, setMission }) {
	const [focus, focusReducer] = useReducer(reducer, initialState)

	const [topic, setTopic] = useState(mission.topic)
	const [parent, setParent] = useState(mission.parent_goal)
	const [description, setDescription] = useState(mission.description)
	const [isComplete, setIsComplete] = useState(mission.completed)
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [toggleDelete, setToggleDelete] = useState(false)

	const populateOption = () => {
		var options
		if (type.toLowerCase() === 'task') options = populateGoalsHelper('week', data)
		else if (type.toLowerCase() === 'week') options = populateGoalsHelper('month', data)
		else if (type.toLowerCase() === 'month') options = populateGoalsHelper('long', data)
		return options
	}


	const onUpdate = () => {
		var form = {
			topic: topic.trim(),
			description: description.trim(),
			completed: isComplete,
			parent_goal: parent,
		}

		setIsError(false)

		try {
			if (form.topic.length > 50) {
				throw new Error('Topic is too long, please limit it to 50 characters.')
			}

			if (form.description.length > 500) {
				throw new Error('Description is too long, please limit it to 500 characters.')
			}

			if (!data.completed && form.completed) {
				form.complete_date = new Date().toISOString()
			}

			setIsLoading(true)

			// Interact with DATA BASE TODO:
			
		} catch (err) {
			setIsError(true)
			setErrorMessage(err.message)
		}

		setIsLoading(false)
	}

	const onDelete = () => {
		// Send delete request
		// TODO: 
		// Reload after the query
	}

	return (
		<div>
			<Modal modalClassName="modal-black" isOpen={isOpen} toggle={() => toggleModal()}>
				<div className="modal-header justify-content-center">
					<button className="close" onClick={() => toggleModal()}>
						<i className="tim-icons icon-simple-remove text-white" />
					</button>
					<div className="text-muted text-center ml-auto mr-auto">
						<h3 className="mb-0">Edit</h3>
					</div>
				</div>
				<div className="modal-body">
					<Form role="form">
						<FormGroup className="mb-3">
							<Label for="topic">Topic</Label>

							<InputGroup
								className={classnames('input-group-alternative', {
									'input-group-focus': focus.topicFocus,
								})}
							>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="tim-icons icon-pin" />
									</InputGroupText>
								</InputGroupAddon>
								<Input
									id="topic"
									placeholder="Topic"
									type="text"
									onFocus={e => focusReducer('topic')}
									onBlur={e => focusReducer()}
									defaultValue={topic}
									onChange={e => setTopic(e.target.value)}
								/>
							</InputGroup>
						</FormGroup>
						{type !== 'Long' && (
							<FormGroup className="mb-3">
								<Label for="parent">Parent</Label>

								<InputGroup
									className={classnames('input-group-alternative', {
										'input-group-focus': focus.parentGoal,
									})}
								>
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="tim-icons icon-shape-star" />
										</InputGroupText>
									</InputGroupAddon>
									<Input
										type="select"
										id="parent"
										placeholder="Parent Goal"
										onFocus={e => focusReducer('parent')}
										onBlur={e => focusReducer()}
										defaultValue={parent}
										onChange={e => setParent(e.target.value)}
									>
										{populateOption()}
									</Input>
								</InputGroup>
							</FormGroup>
						)}
						<FormGroup className="mb-3">
							<Label for="description">Description</Label>
							<InputGroup
								className={classnames('input-group-alternative', {
									'input-group-focus': focus.descFocus,
								})}
							>
								<Input
									id="description"
									placeholder="Write here ..."
									type="textarea"
									onFocus={e => focusReducer('desc')}
									onBlur={e => focusReducer()}
									defaultValue={description}
									onChange={e => setDescription(e.target.value)}
								/>
							</InputGroup>
						</FormGroup>
						<CardSubtitle>Mission is</CardSubtitle>
						<Switch
							size="lg"
							defaultValue={isComplete}
							onChange={e => setIsComplete(e.state.value)}
							offColor="success"
							offText={<i className="tim-icons icon-simple-remove" />}
							onColor="success"
							onText={<i className="tim-icons icon-check-2" />}
						/>
						{isError && <Alert color="warning">{errorMessage}</Alert>}
						{isLoading && <Alert color="info">Updating Database. Thank you for waiting.</Alert>}
						<div className="text-center">
							<Button className="my-4" color="primary" type="button" onClick={() => onUpdate()}>
								Update
							</Button>
							<Button
								className="my-4"
								color="danger"
								type="button"
								onClick={() => setToggleDelete(!toggleDelete)}
								disabled={isLoading}
							>
								Delete
							</Button>
							<DeleteModal
								toggle={toggleDelete}
								toggleModal={e => setToggleDelete(e)}
								onDelete={() => onDelete()}
								disabled={isLoading}
							/>
						</div>
					</Form>
				</div>
			</Modal>
		</div>
	)
}

export default EditModal
