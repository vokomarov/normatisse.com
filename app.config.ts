export default defineAppConfig({
    ui: {
        colors: {
            primary: 'watercourse',
            secondary: 'blush',
            neutral: 'stone',
        },
        // Interactive surfaces are pills brand-wide; panels and media keep the
        // radius scale from main.css (--brand-radius-*).
        button: {
            slots: {
                base: 'rounded-full font-medium',
            },
        },
        badge: {
            slots: {
                base: 'rounded-full',
            },
        },
        modal: {
            slots: {
                content: 'rounded-3xl',
            },
        },
    },
})
