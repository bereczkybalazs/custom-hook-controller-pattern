import { useCallback, useEffect, useState } from 'react';

export const usePosts = () => {

  const [posts, setPosts] = useState([])

  const fetchPosts = useCallback(async () => {
    try {
      const postsJSON = await (await fetch('https://dummyjson.com/posts')).json()
      setPosts(postsJSON.posts)
    } catch (e) {
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return {
    posts
  }
}