import React from 'react'

import SEO from 'components/SEO'
import { DeptSubDetailContainer } from 'features/dept'

const DeptSubDetailPage = () => (
  <>
    <SEO
      title={'Unit detail | Hospital'}
      description={'hospital department unit detail management'}
      name={'Hospital'}
      type={'website'}
    />
    <DeptSubDetailContainer />
  </>
)

export default DeptSubDetailPage
