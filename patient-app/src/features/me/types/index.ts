export type SendCodeFormInput = {
  tel: string
}

export type LoginOrRegisterFormInput = {
  tel: string
  code: string
}

export type HealthcardFormV1Input = {
  name: string
  pid: string
  sex: Sex | string
  sexId?: number | string
  birthday: Date | string
  tel: string
}
export type HealthcardFormV2Input = {
  medicalHistory: string[]
  insuranceType: string
}
export type HealthcardFormInput = HealthcardFormV1Input & HealthcardFormV2Input

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
