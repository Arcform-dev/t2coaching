import { defineField, defineType } from 'sanity'

// Matches the shape the site expects (see src/lib/content.js → mapTestimonial).
export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Athlete name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'Short descriptor under the name, e.g. "Ironman Finisher · Age 66".',
    }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'excerpt',
      title: 'Short excerpt',
      type: 'text',
      rows: 3,
      description: 'The 1–2 sentence quote shown on the home page.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'full',
      title: 'Full story',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      description: 'The complete story shown on the Testimonials page. Add one block per paragraph.',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers show first. Leave blank to sort by date added.',
    }),
  ],
  orderings: [{ title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'tag', media: 'photo' } },
})
