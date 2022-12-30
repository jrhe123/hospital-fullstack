export type SendCodeFormInput = {
  tel: string
}

export type LoginOrRegisterFormInput = {
  tel: string
  code: string
}

export type IconNavigator = {
  icon: React.ReactNode
  title: string
  link: string
}
