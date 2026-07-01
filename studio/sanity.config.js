import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

// projectId comes from `sanity init` (it writes a .env / updates this) or from
// the SANITY_STUDIO_PROJECT_ID env var. See SANITY_SETUP.md.
export default defineConfig({
  name: 'default',
  title: 'T2 Coaching',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
