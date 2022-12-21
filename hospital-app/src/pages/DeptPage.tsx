import React from 'react'

import SEO from 'components/SEO'
import { DeptContainer } from 'features/dept'

const DeptPage = () => (
  <>
    <SEO
      title={'Department | Hospital'}
      description={'hospital department management'}
      name={'Hospital'}
      type={'website'}
    />
    <DeptContainer />
  </>
)

export default DeptPage
