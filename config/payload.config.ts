import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { buildConfig } from 'payload';

export default buildConfig({
  serverURL: process.env.PAYLOAD_SERVER_URL || 'http://localhost:4000/admin',
  secret:    process.env.PAYLOAD_SECRET     || 'super‑secret',

  db: postgresAdapter({
    pool:           { connectionString: process.env.NEON_DATABASE_URL! },
    migrationDir: 'migrations/payload',
    push:           false,
  }),

  // RichText editor adapter 
  editor: lexicalEditor(),

 collections: [
    {
      slug:   'cms_users',
      dbName: 'cms_users',
   
      auth: {
        disableLocalStrategy: true, 
      },
      // **only** your custom profile fields here:
      fields: [
        { name: 'firstName', type: 'text',  required: true },
        { name: 'lastName',  type: 'text',  required: true },
        // no 'email' or 'password'  add later
      ],
    },
    {
      slug:   'cms_posts',
      dbName: 'cms_posts',
      fields: [
        { name: 'title',   type: 'text',     required: true },
        { name: 'content', type: 'richText'  },
      ],
    },
  ],

  typescript: {
     outputFile: 'config/payload-types.ts',
  },
});