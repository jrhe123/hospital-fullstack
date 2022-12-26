import React from 'react'

import SEO from 'components/SEO'
import { HomeContainer } from 'features/home'

const HomePage = () => (
  <>
    <SEO title={'Home | Patient'} description={'patient app'} name={'Patient'} type={'website'} />
    <HomeContainer />
  </>
)

export default HomePage
