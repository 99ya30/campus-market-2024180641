import http from './http'

export interface ErrandItem {
  id: number
  title: string
  reward: number
  pickupLocation: string
  deliveryLocation: string
  deadline: string
  campus: string
  publisher: string
  college: string
  avatar: string
  publishedAt: string
  status: string
  description: string
}

export function getErrands(): Promise<{ data: ErrandItem[] }> {
  return http.get('/errands')
}

export function createErrand(data: Omit<ErrandItem, 'id'>): Promise<{ data: ErrandItem }> {
  return http.post('/errands', data)
}
