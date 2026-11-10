import { useState, useCallback } from 'react'
import buildService from '../services/buildService'

export function useBuilds() {
  const [builds, setBuilds] = useState(() => buildService.getAll())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const refresh = useCallback(() => {
    setBuilds(buildService.getAll())
  }, [])

  const createBuild = useCallback((data) => {
    try {
      setLoading(true)
      setError(null)
      const created = buildService.create(data)
      setBuilds(buildService.getAll())
      return created
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateBuild = useCallback((id, data) => {
    try {
      setLoading(true)
      setError(null)
      const updated = buildService.update(id, data)
      setBuilds(buildService.getAll())
      return updated
    } catch (err) {
      setError(err.message)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteBuild = useCallback((id) => {
    try {
      buildService.delete(id)
      setBuilds(buildService.getAll())
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [])

  return { builds, loading, error, refresh, createBuild, updateBuild, deleteBuild }
}
