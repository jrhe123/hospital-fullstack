import React from 'react'

import SEO from 'components/SEO'
import { HomeContainer } from 'features/home'

const DoctorPage = () => (
  <>
    <SEO
      title={'Doctor | Hospital'}
      description={'hospital doctor management'}
      name={'Hospital'}
      type={'website'}
    />
    <HomeContainer />
  </>
)

export default DoctorPage
