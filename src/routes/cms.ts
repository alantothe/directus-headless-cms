// src/routes/cms.ts
import { Hono } from 'hono';
import { getPayloadInstance } from '../services/payload/payload';

const cms = new Hono();

// Count documents
cms.get('/posts/count', async (ctx) => {
  const payload = await getPayloadInstance();
  const count = await payload.count({ collection: 'cms_posts' });
  return ctx.json({ count });
});

// List documents with optional query params (depth, limit, page, where, sort)
// cms.get('/posts', async (ctx) => {
//   const payload = await getPayloadInstance();
//   const docs = await payload.find({
//     collection: 'cms_posts',
//     depth:    Number(ctx.req.query('depth')) || 0,
//     limit:    Number(ctx.req.query('limit')) || undefined,
//     page:     Number(ctx.req.query('page'))  || undefined,
//     where:    ctx.req.query('where')  ? JSON.parse(ctx.req.query('where')) : undefined,
//     sort:     ctx.req.query('sort')   ? ctx.req.query('sort')!.split(',') : undefined,
//   });
//   return ctx.json(docs);  // { docs, totalDocs, totalPages, limit, page }
// });

// Get one by ID
cms.get('/posts/:id', async (ctx) => {
  const payload = await getPayloadInstance();
  const post = await payload.findByID({
    collection: 'cms_posts',
    id:         ctx.req.param('id'),
    depth:      Number(ctx.req.query('depth')) || 0,
  });
  return ctx.json(post);
});

// Create
cms.post('/posts', async (ctx) => {
  const data = await ctx.req.json();
  const payload = await getPayloadInstance();
  const newPost = await payload.create({
    collection: 'cms_posts',
    data,
  });
  return ctx.json(newPost);
});

// Update by ID
cms.patch('/posts/:id', async (ctx) => {
  const data = await ctx.req.json();
  const payload = await getPayloadInstance();
  const updated = await payload.update({
    collection: 'cms_posts',
    id:         ctx.req.param('id'),
    data,
  });
  return ctx.json(updated);
});

// Delete by ID
cms.delete('/posts/:id', async (ctx) => {
  const payload = await getPayloadInstance();
  await payload.delete({
    collection: 'cms_posts',
    id:         ctx.req.param('id'),
  });
  return ctx.json({ success: true });
});

export default cms;
