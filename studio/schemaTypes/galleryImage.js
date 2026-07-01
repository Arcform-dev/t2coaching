import { defineField, defineType } from 'sanity'

// Matches the shape the site expects (see src/lib/content.js → mapGalleryItem).
export default defineType({
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({
      name: 'span',
      title: 'Wide / feature slot',
      type: 'boolean',
      initialValue: false,
      description: 'Make this photo span two columns in the grid.',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers show first. Leave blank to sort by date added.',
    }),
  ],
  orderings: [{ title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'caption', media: 'image' } },
})
