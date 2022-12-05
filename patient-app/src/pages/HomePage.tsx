import React from 'react'

import SEO from 'components/SEO'
import { HomeContainer } from 'features/home'

const HomePage = () => (
  <>
    <SEO title={'Home | Hospital'} description={'hospital'} name={'Hospital'} type={'website'} />
    <HomeContainer />
  </>
)

export default HomePage
