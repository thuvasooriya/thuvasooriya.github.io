# analytics setup guide

## overview

cloudflare worker-based analytics system with:
- **view tracking** - counts page views (increments when 50% visible)
- **like system** - 13-click heart button (0-13 likes per user)
- **privacy-friendly** - user fingerprinting via sha-256(ip + user-agent)

## local development

### 1. start worker
```bash
# option 1: npm script
bun run worker:dev

# option 2: direct command
cd worker && bunx wrangler dev
```

worker will be available at `http://localhost:8787`

### 2. start astro
```bash
bun run dev
```

site will be available at `http://localhost:4321`

### 3. verify setup
- visit any post page (e.g., `/posts/your-post-slug`)
- check browser console for analytics requests
- view counter should show "..." then load count
- like button should be clickable (0-13 clicks)

## database management

### initialize database
```bash
bun run worker:db:init
```

### reset database (clear all data)
```bash
bun run worker:db:reset
```

### query database directly
```bash
cd worker
bunx wrangler d1 execute DB --local --command "SELECT * FROM page_views"
bunx wrangler d1 execute DB --local --command "SELECT * FROM likes_count"
```

## integration

analytics components are integrated in:
- **posts**: `src/layouts/BlogPost.astro` (lines 40-41)

to add to tweets or projects:
```astro
<ViewCounter slug={item.id} content_type="tweet" />
<LikeButton slug={item.id} content_type="tweet" />
```

## api endpoints

### views
- `GET /api/analytics/view/:type/:slug` - get view count
- `POST /api/analytics/view/:type/:slug` - increment view
- `GET /api/analytics/view` - get all views

### likes
- `GET /api/analytics/like/:type/:slug` - get like data
- `POST /api/analytics/like/:type/:slug` - update like count
- `GET /api/analytics/like` - get all likes

content types: `post`, `tweet`, `project`

## deployment

### 1. create d1 database
```bash
cd worker
bunx wrangler d1 create sooriya-analytics
```

copy the database id from output and update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "sooriya-analytics"
database_id = "YOUR_DATABASE_ID_HERE"
```

### 2. initialize production database
```bash
cd worker
bunx wrangler d1 execute DB --remote --file=src/db/schema.sql
```

### 3. deploy worker
```bash
cd worker
bunx wrangler deploy
```

### 4. update astro env
create/update `.env.production`:
```bash
PUBLIC_ANALYTICS_URL=https://your-worker.workers.dev
```

### 5. deploy astro site
```bash
bun run build
# then deploy dist/ to your hosting provider
```

## environment variables

### development (`.env`)
```bash
PUBLIC_ANALYTICS_URL=http://localhost:8787
```

### production (`.env.production`)
```bash
PUBLIC_ANALYTICS_URL=https://your-worker.workers.dev
```

## troubleshooting

### worker not starting
```bash
# check if port 8787 is already in use
lsof -ti:8787 | xargs kill -9

# restart worker
bun run worker:dev
```

### database not found
```bash
# reinitialize database
bun run worker:db:init
```

### components not showing data
1. check browser console for errors
2. verify worker is running on port 8787
3. verify `.env` has correct `PUBLIC_ANALYTICS_URL`
4. check network tab for failed requests

### cors errors
worker has cors enabled for all origins
check `worker/src/utils/cors.ts` if needed

## file structure

```
worker/
├── src/
│   ├── db/
│   │   └── schema.sql          # database schema
│   ├── routes/
│   │   ├── likes.ts            # like endpoints
│   │   └── views.ts            # view endpoints
│   ├── utils/
│   │   ├── cors.ts             # cors helpers
│   │   ├── fingerprint.ts      # user identification
│   │   └── validation.ts       # input validation
│   ├── index.ts                # main router
│   └── types.ts                # typescript types
├── wrangler.toml               # cloudflare config
└── package.json

src/components/
├── LikeButton.astro            # 13-click heart
└── ViewCounter.astro           # terminal-style counter
```

## next steps

1. test locally with both worker and astro running
2. verify analytics work on a test post
3. set up cloudflare account and deploy worker
4. update production env variables
5. deploy astro site
6. monitor analytics in cloudflare dashboard
