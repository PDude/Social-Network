import * as axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'aecf71b1-88df-45f9-a684-03539ce8b2da',
  },
})

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 6) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => {
        return response.data
      })
  },
  followUser(id) {
    return instance.post(`follow/${id}`).then((response) => {
      return response.data
    })
  },
  unfollowUser(id) {
    return instance.delete(`follow/${id}`).then((response) => {
      return response.data
    })
  },
}

export const authAPI = {
  me() {
    return instance.get(`auth/me`).then((response) => {
      return response.data
    })
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance
      .post('auth/login', { email, password, rememberMe, captcha })
      .then((response) => {
        return response.data
      })
  },
  logout() {
    return instance.delete('auth/login').then((response) => {
      return response.data
    })
  },
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
  },
}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data
    })
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`).then((response) => {
      return response.data
    })
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status }).then((response) => {
      return response.data
    })
  },
  savePhoto(photoFile) {
    const formData = new FormData()
    formData.append('image', photoFile)

    return instance
      .put(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data
      })
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile).then((response) => {
      return response.data
    })
  },
}
