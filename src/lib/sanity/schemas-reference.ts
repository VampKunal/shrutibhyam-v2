// These are the schemas you will add to your Sanity Studio (e.g., in sanity/schemas/productEnrichment.js)

export const productEnrichment = {
  name: 'productEnrichment',
  title: 'Product Enrichment',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title (For internal reference)',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'WooCommerce Product Slug',
      type: 'slug',
      description: 'This MUST exactly match the WooCommerce product slug to link them together',
      options: {
        source: 'title',
      },
    },
    {
      name: 'subtitle',
      title: 'Short Subtitle/Description',
      type: 'text',
    },
    {
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
    },
    {
      name: 'iconography',
      title: 'Iconography (Purity Tags)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'icon', title: 'Icon Name (e.g. Leaf, Sparkles)', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'accordions',
      title: 'Product Details (Accordions)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Accordion Title', type: 'string' },
            { name: 'body', title: 'Accordion Body', type: 'text' } // can be block content for rich text
          ]
        }
      ]
    }
  ]
};

export const faq = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string' },
    { name: 'answer', title: 'Answer', type: 'text' },
    { name: 'order', title: 'Order', type: 'number' }
  ]
};

export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'discountMarquee', title: 'Discount Marquee Text', type: 'string' },
    { name: 'dealActive', title: 'Is Deal Popup Active?', type: 'boolean' },
    { name: 'dealPopupImage', title: 'Popup Image', type: 'image' },
    { name: 'dealTitle', title: 'Deal Title (e.g. Flash Sale)', type: 'string' },
    { name: 'dealHeading', title: 'Deal Heading (e.g. 50% OFF)', type: 'string' },
    { name: 'dealSubheading', title: 'Deal Subheading', type: 'string' },
    { name: 'dealDescription', title: 'Deal Description', type: 'string' },
    { name: 'dealEndTime', title: 'Deal End Time', type: 'datetime' },
    { name: 'dealButtonText', title: 'Button Text', type: 'string' },
    { name: 'dealButtonLink', title: 'Button Link', type: 'string' }
  ]
};

