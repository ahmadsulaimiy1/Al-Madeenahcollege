// Shared SVG sprite-sheet — identical across every page of the site.
export const SPRITE_DEFS = `
<svg width="0" height="0" class="sprite-defs" aria-hidden="true">
<defs>
<symbol id="ic-mail" viewBox="0 0 24 24"><path d="M3.5 6.5h17v11h-17z"/><path d="M4 7l8 6.5L20 7"/></symbol>
<symbol id="ic-phone" viewBox="0 0 24 24"><path d="M6 4.5c1 3 2.4 5.7 4.4 7.7 2 2 4.7 3.4 7.7 4.4l1.4-2.4c.3-.5.9-.7 1.5-.5l3 1c.6.2 1 .8.9 1.4-.3 2.6-2.6 4.4-5.2 4-5-.8-9.6-3.3-12.9-6.6C3.5 11.2 1 6.6 1.8 1.6 2.2-1 4-3.3 6.6-3.6L7.6-.6c.2.6 0 1.2-.5 1.5l-2.4 1.4c1 3 .3-.2 1.3 1.9" fill="none" transform="translate(1,4)"/><path d="M5.5 3.5c.7 2.6 2 5 3.8 6.9 1.9 1.9 4.3 3.1 6.9 3.8l1.1-1.9c.2-.4.7-.6 1.2-.4l2.7 1c.5.2.8.7.7 1.2-.3 2.1-2.1 3.5-4.2 3.2-4.4-.7-8.4-2.9-11.3-5.9C3.5 8.5 1.3 4.5.6.1.3-2 1.7-4 3.8-4.2l2.7-.3c.5-.1 1 .2 1.2.7l1 2.7c.2.5 0 1-.4 1.2L6.4 1.4"/></symbol>
<symbol id="ic-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 2.6 4.2 5.6 4.2 9s-1.4 6.4-4.2 9c-2.8-2.6-4.2-5.6-4.2-9S9.2 5.6 12 3z"/></symbol>
<symbol id="ic-type" viewBox="0 0 24 24"><path d="M6 19l5-14h1l5 14M8 14h7"/></symbol>
<symbol id="ic-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M19.5 19.5l-4.3-4.3"/></symbol>
<symbol id="ic-menu" viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></symbol>
<symbol id="ic-close" viewBox="0 0 24 24"><path d="M5 5l14 14M19 5L5 19"/></symbol>
<symbol id="ic-signin" viewBox="0 0 24 24"><path d="M11 4H5v16h6M15 8l4 4-4 4M9 12h10"/></symbol>
<symbol id="ic-inst" viewBox="0 0 24 24"><path d="M4 21h16M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6"/></symbol>
<symbol id="ic-book" viewBox="0 0 24 24"><path d="M12 5.5C10 4 7 3.5 4 4v14c3-.5 6 0 8 1.5M12 5.5C14 4 17 3.5 20 4v14c-3-.5-6 0-8 1.5M12 5.5v15"/></symbol>
<symbol id="ic-doc" viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7M9 8h3"/></symbol>
<symbol id="ic-ribbon" viewBox="0 0 24 24"><circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L6 21l6-3 6 3-2.5-7.5"/></symbol>
<symbol id="ic-bell" viewBox="0 0 24 24"><path d="M6 10a6 6 0 1112 0c0 4 1.5 5.5 1.5 5.5h-15S6 14 6 10z"/><path d="M10 19a2 2 0 004 0"/></symbol>
<symbol id="ic-scale" viewBox="0 0 24 24"><path d="M12 3v18M7 21h10M5 7l3.5-1.5L12 7M19 7l-3.5-1.5L12 7M5 7l-3 6a3.2 3.2 0 006 0L5 7zM19 7l-3 6a3.2 3.2 0 006 0l-3-6z"/></symbol>
<symbol id="ic-quran" viewBox="0 0 24 24"><path d="M4 5.5c2.5-1 5.5-1.3 8-.3 2.5-1 5.5-.7 8 .3v13c-2.5-1-5.5-1.3-8-.3-2.5-1-5.5-.7-8 .3z"/><path d="M12 5.2v13"/></symbol>
<symbol id="ic-scroll" viewBox="0 0 24 24"><path d="M6 4h13v13a3 3 0 01-3 3H6a3 3 0 003-3V4z"/><path d="M6 4a3 3 0 00-3 3v0a3 3 0 003 3M9 9h7M9 12.5h5"/></symbol>
<symbol id="ic-brief" viewBox="0 0 24 24"><rect x="3" y="8" width="18" height="12" rx="1"/><path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/></symbol>
<symbol id="ic-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".6" fill="currentColor"/></symbol>
<symbol id="ic-coin" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v9M9.5 9.7c0-1.2 1.1-2.2 2.5-2.2s2.5.8 2.5 1.8-1 1.5-2.5 1.9-2.5.9-2.5 1.9 1.1 1.8 2.5 1.8 2.5-1 2.5-2.2"/></symbol>
<symbol id="ic-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/></symbol>
<symbol id="ic-check" viewBox="0 0 24 24"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4.5"/></symbol>
<symbol id="ic-lock" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 018 0v3"/></symbol>
</defs>
</svg>
`;
