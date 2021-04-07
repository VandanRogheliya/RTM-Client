import React, { useReducer, useState } from 'react'

// Importing UI/Boostrap components
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
import { validateEmail } from '../lib/util'

// Focus initialState
const initialState = {
  userNameFocus: false,
  userEmailFocus: false,
  userPasswordFocus: false,
  confirmPasswordFocus: false,
}

// Focus reducer
const reducer = (state, action) => {
  switch (action) {
    case 'userName':
      return {
        userNameFocus: true,
        userEmailFocus: false,
        userPasswordFocus: false,
        confirmPasswordFocus: false,
      }
    case 'userEmail':
      return {
        userNameFocus: false,
        userEmailFocus: true,
        userPasswordFocus: false,
        confirmPasswordFocus: false,
      }
    case 'userPassword':
      return {
        userNameFocus: false,
        userEmailFocus: false,
        userPasswordFocus: true,
        confirmPasswordFocus: false,
      }
    case 'confirmPassword':
      return {
        userNameFocus: false,
        userEmailFocus: false,
        userPasswordFocus: false,
        confirmPasswordFocus: true,
      }
    default:
      return {
        userNameFocus: false,
        userEmailFocus: false,
        userPasswordFocus: false,
        confirmPasswordFocus: false,
      }
  }
}

// Signupcomponent defination
function SignupModal({ isOpen, toggleModal, data }) {
  // Input focus reducer
  const [focus, focusReducer] = useReducer(reducer, initialState)

  // Form states
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Alert states
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // on Submit handler
  const onSave = async () => {
    var form = {
      name: userName.trim(),
      email: userEmail.trim(),
      password: userPassword.trim(),
      confirmPassword: confirmPassword.trim(),
    }

    setIsError(false)
    setIsSaved(false)
    setIsLoading(true)

    try {
      if (form.name.length > 50)
        throw new Error('Name is too long, please enter a valid name')

      if (form.name.length === 0) throw new Error('Name can not be empty.')

      if (!validateEmail(form.email)) throw new Error('Invalid Email')

      if (form.password !== form.confirmPassword)
        throw new Error('Passwords do not match!')

      if (form.confirmPassword.length < 5)
        throw new Error(
          'Password is too short. Password must be longer than 5 character'
        )

      var res = await fetch(`${config.api}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      console.log(res)
      
      if (res.ok) {
        res = await res.json()
        
        localStorage.RTMAuthToken = res.token
        window.location.reload()
      } else {
        throw new Error('Some went wrong')
      }
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


  return (
    <div>
      <Modal
        modalClassName='modal-black'
        isOpen={isOpen}
        toggle={() => toggleModal()}
      >
        <div className='modal-header justify-content-center'>
          <button className='close' onClick={() => toggleModal()}>
            <i className='tim-icons icon-simple-remove text-white' />
          </button>
          <div className='text-muted text-center ml-auto mr-auto'>
            <h3 className='mb-0'>Sign Up</h3>
          </div>
        </div>
        <div className='modal-body'>
          <Form role='form'>
            {/* Name */}
            <FormGroup className='mb-3'>
              <Label for='name'>Name</Label>

              <InputGroup
                className={classnames('input-group-alternative', {
                  'input-group-focus': focus.userNameFocus,
                })}
              >
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <i className='tim-icons icon-single-02' />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id='name'
                  placeholder='Name'
                  type='text'
                  onFocus={e => focusReducer('userName')}
                  onBlur={e => focusReducer('')}
                  defaultValue={userName}
                  onChange={e => onChangeHandler(e.target.value, setUserName)}
                />
              </InputGroup>
            </FormGroup>
            {/* UserEmail */}
            <FormGroup className='mb-3'>
              <Label for='email'>Email</Label>

              <InputGroup
                className={classnames('input-group-alternative', {
                  'input-group-focus': focus.userEmailFocus,
                })}
              >
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <i className='tim-icons icon-badge' />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  id='email'
                  placeholder='Email'
                  type='email'
                  onFocus={e => focusReducer('userEmail')}
                  onBlur={e => focusReducer('')}
                  defaultValue={userEmail}
                  onChange={e => onChangeHandler(e.target.value, setUserEmail)}
                />
              </InputGroup>
            </FormGroup>

            {/* userPassword */}
            <FormGroup className='mb-3'>
              <Label for='password'>Password</Label>

              <InputGroup
                className={classnames('input-group-alternative', {
                  'input-group-focus': focus.userPasswordFocus,
                })}
              >
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <i className='tim-icons icon-lock-circle' />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type='password'
                  id='password'
                  placeholder='Password'
                  onFocus={e => focusReducer('userPassword')}
                  onBlur={e => focusReducer('')}
                  onChange={e =>
                    onChangeHandler(e.target.value, setUserPassword)
                  }
                ></Input>
              </InputGroup>
            </FormGroup>

            {/* Confirm Password */}
            <FormGroup className='mb-3'>
              <Label for='confirm-password'>Confirm Password</Label>

              <InputGroup
                className={classnames('input-group-alternative', {
                  'input-group-focus': focus.confirmPasswordFocus,
                })}
              >
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <i className='tim-icons icon-lock-circle' />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type='password'
                  id='confirm-password'
                  placeholder='Password'
                  onFocus={e => focusReducer('confirmPassword')}
                  onBlur={e => focusReducer('')}
                  onChange={e =>
                    onChangeHandler(e.target.value, setConfirmPassword)
                  }
                ></Input>
              </InputGroup>
            </FormGroup>

            {/* Alerts */}
            {isError && <Alert color='warning'>{errorMessage}</Alert>}
            {isLoading && <Alert color='info'>Loading...</Alert>}
            {isSaved && <Alert color='success'>Success!</Alert>}

            <div className='text-center'>
              {/* Save Button */}
              <Button
                className='my-4'
                color='primary'
                type='button'
                onClick={() => onSave()}
                disabled={isLoading}
              >
                Sign up
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default SignupModal
