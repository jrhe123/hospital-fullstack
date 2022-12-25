import React from 'react'

import SEO from 'components/SEO'
import { DeptSubContainer } from 'features/dept'

const DeptSubPage = () => (
  <>
    <SEO
      title={'Unit | Hospital'}
      description={'hospital department unit management'}
      name={'Hospital'}
      type={'website'}
    />
    <DeptSubContainer />
  </>
)

export default DeptSubPage
