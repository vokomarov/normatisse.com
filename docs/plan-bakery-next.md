# Plan: deferred CRO items for `/bakery`

Two items from the CRO pass were agreed in principle but not built, because both
need content that does not exist yet. Neither can be finished by writing code.

Read `docs/design-system.md` before implementing either — both add a section,
and section rhythm, surface order and CTA spacing are governed there, not here.

---

## 1. Baker personality — turn the manifesto into a person

### Why

The page currently says *what* is baked and *how it is ordered* but never
*who bakes it*. On a home bakery that is the differentiator: the buyer is not
choosing a supplier, they are choosing to trust one person with an event they
care about. The manifesto band («Несу своє хобі в маси, принаймні намагаюсь»)
carries the voice but is anonymous — no name, no face, no first-person claim.

### What is missing (owner input required)

Nothing below can be invented. Each item is a factual claim about a real person.

- **Name** and how she wants to be addressed on the page.
- **A photograph of the baker.** Not a product shot. Needed at ≥1600px on the
  long edge, EXIF-rotated at import (§9 of the design system).
- **Two or three concrete facts** that are checkable rather than adjectival:
  when she started, what she trained in or taught herself, how many orders a
  week she takes, why she bakes to order rather than in batches. "З любов'ю до
  деталей" is not a fact and does not belong here.
- **Whether she wants her face on the site at all.** This is a privacy decision
  and hers alone; if the answer is no, the section is a first-person signed
  statement without a portrait, and the plan still works.

### Shape

Do **not** add a fourth section. Extend the existing manifesto band:

- Keep the photo band as the pause it is.
- Add a short signed block directly under it, on the `--brand-surface` band that
  already follows: portrait (`brand-card`-framed, not full-bleed) beside two or
  three sentences in the first person, signed with the name.
- The two or three facts render as a small `<dl>`, not as prose — the same
  claim/receipt logic as the review cards.

### Constraints

- The band must not become a second media band (§1: one per page).
- No CTA in this block. The order path is the contact section; a CTA here
  competes with it and this block's job is trust, not conversion.
- Adding a named person means the `Bakery` schema can gain a `founder` node.
  Only add it once the name is real, and keep the address decision as it is
  (§ *Deliberate non-fixes* in `CLAUDE.md`).

---

## 2. FAQ section

### Why

The page answers "what" and "how much" but leaves the three objections that
actually stall an order: can it be changed after booking, what happens if the
date is unavailable, and what the payment/prepayment terms are. Every one of
those is currently answered privately in Direct, which means it is answered
after the reader has already decided whether to write.

### What is missing (owner input required)

The real policies. Guessing these creates a public promise the bakery then has
to honour, so each needs an explicit answer:

- **Prepayment** — is there one, how much, is it refundable, and when.
- **Cancellation / date change** — how late is too late.
- **Allergens and substitutions** — what can be swapped (gluten, lactose, nuts,
  sugar), and what genuinely cannot.
- **Shelf life and storage** — how long the cake keeps and at what temperature.
- **Delivery** — already stated as "тариф таксі"; confirm whether there is a
  minimum order or a delivery radius.
- **How far ahead is realistically bookable** — `leadTime` is `3-5 днів`, but
  the FAQ should say what happens for a request that is sooner than that.

### Shape

- New `<BakerySection>` between reviews and contact, wrapped in
  `<BrandSection surface="white">`. It is the last objection-handling step
  before the order form, which is where it belongs.
- `UAccordion` — this *is* an accordion case, unlike the cakes constructor
  (§8, *Disclosure*): the rows are the same kind of thing, and the reader is
  scanning for the one that applies to them.
- Six to eight questions maximum. An FAQ longer than one screen reads as a
  terms-of-service page and stops being reassuring.
- Questions phrased as the customer would ask them, first person
  («Чи можу я змінити дату?»), not as the business would title them
  («Зміна дати замовлення»).
- Emit `FAQPage` JSON-LD from `pages/bakery.vue` as its own flat `<script>`
  block, tied to `/bakery#business` by `@id`, following the existing pattern.
  The rendered answers and the schema answers must be the same text — Google
  treats a mismatch as cloaking.

### Constraints

- Adding a section between reviews and contact changes the surface run
  (white → white). Give the FAQ band `curve-top` or a different surface so the
  boundary is visible; two consecutive `white` bands read as one section.
- The reviews section's closing CTA currently relies on a negative bottom
  margin because nothing curves over it (§3). If the FAQ band curves over it,
  that margin has to go.

---

## Sequencing

Item 1 before item 2. The FAQ is a wall of policy text; it lands better after
the reader knows who is making the promises. Both are blocked on owner input,
so neither is scheduled.
