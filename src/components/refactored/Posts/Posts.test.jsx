import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { POST_TESTID, Posts } from './Posts';

const mockPosts = jest.fn()
jest.mock('./usePosts', () => ({
  ...jest.requireActual('./usePosts'),
  usePosts: () => ({ posts: mockPosts() }),
}));

describe('<Posts />', () => {
  it('renders posts when there are posts', () => {
    mockPosts.mockReturnValue([
      { id: 1, title: 'Post 1', body: 'Body of post 1' },
      { id: 2, title: 'Post 2', body: 'Body of post 2' },
    ]);

    render(<Posts />);

    expect(screen.getAllByTestId(POST_TESTID)).toHaveLength(2);
  });

  it('renders a message when there are no posts', async () => {
    mockPosts.mockReturnValue([]);

    render(<Posts />);
    await waitFor(() => {
      expect(screen.queryByTestId(POST_TESTID)).toBeNull();
    })
  });
});