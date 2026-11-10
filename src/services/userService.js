const PROFILE_STORAGE_KEY = 'lol_user_profile'

export const DEFAULT_USER_PROFILE = {
  name: 'Faiz Alif Rahmawan',
  nim: '21120124130063',
  kelompok: 'Kelompok 13',
  prodi: 'Teknik Komputer',
  summoner: 'Ziaf Fila',
  region: 'ID (Indonesia)',
  mainRole: 'Mid Lane',
  favChamp: 'Ahri',
  rank: 'Master',
  avatar: '🧙',
}

class UserService {
  getProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        // If it was previous placeholder data, use the real student data
        if (parsed.name === 'Nama Mahasiswa' || !parsed.name) {
          localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_USER_PROFILE))
          return DEFAULT_USER_PROFILE
        }
        return { ...DEFAULT_USER_PROFILE, ...parsed }
      }
    } catch (e) {
      console.warn('Failed to read profile from localStorage', e)
    }
    return DEFAULT_USER_PROFILE
  }

  saveProfile(profile) {
    try {
      const merged = { ...DEFAULT_USER_PROFILE, ...profile }
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(merged))
      return { success: true, data: merged }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }

  resetProfile() {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_USER_PROFILE))
    return DEFAULT_USER_PROFILE
  }
}

export default new UserService()
