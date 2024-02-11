import React from 'react'
import { Container } from '../components/Container'

export const About = () => {
  return (
    <Container className="px-5 md:px-20 md:mt-2">
      <section className="justify-center py-12">
        <div className="md:mt-2 mt-24">
          <div className="greeting"> Hello <span>🐼</span>!</div>
          <div className="subtitle">
            <p className=''>I have been working more than 7 years in the IT industry, developing software and leading development teams. 
              Welcome to my digital space! Join me on my learning journey with articles, tips, and, in the future, 
              I look forward to hearing your valuable feedback. Dive into my experiences and insights.
            </p>
          </div>
        </div>
      </section>
    </Container>
  )
}