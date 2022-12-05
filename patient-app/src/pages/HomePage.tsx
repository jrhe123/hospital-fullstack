import React from 'react'

import SEO from 'components/SEO'
import { HomeContainer } from 'features/home'

const HomePage = () => (
  <>
    <SEO
      title={'Home | Art and Design Toronto'}
      description={'yuting works'}
      name={'Art and Design Toronto'}
      type={'website'}
    />
    <HomeContainer />
  </>
)

export default HomePage
