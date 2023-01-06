/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { makeApi } from 'libs/core/configureAxios'

import { SearchWorkPlanFormInput, DiagnosisDeptPageUtil } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const DIAGNOSIS_BASE_URL = `/medical/dept/sub/work_plan`

export const searchWorkPlans = (form: SearchWorkPlanFormInput): Promise<DiagnosisDeptPageUtil> =>
  api.post(`${DIAGNOSIS_BASE_URL}/searchWorkPlanInRange`, form)
