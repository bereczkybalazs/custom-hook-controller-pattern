import { usePosts } from './hooks/usePosts';

export const POST_TESTID = 'POST_TESTID'
export const Posts = () => {
  const { posts } = usePosts()

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