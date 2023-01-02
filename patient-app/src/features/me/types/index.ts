export type SendCodeFormInput = {
  tel: string
}

export type LoginOrRegisterFormInput = {
  tel: string
  code: string
}

export type HealthcardFormInput = {
  name: string
  pid: string
  sex: Sex.MALE
  sexId: '1'
  birthday: Date | string
  tel: string
}

export type UploadPatientPhotoFormInput = {
  file: File
}

export type IconNavigator = {
  icon: React.ReactNode
  title: string
  link: string
}

export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex',
}

export type UserInfo = {
  birthday: Date
  sex: Sex
  name: string
  pid: string
  tel: string
  id: number
  insuranceType: string
  uuid: string
  medicalHistory: string[]
  photo?: string
}
