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
                // Tailwind v4 no longer sets cursor:pointer on <button>, so every
                // action element would fall back to the text cursor without this.
                base: 'rounded-full font-medium cursor-pointer',
            },
            variants: {
                // Brand button scale: padding-y : padding-x is always 1:3.
                // `lg` is the 10/30 baseline; `xl` is the hero step above it.
                size: {
                    xs: { base: 'px-3 py-1 text-xs gap-1.5' },
                    sm: { base: 'px-[1.125rem] py-1.5 text-xs gap-1.5' },
                    md: { base: 'px-6 py-2 text-sm gap-2' },
                    lg: { base: 'px-[1.875rem] py-2.5 text-sm gap-2' },
                    xl: { base: 'px-9 py-3 text-base gap-2.5' },
                },
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
