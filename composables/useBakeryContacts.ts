/**
 * Single source of truth for the bakery's contact channels. The contact section
 * renders them as rows, the footer as icon buttons — same data, same order.
 */
const PHONE = '+380734700263'
const INSTAGRAM = 'https://instagram.com/normatisse.bakery'

export interface ContactChannel {
    label: string
    value: string
    icon: string
    to: string
    /** Opens in a new tab; app-scheme links (tel:, viber:) never do. */
    external: boolean
}

const channels: ContactChannel[] = [
    {
        label: 'Instagram Direct',
        value: '@normatisse.bakery',
        icon: 'i-simple-icons-instagram',
        to: INSTAGRAM,
        external: true,
    },
    {
        label: 'Telegram',
        value: PHONE,
        icon: 'i-simple-icons-telegram',
        to: `https://t.me/${PHONE}`,
        external: true,
    },
    {
        label: 'Viber',
        value: PHONE,
        icon: 'i-simple-icons-viber',
        to: `viber://chat?number=%2B${PHONE.replace('+', '')}`,
        external: false,
    },
    {
        label: 'Телефон',
        value: PHONE,
        icon: 'i-lucide-phone',
        to: `tel:${PHONE}`,
        external: false,
    },
]

export function useBakeryContacts() {
    return { phone: PHONE, instagram: INSTAGRAM, channels }
}
