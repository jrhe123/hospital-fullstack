import React from 'react'

import SEO from 'components/SEO'
import { HealthcardContainer } from 'features/me'

const HealthcardPage = () => (
  <>
    <SEO
      title={'Health card | Patient'}
      description={'patient app'}
      name={'Patient'}
      type={'website'}
    />
    <HealthcardContainer />
  </>
)

export default HealthcardPage
