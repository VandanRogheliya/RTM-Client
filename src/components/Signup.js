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
import config from '../config/config'

// Focus initialState
const initialState = {
    userNameFocus: false,
	userEmailFocus: false,
	userPasswordFocus: false,
	
}

// Focus reducer
const reducer = (state, action) => {
	switch (action) {
        case 'userName':
			return {
                userNameFocus:true,
				userEmailFocus: false,
				userPasswordFocus: false,
				
			}
		case 'userEmail':
			return {
                userNameFocus:false,
				userEmailFocus: true,
				userPasswordFocus: false,
				
			}
		case 'userPassword':
			return {
                userNameFocus:false,
				userEmailFocus: false,
				userPasswordFocus: true,
			}
		case '':
			return {
                userNameFocus:false,
				userEmailFocus: false,
				userPasswordFocus: false,
			}
		
	}
}


// Signupcomponent defination
function Signup({ isOpen, toggleModal, data}) {
	// Input focus reducer
	const [focus, focusReducer] = useReducer(reducer, initialState)

	
	// Alert states
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
    const [userName, setUserName] = useState('')
	const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
	// on Submit handler
	const onSave = async () => {
		var form = {
            userName : userName.trim(),
			userEmail: userEmail.trim(),
			userPassword: userPassword.trim(),
			
		}

		setIsError(false)
		setIsSaved(false)

		

		setIsLoading(false)
	}

	const onChangeHandler = (value, setFunction) => {
		setIsSaved(false)
		setFunction(value)
	}

	
		//onChangeHandler(setUserEmail, setUserPassword)
	

	return (
		<div>
			<Modal modalClassName="modal-black" isOpen={isOpen} toggle={() => toggleModal()}>
				<div className="modal-header justify-content-center">
					<button className="close" onClick={() => toggleModal()}>
						<i className="tim-icons icon-simple-remove text-white" />
					</button>
					<div className="text-muted text-center ml-auto mr-auto">
						<h3 className="mb-0">Sign Up</h3>
					</div>
				</div>
				<div className="modal-body">
					<Form role="form">
                        {/* Name */}
						<FormGroup className="mb-3">
							<Label for="topic">Full Name</Label>

							<InputGroup
								className={classnames('input-group-alternative', {
									'input-group-focus': focus.userNameFocus,
								})}
							>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="tim-icons icon-badge" />
									</InputGroupText>
								</InputGroupAddon>
								<Input
									id="topic"
									placeholder="Email"
									type="text"
									onFocus={e => focusReducer('userName')}
									onBlur={e => focusReducer('')}
									defaultValue={userName}
									onChange={e => onChangeHandler(e.target.value, setUserName)}
								/>
							</InputGroup>
						</FormGroup>
						{/* UserEmail */}
						<FormGroup className="mb-3">
							<Label for="topic">Email</Label>

							<InputGroup
								className={classnames('input-group-alternative', {
									'input-group-focus': focus.userEmailFocus,
								})}
							>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="tim-icons icon-badge" />
									</InputGroupText>
								</InputGroupAddon>
								<Input
									id="topic"
									placeholder="Email"
									type="text"
									onFocus={e => focusReducer('userEmail')}
									onBlur={e => focusReducer('')}
									defaultValue={userEmail}
									onChange={e => onChangeHandler(e.target.value, setUserEmail)}
								/>
							</InputGroup>
						</FormGroup>

						{/* userPassword */}
						<FormGroup className="mb-3">
							<Label for="parent">Password</Label>

							<InputGroup
								className={classnames('input-group-alternative', {
									'input-group-focus': focus.userPasswordFocus,
								})}
							>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										<i className="tim-icons icon-lock-circle" />
									</InputGroupText>
								</InputGroupAddon>
								<Input
									type="password"
									id="parent"
									placeholder="Password"
									onFocus={e => focusReducer('userPassword')}
									onBlur={e => focusReducer('')}
									//onChange={e => onChangeHandler(e.target.value, setUserPasword)}
								>
								</Input>
							</InputGroup>
						</FormGroup>
                        <div className="text-center">
							{/* Save Button */}
							<Button className="my-4" color="primary" type="button" onClick={() => onSave()}>
								Sign up
							</Button>
						</div>
					</Form>
				</div>
			</Modal>
		</div>
	)
}

export default Signup
