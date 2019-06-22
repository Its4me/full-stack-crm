export interface User {
  email: string,
  password: string
}
export interface Category {
  name: string,
  imageSrc?: string,
  user?: string,
  _id?: string
}
export interface Message {
  message: string
}

export const BACK_END = 'https://peaceful-beach-47546.herokuapp.com'