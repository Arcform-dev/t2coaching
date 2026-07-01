import { defineField, defineType } from 'sanity'

// Matches the shape the site expects (see src/lib/content.js → mapPost).
export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'The URL for this post. Click "Generate" to make it from the title.',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'category', title: 'Category', type: 'string', description: 'e.g. "Swim Technique", "Nutrition".' }),
    defineField({ name: 'date', title: 'Publish date', type: 'date' }),
    defineField({ name: 'readTime', title: 'Read time', type: 'string', description: 'e.g. "8 min read".' }),
    defineField({ name: 'cover', title: 'Cover image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for the blog card and search engines.',
    }),
    defineField({
      name: 'comingSoon',
      title: 'Coming soon',
      type: 'boolean',
      initialValue: false,
      description: 'Show a "coming soon" teaser instead of the full article.',
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Write the article here. Supports headings, bold, lists, links, and quotes.',
    }),
  ],
  orderings: [{ title: 'Newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'cover' } },
})
