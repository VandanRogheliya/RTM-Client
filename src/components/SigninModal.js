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
  userEmailFocus: false,
  userPasswordFocus: false,
}

// Focus reducer
const reducer = (state, action) => {
  switch (action) {
    case 'userEmail':
      return {
        userEmailFocus: true,
        userPasswordFocus: false,
      }
    case 'userPassword':
      return {
        userEmailFocus: false,
        userPasswordFocus: true,
      }
    default:
      return {
        userEmailFocus: false,
        userPasswordFocus: false,
      }
  }
}

// Signincomponent defination
function SigninModal({ isOpen, toggleModal, data }) {
  // Input focus reducer
  const [focus, focusReducer] = useReducer(reducer, initialState)

  // Alert states
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  // on Submit handler
  const onSave = async () => {
    var form = {
      email: userEmail.trim(),
      password: userPassword.trim(),
    }

    setIsError(false)
    setIsSaved(false)
    setIsLoading(true)

    try {
      if (!validateEmail(form.email)) throw new Error('Invalid Email')
      
      var res = await fetch(`${config.api}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
				if (res.status === 401) throw new Error('Email or password is wrong.')
				else throw new Error('Something went wrong')
      }
			
      res = await res.json()

			localStorage.RTMAuthToken = res.token
      window.location.reload()

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
            <h3 className='mb-0'>Sign In</h3>
          </div>
        </div>
        <div className='modal-body'>
          <Form role='form'>
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
                  type='text'
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
            <div className='text-center'>
              {/* Alerts */}
              {isError && <Alert color='warning'>{errorMessage}</Alert>}
              {isLoading && (
                <Alert color='info'>
                  Loading...
                </Alert>
              )}
              {isSaved && (
                <Alert color='success'>Logged In!</Alert>
              )}

              {/* Save Button */}
              <Button
                className='my-4'
                color='primary'
                type='button'
                onClick={() => onSave()}
              >
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  )
}

export default SigninModal
