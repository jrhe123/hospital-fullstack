import React from 'react'

import SEO from 'components/SEO'
import { MeContainer } from 'features/me'

const MePage = () => (
  <>
    <SEO title={'Me | Patient'} description={'patient app'} name={'Patient'} type={'website'} />
    <MeContainer />
  </>
)

export default MePage
