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
            description:
                'This MUST exactly match the WooCommerce product slug to link them together',
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
                        {
                            name: 'icon',
                            title: 'Icon Name (e.g. Leaf, Sparkles)',
                            type: 'string',
                        },
                    ],
                },
            ],
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
                        {
                            name: 'body',
                            title: 'Accordion Body',
                            type: 'text',
                        },
                    ],
                },
            ],
        },
        {
            name: 'purityTags',
            title: 'Purity Tags',
            description: 'Match the names used in the frontend PURITY constant (e.g. Vegan, Handcrafted)',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'productStats',
            title: 'Product Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                        },
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                        },
                    ],
                },
            ],
        },
        {
            name: 'customerStories',
            title: 'Customer Stories',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'name',
                            title: 'Customer Name',
                            type: 'string',
                        },
                        {
                            name: 'text',
                            title: 'Story',
                            type: 'text',
                        },
                        {
                            name: 'rating',
                            title: 'Rating',
                            type: 'number',
                        },
                        {
                            name: 'image',
                            title: 'Customer Image',
                            type: 'image',
                        },
                        {
                            name: 'video',
                            title: 'Customer Video',
                            type: 'file',
                            options: {
                                accept: 'video/*',
                            },
                        },
                    ],
                },
            ],
        },
        { name: 'estimatedDeliveryText', title: 'Estimated Delivery Text', type: 'string', description: 'e.g., 3-5 Business Days' },
        { name: 'returnPolicyText', title: 'Return Policy Text', type: 'string', description: 'e.g., 48-hr damage reporting' },
        { name: 'secureCheckoutText', title: 'Secure Checkout Text', type: 'string', description: 'e.g., Secure Checkout' },
    ],
};