import React, { useState } from 'react'
import Signin  from '../components/Signin'
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
import Signup from '../components/Signup'

import PageHeader from '../components/PageHeader'


export const Landing = (isOpen, toggleModal, data) => {
	
	const [signinToggle, setSigninToggle] = useState(false)
	const [signupToggle, setSignupToggle] = useState(false)
  return (
    <div>
	<Signin isOpen={signinToggle} toggleModal={e => setSigninToggle(e)} data={data} />
	
	<Signup isOpen={signupToggle} toggleModal={e => setSignupToggle(e)} data={data} />
	<div className="wrapper index-page">
				<PageHeader />
			</div>
    <Button className="my-4" color="primary" type="button" onClick={() => setSignupToggle(true)}>Sign Up</Button>
    <Button className="my-4" color="primary" type="button" onClick={() => setSigninToggle(true)}>Sign In</Button>
    </div>
  )
}
export default Landing
