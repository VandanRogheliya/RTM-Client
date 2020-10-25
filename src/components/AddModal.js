import React, { useReducer, useState } from 'react'

// Importing UI/Boostrap components
import Datetime from 'react-datetime'
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
	Alert,
} from 'reactstrap'

// Focus initialState
const initialState = {
	topicFocus: false,
	descFocus: false,
	parentGoal: false,
}

// Focus reducer
const reducer = (state, action) => {
	switch (action) {
		case 'topic':
			return {
				topicFocus: true,
				descFocus: false,
				typeFocus: false,
				parentGoal: false,
			}
		case 'desc':
			return {
				topicFocus: false,
				descFocus: true,
				typeFocus: false,
				parentGoal: false,
			}
		case 'parent':
			return {
				topicFocus: false,
				descFocus: false,
				typeFocus: false,
				parentGoal: true,
			}
		case 'type':
			return {
				topicFocus: false,
				descFocus: false,
				typeFocus: true,
				parentGoal: false,
			}
		default:
			return initialState
	}
}

// Populate Goals Helper function
const populateGoalsHelper = (parentType, data) => {
	var options = []
	options.push(<option value={-1}>No Parent Goal Selected</option>)
	for (var key in data[parentType]) {
		options.push(<option key={key} value={key}>{data[parentType][key].topic}</option>)
	}

	return options
}

// AddModal component defination
function AddModal({ isOpen, toggleModal, data }) {
	// Input focus reducer
	const [focus, focusReducer] = useReducer(reducer, initialState)

	// Form states
	const [topic, setTopic] = useState('')
	const [type, setType] = useState('task')
	const [parent, setParent] = useState(-1)
	const [deadline, setDeadline] = useState(new Date().toISOString())
	const [description, setDescription] = useState('')

	// Alert states
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isSaved, setIsSaved] = useState(false)

	// Populates option in parent dropdown
	const populateOption = type => {
		let parentType

		switch (type) {
			case 'task':
				parentType = 'week'
				break
			case 'week':
				parentType = 'month'
				break
			case 'month':
				parentType = 'long'
				break
			default:
				break
		}
		return populateGoalsHelper(parentType, data)
	}

	// on Submit handler
	const onSave = async () => {
		var form = {
			topic: topic.trim(),
			description: description.trim(),
			create_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
			completed: 0,
			complete_date: null,
		}

		setIsError(false)
		setIsSaved(false)

		try {
			// Validation starts
			if (type !== 'long') form.parent_goal = parent
			else {
				let currentDate = new Date()
				if (currentDate > deadline) {
					throw new Error('Deadline has to be in the future.')
				} else {
					form.deadline = deadline.toISOString().slice(0, 19).replace('T', ' ')
				}
			}

			if (form.topic.length > 50) {
				throw new Error('Topic is too long, please limit it to 50 characters.')
			}

			if (form.description.length > 500) {
				throw new Error('Description is too long, please limit it to 500 characters.')
			}

			if (form.topic.length === 0 || form.description.length === 0) {
				throw new Error('Topic and/or Description can not be empty.')
			}
			if (form.parent_goal && form.parent_goal === -1) {
				throw new Error('There are no parent goals, please make a parent goal before.')
			}
			// Validation Done

			if (!data.completed && form.completed) {
				form.complete_date = new Date().toISOString()
			}

			setIsLoading(true)

			await fetch(`http://localhost:5000/${type.toLowerCase()}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(form),
			})

			window.location.reload()

			setIsSaved(true)
		} catch (err) {
			setIsError(true)
			setErrorMessage(err.message)
		}

		setIsLoading(false)
	}

	const onChangeHandler = (value, setFunction) => {
		setIsSaved(false)
		setFunction(value)
	}

	const dateHandler = date => {
		date = new Date(date)
		date.setDate(date.getDate() + 1)
		date.setHours(0, 0, 0, 0)

		onChangeHandler(date, setDeadline)
	}

	return (
		<div>
			<Modal modalClassName="modal-black" isOpen={isOpen} toggle={() => toggleModal()}>
				<div className="modal-header justify-content-center">
					<button className="close" onClick={() => toggleModal()}>
						<i className="tim-icons icon-simple-remove text-white" />
					</button>
					<div className="text-muted text-center ml-auto mr-auto">
						<h3 className="mb-0">Add New Task/Goal</h3>
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

						{/* TYPE */}
						<FormGroup className="mb-3">
							<Label for="parent">Type</Label>

							<InputGroup
								className={classnames('input-group-alternative', {
									'input-group-focus': focus.typeFocus,
								})}
							>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="tim-icons icon-palette" />
									</InputGroupText>
								</InputGroupAddon>
								<Input
									type="select"
									id="parent"
									placeholder="Parent Goal"
									onFocus={e => focusReducer('type')}
									onBlur={e => focusReducer()}
									defaultValue={type}
									onChange={e => onChangeHandler(e.target.value, setType)}
								>
									<option value="task">Task</option>
									<option value="week">Weekly Goal</option>
									<option value="month">Monthly Goal</option>
									<option value="long">Long Term Goal</option>
								</Input>
							</InputGroup>
						</FormGroup>
						{type !== 'long' ? (
							<FormGroup className="mb-3">
								{/* PARENT GOAL */}

								<Label for="parent">Parent Goal</Label>

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
										onChange={e => onChangeHandler(e.target.value, setParent)}
									>
										{populateOption(type)}
									</Input>
								</InputGroup>
							</FormGroup>
						) : (
							<FormGroup>
								{/* Deadline */}
								<Label for="parent">Deadline</Label>
								<InputGroup
									className={classnames('input-group-alternative', {
										'input-group-focus': focus.parentGoal,
									})}
								>
									<Datetime
										timeFormat={false}
										className="w-100"
										inputProps={{ placeholder: 'Pick a deadline' }}
										onChange={e => dateHandler(e)}
									/>
								</InputGroup>
							</FormGroup>
						)}

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

						{/* Alerts */}
						{isError && <Alert color="warning">{errorMessage}</Alert>}
						{isLoading && <Alert color="info">Updating Database. Thank you for waiting.</Alert>}
						{isSaved && <Alert color="success">Changes saved successfully.</Alert>}

						<div className="text-center">
							{/* Save Button */}
							<Button className="my-4" color="primary" type="button" onClick={() => onSave()}>
								Save
							</Button>
						</div>
					</Form>
				</div>
			</Modal>
		</div>
	)
}

export default AddModal
