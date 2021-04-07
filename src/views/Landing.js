import React, { useState } from 'react'
import SigninModal from '../components/SigninModal'
import SignupModal from '../components/SignupModal'

import PageHeader from '../components/PageHeader'

export const Landing = (isOpen, toggleModal, data) => {
  const [signinToggle, setSigninToggle] = useState(false)
  const [signupToggle, setSignupToggle] = useState(false)
  return (
    <div>
      <SigninModal
        isOpen={signinToggle}
        toggleModal={e => setSigninToggle(e)}
        data={data}
      />

      <SignupModal
        isOpen={signupToggle}
        toggleModal={e => setSignupToggle(e)}
        data={data}
      />
      <div className='wrapper index-page'>
        <PageHeader
          isLanding={true}
          setSignupToggle={setSignupToggle}
          setSigninToggle={setSigninToggle}
        />
      </div>
    </div>
  )
}
export default Landing
