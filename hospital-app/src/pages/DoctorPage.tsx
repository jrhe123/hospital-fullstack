import React from 'react'

import SEO from 'components/SEO'
import { DoctorContainer } from 'features/staff'

const DoctorPage = () => (
  <>
    <SEO
      title={'Doctor | Hospital'}
      description={'hospital doctor management'}
      name={'Hospital'}
      type={'website'}
    />
    <DoctorContainer />
  </>
)

export default DoctorPage
