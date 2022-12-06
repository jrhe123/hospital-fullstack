import React from 'react'

import SEO from 'components/SEO'
import { LoginContainer } from 'features/login'

const LoginPage = () => (
  <>
    <SEO title={'Login | Hospital'} description={'hospital'} name={'Hospital'} type={'website'} />
    <LoginContainer />
  </>
)

export default LoginPage
