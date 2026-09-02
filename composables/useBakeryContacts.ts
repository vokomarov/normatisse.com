/**
 * Single source of truth for the bakery's contact channels. The contact section
 * renders them as rows, the footer as icon buttons — same data, same order.
 */
const PHONE = '+380734700263'
const INSTAGRAM = 'https://instagram.com/normatisse.bakery'

/**
 * How far ahead the order has to be *placed* — not how long the making takes.
 * The product is made for the agreed date. Quoted in the hero and above the steps.
 */
export const ORDER_LEAD_TIME = '3-5 днів'

/**
 * Prefills the first message with what step 01 asks for. Telegram honours
 * `?text=` on username links and may drop it on phone-number links, in which
 * case the chat just opens empty — the param is never harmful. Instagram
 * supports no prefill at all and `viber://chat` takes no message parameter, so
 * this only ever helps Telegram.
 */
const ORDER_PREFILL = 'Вітаю! Хочу замовити.\nДата: \nПривід: \nЩо саме: \nБажаний дизайн: '

export interface ContactChannel {
    label: string
    value: string
    icon: string
    to: string
    /** Opens in a new tab; app-scheme links (tel:, viber:) never do. */
    external: boolean
    /** The channel answered first. Exactly one channel carries it. */
    primary?: boolean
    /** Shown next to the label on the primary row only. */
    note?: string
}

const channels: ContactChannel[] = [
    {
        label: 'Instagram Direct',
        value: '@normatisse.bakery',
        icon: 'i-simple-icons-instagram',
        to: INSTAGRAM,
        external: true,
        primary: true,
        note: 'Відповідаю найшвидше',
    },
    {
        label: 'Telegram',
        value: PHONE,
        icon: 'i-simple-icons-telegram',
        to: `https://t.me/${PHONE}?text=${encodeURIComponent(ORDER_PREFILL)}`,
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
    return { phone: PHONE, instagram: INSTAGRAM, channels, leadTime: ORDER_LEAD_TIME }
}
