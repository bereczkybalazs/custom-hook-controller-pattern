import { useCallback, useEffect, useState } from 'react';

export const POST_TESTID = 'POST_TESTID'
export const Posts = () => {

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

  return (
    <section>
      <h2>Posts</h2>
      {posts && posts.map(({id, title, body}) => (
        <div key={id} data-testid={POST_TESTID}>
          <h3>{title}</h3>
          <p>{body}</p>
        </div>
      ))}
    </section>
  )
}
