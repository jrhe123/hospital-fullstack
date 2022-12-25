import React from 'react'

import SEO from 'components/SEO'
import { DoctorDetailContainer } from 'features/staff'

const DoctorDetailPage = () => (
  <>
    <SEO
      title={'Doctor | Hospital'}
      description={'hospital doctor detail management'}
      name={'Hospital'}
      type={'website'}
    />
    <DoctorDetailContainer />
  </>
)

export default DoctorDetailPage
