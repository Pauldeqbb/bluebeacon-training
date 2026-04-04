import { useState, useEffect, useCallback } from 'react'

/**
 * Persists training progress per client in localStorage.
 * Key format: bb_progress_{clientSlug}
 */
export function useProgress(clientSlug) {
  const storageKey = `bb_progress_${clientSlug}`

  const load = () => {
    try {
      const raw = localStorage.getItem(storageKey)
      return raw ? JSON.parse(raw) : { completed: [], quizResults: {} }
    } catch {
      return { completed: [], quizResults: {} }
    }
  }

  const [state, setState] = useState(load)

  // Reload when client changes
  useEffect(() => { setState(load()) }, [clientSlug])

  const save = useCallback((next) => {
    setState(next)
    try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch {}
  }, [storageKey])

  const markComplete = useCallback((unitIndex) => {
    save({
      ...state,
      completed: state.completed.includes(unitIndex)
        ? state.completed
        : [...state.completed, unitIndex]
    })
  }, [state, save])

  const saveQuizResult = useCallback((unitIndex, answers, score, total) => {
    const next = {
      ...state,
      quizResults: {
        ...state.quizResults,
        [unitIndex]: { answers, submitted: true, score }
      }
    }
    if (score === total) next.completed = next.completed.includes(unitIndex)
      ? next.completed
      : [...next.completed, unitIndex]
    save(next)
  }, [state, save])

  const reset = useCallback(() => {
    save({ completed: [], quizResults: {} })
  }, [save])

  return {
    completed: new Set(state.completed),
    quizResults: state.quizResults,
    markComplete,
    saveQuizResult,
    reset,
  }
}
