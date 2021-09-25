import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  rest.get('https://api.github.com/search/users', (req, res, ctx) => {
    return res(
      ctx.json({
        total_count: 2,
        incomplete_results: false,
        items: [
          {
            login: 'test1',
            id: 1,
            html_url: 'url_test1',
            avatar_url: 'image_test1',
          },
          {
            login: 'test2',
            id: 2,
            html_url: 'url_test1',
            avatar_url: 'image_test1',
          },
        ],
      })
    );
  })
);
