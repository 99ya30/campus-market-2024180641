import http from './http'

export interface GroupBuyItem {
  id: number
  title: string
  type: string
  targetCount: number
  currentCount: number
  deadline: string
  location: string
  campus: string
  publisher: string
  college: string
  avatar: string
  publishedAt: string
  status: string
  description: string
}

export function getGroupBuys(): Promise<{ data: GroupBuyItem[] }> {
  return http.get('/groupBuys')
}

export function createGroupBuy(data: Omit<GroupBuyItem, 'id'>): Promise<{ data: GroupBuyItem }> {
  return http.post('/groupBuys', data)
}
