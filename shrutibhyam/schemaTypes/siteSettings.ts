export const siteSettings = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'discountMarquee',
            title: 'Discount Marquee Message',
            type: 'string',
            description: 'The message shown at the very top of the website (e.g. Sign up to get 10% off...)',
        },
        {
            name: 'dealActive',
            title: 'Deal Active',
            type: 'boolean',
            description: 'Toggle to activate the deal countdown banner',
        },
        {
            name: 'dealEndTime',
            title: 'Deal End Time',
            type: 'datetime',
            description: 'When the deal ends (the countdown will tick towards this time)',
        },
        {
            name: 'dealText',
            title: 'Deal Text (Legacy - not used for popup)',
            type: 'string',
            description: 'Legacy field for the old banner',
        },
        { name: 'dealPopupImage', title: 'Popup Image', type: 'image' },
        { name: 'dealTitle', title: 'Deal Title (e.g. Flash Sale)', type: 'string' },
        { name: 'dealHeading', title: 'Deal Heading (e.g. 50% OFF)', type: 'string' },
        { name: 'dealSubheading', title: 'Deal Subheading', type: 'string' },
        { name: 'dealDescription', title: 'Deal Description', type: 'string' },
        { name: 'dealButtonText', title: 'Button Text', type: 'string' },
        { name: 'dealButtonLink', title: 'Button Link', type: 'string' },
    ],
};
