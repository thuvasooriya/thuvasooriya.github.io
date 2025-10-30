# analytics worker testing

## setup

1. install dependencies:
```bash
cd worker && bun install
```

2. initialize local database:
```bash
bunx wrangler d1 execute DB --local --file=src/db/schema.sql
```

3. start development server:
```bash
bunx wrangler dev
```

## testing endpoints

### views

get current views:
```bash
curl http://localhost:8787/api/analytics/view/post/test-slug
```

increment views:
```bash
curl -X POST http://localhost:8787/api/analytics/view/post/test-slug
```

get all views:
```bash
curl http://localhost:8787/api/analytics/view
```

### likes

get current likes:
```bash
curl http://localhost:8787/api/analytics/like/post/test-slug
```

add/update like (0-13):
```bash
curl -X POST http://localhost:8787/api/analytics/like/post/test-slug \
  -H "Content-Type: application/json" \
  -d '{"count": 5}'
```

reset like to 0:
```bash
curl -X POST http://localhost:8787/api/analytics/like/post/test-slug \
  -H "Content-Type: application/json" \
  -d '{"count": 0}'
```

get all likes:
```bash
curl http://localhost:8787/api/analytics/like
```

## expected responses

### view response
```json
{
  "slug": "test-slug",
  "content_type": "post",
  "views": 42
}
```

### like response
```json
{
  "slug": "test-slug",
  "content_type": "post",
  "user_likes": 5,
  "total_likes": 147,
  "unique_users": 23
}
```

## user identification

users are identified by sha-256 hash of `ip + user-agent`
same user from same device will have consistent fingerprint

## database schema

- `page_views` - tracks total views per content
- `likes` - individual user likes (0-13 per user)
- `likes_count` - denormalized totals for fast reads

## testing locally

1. start worker: `bunx wrangler dev`
2. start astro: `bun run dev`
3. visit http://localhost:4321/posts/your-post
4. check console for analytics requests
5. verify view counter and like button work
