export interface User {
  email: string
  password: string
}
export interface Category {
  name: string
  imageSrc?: string
  user?: string
  _id?: string
}
export interface Message {
  message: string
}
export interface Position {
  name: string
  cost: number
  category: string
  user?: string
  _id?: string
  quanyity?: number
}
export interface Order {
  list: OrderPosition[]
  date?: Date
  order?: number
  user?: string
  _id?: string
}

export interface OrderPosition {
  name: string
  cost: number
  quantity: number
  _id?: string
}
export interface Filter {
  start?: Date
  end?: Date
  order?: Number
}
export interface OverviewPage {
  gain: OverviewPageItem 
  orders: OverviewPageItem 
}

export interface OverviewPageItem {
  percent: number
  compare: number
  yesterday: number
  isHegher: boolean
}

export interface AnalyticsPage {
  avarage: number,
  chart: AnalyticsChartItem[]
}
export interface AnalyticsChartItem {
  gain: number
  order: number
  label: string
}
export const BACK_END = 'https://peaceful-beach-47546.herokuapp.com'