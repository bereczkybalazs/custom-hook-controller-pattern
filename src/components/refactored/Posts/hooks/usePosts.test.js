import { renderHook, waitFor } from '@testing-library/react'
import { usePosts } from './usePosts'

const mockFetch = jest.fn()
// Mock fetch
global.fetch = mockFetch

describe('usePosts', () => {

  it('should fetch and set posts', async () => {
    const expectedPosts = [{id: 1, title: 'Test Post'}]

    mockFetch.mockReturnValue(Promise.resolve({
      json: () => Promise.resolve({posts: expectedPosts})
    }))
    const { result, rerender } = renderHook(usePosts)

    expect(result.current.posts).toEqual([])

    rerender()
    await waitFor(() => {
      expect(result.current.posts).toEqual(expectedPosts)
    })

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/posts')
  })

  it('should handle fetch errors', async () => {
    // Mock fetch to reject
    mockFetch.mockReturnValue(() => Promise.reject('API is down'))

    const { result, rerender } = renderHook( usePosts)

    // Check initial state
    expect(result.current.posts).toEqual([])

    // Wait for the fetch to be complete
    rerender()

    // Check the posts state remains empty after fetch failure
    await waitFor(() => {
      expect(result.current.posts).toEqual([])
    })

    // Ensure fetch was called once
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/posts')
  })
})