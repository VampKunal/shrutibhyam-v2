export const home = {
    name: 'home',
    title: 'Home Page',
    type: 'document',
    fields: [
        {
            name: 'heroCarousel',
            title: 'Hero Carousel',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'desktopImage', title: 'Desktop Image', type: 'image' },
                        { name: 'mobileImage', title: 'Mobile Image', type: 'image' },
                        { name: 'link', title: 'Link (e.g. /shop)', type: 'string' },
                    ]
                }
            ]
        },
        {
            name: 'partnersLogos',
            title: 'Partners Logos',
            type: 'array',
            of: [{ type: 'image' }]
        },
        {
            name: 'craftedWithCare',
            title: 'Crafted With Care (Images)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'mainImage', title: 'Main Image (Left)', type: 'image' },
                        { name: 'subImage1', title: 'Sub Image 1 (Top Right)', type: 'image' },
                        { name: 'subImage2', title: 'Sub Image 2 (Bottom Right)', type: 'image' },
                    ]
                }
            ]
        },
        {
            name: 'stats',
            title: 'Stats Section',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', title: 'Value (e.g. 4, 100%)', type: 'string' },
                        { name: 'label', title: 'Label', type: 'string' },
                    ]
                }
            ]
        },
        {
            name: 'craftedWithIntention',
            title: 'Crafted With Intention (Founder Section)',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
                { name: 'image', title: 'Founder Image', type: 'image' },
            ]
        },
        {
            name: 'socialRituals',
            title: 'Social Rituals',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                {
                    name: 'images',
                    title: 'Images',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'image', title: 'Image', type: 'image' },
                                { name: 'link', title: 'Link', type: 'url' },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: 'communityExperiences',
            title: 'Community Experiences',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'subheading', title: 'Subheading / Description', type: 'text' },
                {
                    name: 'kindWords',
                    title: 'Kind Words (Text Reviews)',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'quote', title: 'Quote', type: 'text' },
                                { name: 'name', title: 'Customer Name', type: 'string' },
                                { name: 'role', title: 'Role / Label', type: 'string' },
                                { name: 'rating', title: 'Rating (1-5)', type: 'number' },
                            ]
                        }
                    ]
                },
                {
                    name: 'verifiedReviews',
                    title: 'Verified Reviews (Screenshot Images)',
                    type: 'array',
                    of: [{ type: 'image' }]
                }
            ]
        }
    ]
};
