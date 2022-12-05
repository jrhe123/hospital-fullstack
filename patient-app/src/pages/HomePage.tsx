import React from 'react'

import SEO from 'components/SEO'
import { HomeContainer } from 'features/home'

const HomePage = () => (
  <>
    <SEO
      title={'Home | Markham Stouffville Hospital'}
      description={'hospital'}
      name={'Markham Stouffville Hospital'}
      type={'website'}
    />
    <HomeContainer />
  </>
)

export default HomePage
