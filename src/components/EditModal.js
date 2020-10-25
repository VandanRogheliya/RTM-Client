import React, { useReducer, useState } from 'react'

// Importing components
import DeleteModal from './DeleteModal'

// Importing UI/Bootstrap components
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

// Focus initialState
const initialState = {
	topicFocus: false,
	descFocus: false,
}

// Focus reducer funtion
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

// Edit Modal comonent defination
function EditModal({ isOpen, toggleModal, type, mission, data }) {
	// Input Focus reducer
	const [focus, focusReducer] = useReducer(reducer, initialState)

	// Form States
	const [topic, setTopic] = useState(mission.topic)
	const [description, setDescription] = useState(mission.description)
	const [isComplete, setIsComplete] = useState(mission.completed)

	// Alert States
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isSaved, setIsSaved] = useState(false)

	// delete Modal toggle state
	const [toggleDelete, setToggleDelete] = useState(false)

	// Submit handler
	const onUpdate = async () => {
		// Creates form object
		var form = {
			topic: topic.trim(),
			description: description.trim(),
			completed: isComplete ? 1 : 0,
		}

		// Resetting errors
		setIsError(false)
		setIsSaved(false)

		// Error handling with try catch
		try {
			//Validation Starts
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
			//Validation done

			setIsLoading(true)

			// PUT request sent to database
			await fetch(`http://localhost:5000/${type.toLowerCase()}/${mission.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})

			// If request is processed successfully
			setIsLoading(false)
			setIsSaved(true)

			// Reloads the tab
			window.location.reload()
		} catch (err) {
			// Displays error alert with the message
			setIsError(true)
			setErrorMessage(err.message)
		}
	}

	// Change handler, resets the save alerts
	const onChangeHandler = (value, setFunction) => {
		setIsSaved(false)
		setFunction(value)
	}

	// Delete handler
	const onDelete = async () => {
		try {
			var resp = await fetch(`http://localhost:5000/${type.toLowerCase()}/${mission.id}`, {
				method: 'DELETE',
			})

			resp = await resp.json()

			// If delete request is unsuccessful then throws error.
			if (resp.code !== 200) {
				throw new Error('Something went wrong. Are you trying to delete a goal which is being referenced?')
			}

			window.location.reload()
		} catch (err) {
			// Closes delete popup and displays the error alert with the message
			setToggleDelete(false)
			setIsError(true)
			setErrorMessage(err.message)
		}
	}

	// Rendering JSX
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
						{/* TOPIC */}
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

						{/* DESCRIPTION */}
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

						{/* COMPLETE SWITCH */}
						<CardSubtitle>Mission is</CardSubtitle>
						<Switch
							size="lg"
							defaultValue={Boolean(isComplete)}
							onChange={e => onChangeHandler(e.state.value, setIsComplete)}
							offColor="success"
							offText={<i className="tim-icons icon-simple-remove" />}
							onColor="success"
							onText={<i className="tim-icons icon-check-2" />}
						/>

						{/* Alerts */}
						{isError && <Alert color="warning">{errorMessage}</Alert>}
						{isLoading && <Alert color="info">Updating Database. Thank you for waiting.</Alert>}
						{isSaved && <Alert color="success">Changes saved successfully.</Alert>}

						<div className="text-center">
							{/* Update Button */}
							<Button className="my-4" color="primary" type="button" onClick={() => onUpdate()}>
								Update
							</Button>

							{/* Delete Button */}
							<Button
								className="my-4"
								color="danger"
								type="button"
								onClick={() => setToggleDelete(!toggleDelete)}
								disabled={isLoading}
							>
								Delete
							</Button>

							{/* Delete Modal */}
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
