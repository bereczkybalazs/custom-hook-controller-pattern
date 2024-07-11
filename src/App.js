import { Posts } from "./components/original/Posts/Posts";
import { Posts as RefactoredPosts } from "./components/original/Posts/Posts";

export const App = () => {
  return (
    <div>
      <Posts />
      <RefactoredPosts />
    </div>
  );
}

