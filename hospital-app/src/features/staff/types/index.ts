export type LoginFormInput = {
  username: string
  password: string
}

export type User = {
  username: string
  name: string | null
  sex: string | null
  tel: string | null
  email: string | null
  job: string | null
  status: number
  createTime: Date
}

export type UserInfo = {
  user: User
  permissions: string[]
}
