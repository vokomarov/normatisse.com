<!--
  Shared signature element (bakery page direction note §5): a fixed, hand-placed
  scatter of circles adapted from the bakery's own pricing-graphics corner motif.
  No props — call sites vary only rotate-*/scale-*/-scale-x-100/opacity-* via the
  `class` attribute, which falls through to the svg root below. Position (top/left/
  right/bottom/z-index) is set by the plain wrapping div at each call site.
-->
<template>
    <svg
        class="absolute h-44 w-44 pointer-events-none select-none"
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
    >
        <!-- top-left corner cluster (dense) -->
        <circle cx="10" cy="8" r="9" fill="#F55C81" opacity="0.55" />
        <circle cx="22" cy="15" r="3" fill="#F55C81" opacity="0.35" />
        <circle cx="6" cy="25" r="5" fill="#66EFC0" opacity="0.4" />
        <circle cx="17" cy="3" r="2.5" stroke="#F55C81" stroke-width="1.5" opacity="0.65" />
        <circle cx="32" cy="11" r="2" fill="#F55C81" opacity="0.18" />

        <!-- bottom-right corner cluster (dense) -->
        <circle cx="110" cy="109" r="13" fill="#F55C81" opacity="0.5" />
        <circle cx="103" cy="117" r="5" fill="#29DEA5" opacity="0.45" />
        <circle cx="117" cy="95" r="4" fill="#F55C81" opacity="0.3" />
        <circle cx="93" cy="111" r="3" stroke="#05C48E" stroke-width="1.5" opacity="0.55" />
        <circle cx="107" cy="83" r="3" fill="#F55C81" opacity="0.25" />

        <!-- light asymmetric touches at the other two corners -->
        <circle cx="89" cy="17" r="3.5" fill="#F55C81" opacity="0.3" />
        <circle cx="21" cy="101" r="3.5" fill="#66EFC0" opacity="0.25" />

        <!-- near-center, barely-there: the composition thins toward the middle -->
        <circle cx="59" cy="63" r="2" fill="#F55C81" opacity="0.1" />
    </svg>
</template>
