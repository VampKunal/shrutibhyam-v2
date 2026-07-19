export const event = {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'date',
            title: 'Date',
            type: 'string',
            description: 'e.g. October 15, 2024',
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'image',
            title: 'Event Image',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'link',
            title: 'Registration Link',
            type: 'url',
        },
        {
            name: 'isActive',
            title: 'Is Active?',
            type: 'boolean',
            initialValue: true,
        },
        {
            name: 'order',
            title: 'Order',
            type: 'number',
        }
    ],
};
