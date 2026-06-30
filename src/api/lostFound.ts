import http from './http'

export interface LostFoundItem {
  id: number
  type: 'lost' | 'found'
  title: string
  itemName: string
  location: string
  occurredAt: string
  contact: string
  publisher: string
  college: string
  avatar: string
  image: string
  publishedAt: string
  status: string
  description: string
}

export function getLostFounds(): Promise<{ data: LostFoundItem[] }> {
  return http.get('/lostFounds')
}

export function createLostFound(data: Omit<LostFoundItem, 'id'>): Promise<{ data: LostFoundItem }> {
  return http.post('/lostFounds', data)
}
