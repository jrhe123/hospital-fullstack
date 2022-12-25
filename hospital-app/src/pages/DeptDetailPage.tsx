import React from 'react'

import SEO from 'components/SEO'
import { DeptDetailContainer } from 'features/dept'

const DeptDetailPage = () => (
  <>
    <SEO
      title={'Department | Hospital'}
      description={'hospital department detail management'}
      name={'Hospital'}
      type={'website'}
    />
    <DeptDetailContainer />
  </>
)

export default DeptDetailPage
