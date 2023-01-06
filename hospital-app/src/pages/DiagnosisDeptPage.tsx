import React from 'react'

import SEO from 'components/SEO'
import { DiagnosisDeptContainer } from 'features/diagnosis'

const DiagnosisDeptPage = () => (
  <>
    <SEO
      title={'Diagnosis Department | Hospital'}
      description={'hospital diagnosis department schedule'}
      name={'Hospital'}
      type={'website'}
    />
    <DiagnosisDeptContainer />
  </>
)

export default DiagnosisDeptPage
