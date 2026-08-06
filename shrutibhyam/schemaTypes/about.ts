export const about = {
    name: 'about',
    title: 'About Page',
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
            name: 'origin',
            title: 'How We Came To Be (Origin)',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'text', title: 'Text (Paragraphs)', type: 'array', of: [{ type: 'block' }] },
                { name: 'image1', title: 'Top Image', type: 'image' },
                { name: 'image2', title: 'Bottom Image', type: 'image' }
            ]
        },
        {
            name: 'whatWeDo',
            title: 'What We Do',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'text', title: 'Text (Paragraphs)', type: 'array', of: [{ type: 'block' }] },
                { name: 'points', title: 'Bullet Points', type: 'array', of: [{ type: 'string' }] },
                { name: 'image1', title: 'Top Image', type: 'image' },
                { name: 'image2', title: 'Bottom Image', type: 'image' }
            ]
        },
        {
            name: 'yoga',
            title: 'Yoga & Sound Healing',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'text', title: 'Text (Paragraphs)', type: 'array', of: [{ type: 'block' }] },
                { name: 'image1', title: 'Top Image', type: 'image' },
                { name: 'image2', title: 'Bottom Image', type: 'image' }
            ]
        },
        {
            name: 'pureEthos',
            title: 'Pure Ethos',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'text', title: 'Text (Paragraphs)', type: 'array', of: [{ type: 'block' }] },
                { name: 'image', title: 'Main Image', type: 'image' }
            ]
        }
    ]
};
