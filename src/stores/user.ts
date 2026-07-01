import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const name = ref('陈小星')
  const college = ref('计算机科学与技术学院')
  const grade = ref('大三')
  const campus = ref('东校区')
  const avatar = ref(
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face'
  )

  const displayName = computed(() => name.value)
  const isLoggedIn = computed(() => true)

  function setUser(info: { name: string; college: string; grade: string; campus: string; avatar?: string }) {
    name.value = info.name
    college.value = info.college
    grade.value = info.grade
    campus.value = info.campus
    if (info.avatar) avatar.value = info.avatar
  }

  return { name, college, grade, campus, avatar, displayName, isLoggedIn, setUser }
})
