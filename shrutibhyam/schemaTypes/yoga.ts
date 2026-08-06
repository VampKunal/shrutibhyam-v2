export const yoga = {
    name: 'yoga',
    title: 'Yoga Page',
    type: 'document',
    fields: [
        {
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'backgroundImage', title: 'Background Image', type: 'image' },
            ]
        },
        {
            name: 'practices',
            title: 'Practices',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Name', type: 'string' },
                        { name: 'tag', title: 'Tag (e.g. Yoga, Healing)', type: 'string' },
                        { name: 'desc', title: 'Description', type: 'text' },
                    ]
                }
            ]
        },
        {
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image' }]
        }
    ]
};
