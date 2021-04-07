import React from 'react'
import { Container } from 'reactstrap'
import Button from 'reactstrap/lib/Button'

// Importing quotes
import quotes from '../assets/thoughts/quotes.json'

function PageHeader({ setSignupToggle, setSigninToggle, isLanding = false }) {
  // Randomly selects a Quote out of 1643 quotes
  const quote = quotes[Math.floor(Math.random() * 1642)]

  return (
    <div className='page-header header-filter'>
      {/* Moving Squares on the home page */}
      <div className='squares square1' />
      <div className='squares square2' />
      <div className='squares square3' />
      <div className='squares square4' />
      <div className='squares square5' />
      <div className='squares square6' />
      <div className='squares square7' />

      {/* Displaying Title and Quote */}
      <Container>
        <div className='content-center brand'>
          <h1 className='h1-seo'>RTM• Macro To Micro</h1>
          <h3 >
            {isLanding ? (
              <>
                <Button
                  className='my-4'
                  color='primary'
                  type='button'
                  onClick={() => setSignupToggle(true)}
                >
                  Sign Up
                </Button>
                <Button
                  className='my-4'
                  type='button'
                  onClick={() => setSigninToggle(true)}
                >
                  Log In
                </Button>
              </>
            ) : (
              <div className='d-none d-sm-block'>
                {quote.text} {quote.author && <i> - {quote.author}</i>}
              </div>
            )}
          </h3>
        </div>
      </Container>
    </div>
  )
}

export default PageHeader
