/* eslint-disable @typescript-eslint/no-explicit-any */
import { Env } from 'config/Env'
import { makeApi } from 'libs/core/configureAxios'

import { Todo, GetTodoFormInput } from '../types'

const api = makeApi(`${Env.API_BASE_URL}`)
const TODO_BASE_URL = `/todos`

export const getTodos = (form: GetTodoFormInput): Promise<Todo[]> => api.post(TODO_BASE_URL, form)
