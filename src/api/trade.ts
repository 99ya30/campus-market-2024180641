import http from './http'

export interface TradeItem {
  id: number
  title: string
  price: number
  category: string
  condition: string
  publisher: string
  college: string
  avatar: string
  campus: string
  location: string
  image: string
  publishedAt: string
  status: string
  tags: string[]
  description: string
}

export function getTrades(): Promise<{ data: TradeItem[] }> {
  return http.get('/trades')
}

export function createTrade(data: Omit<TradeItem, 'id'>): Promise<{ data: TradeItem }> {
  return http.post('/trades', data)
}
