import { renderHook, waitFor } from '@testing-library/react'
import { usePosts } from './usePosts'

const mockFetch = jest.fn()
// Mock fetch
global.fetch = mockFetch


const expectPostsToBe = async (expectedPosts) => {
  const { result, rerender } = renderHook(usePosts)

  expect(result.current.posts).toEqual([])

  rerender()
  await waitFor(() => {
    expect(result.current.posts).toEqual(expectedPosts)
  })

  expect(fetch).toHaveBeenCalledTimes(1)
  expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/posts')
}

describe('usePosts', () => {

  it('should fetch and set posts', async () => {
    const expectedPosts = [{id: 1, title: 'Test Post'}]

    mockFetch.mockReturnValue(Promise.resolve({
      json: () => Promise.resolve({posts: expectedPosts})
    }))

    await expectPostsToBe(expectedPosts)
  })

  it('should handle fetch errors', async () => {
    mockFetch.mockReturnValue(() => Promise.reject('API is down'))

    await expectPostsToBe([])
  })
})