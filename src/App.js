import { Posts } from "./components/original/Posts/Posts";
import { Posts as RefactoredPosts } from "./components/refactored/Posts/Posts";

export const App = () => {
  return (
    <div>
      <Posts />
      <RefactoredPosts />
    </div>
  );
}

