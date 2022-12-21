import React from 'react'

import SEO from 'components/SEO'
import { DeptSubContainer } from 'features/dept'

const DeptSubPage = () => (
  <>
    <SEO
      title={'Department | Hospital'}
      description={'hospital department management'}
      name={'Hospital'}
      type={'website'}
    />
    <DeptSubContainer />
  </>
)

export default DeptSubPage
