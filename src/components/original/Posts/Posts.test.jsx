import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Posts, POST_TESTID } from "./Posts";

describe("<Posts />", () => {
  it("renders posts when there are posts", async () => {
    const mockPosts = [
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
    ];

    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({ posts: mockPosts }),
    });

    render(<Posts />);

    await waitFor(() => {
      mockPosts.forEach(({ title, body }) => {
        expect(screen.getByText(title)).toBeInTheDocument();
        expect(screen.getByText(body)).toBeInTheDocument();
      });
    });
  });

  it("does not render posts when there are no posts", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({ posts: [] }),
    });

    render(<Posts />);

    await waitFor(() => {
      expect(screen.queryByTestId(POST_TESTID)).toBeNull();
    });
  });
});
