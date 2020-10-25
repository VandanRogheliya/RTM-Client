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
}

const reducer = (state, action) => {
	switch (action) {
		case 'topic':
			return {
				topicFocus: true,
				descFocus: false,
			}
		case 'desc':
			return {
				topicFocus: false,
				descFocus: true,
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
	console.log(type)
	const [topic, setTopic] = useState(mission.topic)
	const [description, setDescription] = useState(mission.description)
	const [isComplete, setIsComplete] = useState(mission.completed)
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [toggleDelete, setToggleDelete] = useState(false)
	const [isSaved, setIsSaved] = useState(false)

	const populateOption = () => {
		var options
		if (type.toLowerCase() === 'task') options = populateGoalsHelper('week', data)
		else if (type.toLowerCase() === 'week') options = populateGoalsHelper('month', data)
		else if (type.toLowerCase() === 'month') options = populateGoalsHelper('long', data)
		return options
	}

	const onUpdate = async () => {
		var form = {
			topic: topic.trim(),
			description: description.trim(),
			completed: isComplete ? 1 : 0,
		}

		setIsError(false)
		setIsSaved(false)

		try {
			if (form.topic.length > 50) {
				throw new Error('Topic is too long, please limit it to 50 characters.')
			}

			if (form.description.length > 500) {
				throw new Error('Description is too long, please limit it to 500 characters.')
			}

			if (form.topic.length === 0 || form.description.length === 0) {
				throw new Error('Topic and/or Description can not be empty.')
			}
			if (!data.completed && form.completed) {
				form.complete_date = new Date().toISOString().slice(0, 19).replace('T', ' ')
			}
			// Update the string form to : 2020-10-08 00:00:00.0 TODO:

			setIsLoading(true)

			console.log(JSON.stringify(form))

			await fetch(`http://localhost:5000/${type.toLowerCase()}/${mission.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})

			setIsLoading(false)
			setIsSaved(true)

			window.location.reload()
			// resp = await resp.json()

			// var tmpMission = mission
			// tmpMission.topic = form.topic
			// tmpMission.description = form.description
			// tmpMission.completed = form.completed
			// if (form.parent_goal) tmpMission.parent_goal = form.parent_goal

			// setMission(tmpMission)
		} catch (err) {
			setIsError(true)
			setErrorMessage(err.message)
		}
	}

	const onChangeHandler = (value, setFunction) => {
		setIsSaved(false)
		setFunction(value)
	}

	const onDelete = async () => {
		try {
			var resp = await fetch(`http://localhost:5000/${type.toLowerCase()}/${mission.id}`, {
				method: 'DELETE',
			})
			resp = await resp.json()
			console.log(resp)

			if (resp.code !== 200) {
				throw new Error('Something went wrong. Are you trying to delete a goal which is being referenced?')
			}

			window.location.reload()
		} catch (err) {
			setToggleDelete(false)
			setIsError(true)
			setErrorMessage(err.message)
		}
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
									onChange={e => onChangeHandler(e.target.value, setTopic)}
								/>
							</InputGroup>
						</FormGroup>

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
									onChange={e => onChangeHandler(e.target.value, setDescription)}
								/>
							</InputGroup>
						</FormGroup>
						<CardSubtitle>Mission is</CardSubtitle>
						<Switch
							size="lg"
							defaultValue={isComplete}
							onChange={e => onChangeHandler(e.state.value, setIsComplete)}
							offColor="success"
							offText={<i className="tim-icons icon-simple-remove" />}
							onColor="success"
							onText={<i className="tim-icons icon-check-2" />}
						/>
						{isError && <Alert color="warning">{errorMessage}</Alert>}
						{isLoading && <Alert color="info">Updating Database. Thank you for waiting.</Alert>}
						{isSaved && <Alert color="success">Changes saved successfully.</Alert>}
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
