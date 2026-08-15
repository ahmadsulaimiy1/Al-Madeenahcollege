// Merged shared modules (sprite defs, base CSS, chrome script, header/footer
// chrome, DB pool + schema init, AgentMail client) — combined into one file
// purely to reduce the file count in deploy payloads; content is unchanged
// from the separate sprite.ts / base-css.ts / chrome-script.ts / chrome.ts /
// db.ts / agentmail.ts modules.
import { Pool } from "pg";

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

export const BASE_CSS = `
:root{
  --blue-950:#0B1B42; --blue-900:#122352; --blue-800:#16306E; --blue-700:#1E3F8F; --blue-600:#2C52AC;
  --gold:#B8933D; --gold-light:#D9BC7B; --gold-ink:#8C6A22;
  --ivory:#FAF6EC; --cream:#F3ECDA; --parchment:#ECE2C7; --hairline:#DDD0AC;
  --ink:#191A22; --ink-soft:#4A4C5C; --ink-faint:#7A7C8C;
  --on-blue:#F4EFE0; --on-blue-soft:#C7D0EA;
  --f-display:'Fraunces','Georgia',serif; --f-display-it:'Fraunces Italic','Fraunces',serif;
  --f-ui:'Manrope','Segoe UI',sans-serif;
  --f-ar-display:'El Messiri',serif; --f-ar-ui:'Markazi Text',serif;
  --sp-4:24px; --sp-5:32px; --sp-6:48px; --sp-7:72px; --sp-8:104px; --sp-9:152px; --sp-10:208px;
  --measure:68ch; --maxw:1240px;
  --dur:560ms; --ease:cubic-bezier(.16,.8,.24,1);
  --sh-soft:0 1px 2px rgba(16,26,60,.04), 0 3px 10px rgba(16,26,60,.05);
  --sh:0 10px 28px -10px rgba(16,26,60,.22), 0 2px 8px rgba(16,26,60,.06);
  --sh-deep:0 22px 50px -18px rgba(4,10,32,.55);
  --r-card:18px; --r-pill:999px;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--ivory);color:var(--ink);font-family:var(--f-ui);font-size:1.0625rem;line-height:1.6;
  font-variant-numeric:oldstyle-nums;-webkit-font-smoothing:antialiased}
.wrap{max-width:var(--maxw);margin-inline:auto;padding-inline:clamp(20px,4vw,48px)}
h1,h2,h3{font-family:var(--f-display);color:var(--blue-800);margin:0;font-weight:500}
a{color:inherit}
.eyebrow{font-family:var(--f-ui);font-size:.8125rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-ink);
  font-weight:700;display:inline-flex;align-items:center;gap:10px}
.eyebrow::before{content:'';width:22px;height:1px;background:var(--gold);flex-shrink:0}
.hero .eyebrow{color:var(--gold-light)}
.eyebrow .type{display:inline-block;overflow:hidden;white-space:nowrap;vertical-align:bottom;
  border-inline-end:2px solid var(--gold-light);width:0;max-width:100%;
  animation:type-in 1.3s steps(35,end) .5s 1 both,type-caret .7s steps(1) 1.85s 4 both}
@keyframes type-in{from{width:0}to{width:37ch}}
@keyframes type-caret{0%,100%{border-color:var(--gold-light)}50%{border-color:transparent}}
.lead{font-size:clamp(1.1rem,1.5vw,1.3rem);color:var(--ink-soft);max-width:62ch;line-height:1.65}

.skip{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;
  clip:rect(0,0,0,0);white-space:nowrap;border:0;background:var(--blue-800);color:var(--on-blue)}
.skip:focus{position:fixed;width:auto;height:auto;margin:0;overflow:visible;clip:auto;
  white-space:normal;padding:12px 20px;z-index:200;inset-inline-start:16px;top:16px}
.icon{width:1em;height:1em;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.icon--flip{transform:scaleX(-1)}
.sprite-defs{position:absolute}
.btn--sm{padding-block:11px}

.header{position:sticky;top:0;z-index:100}

.util{background:var(--blue-950);color:var(--on-blue-soft);font-size:.75rem}
.util .wrap{display:flex;justify-content:space-between;align-items:center;height:36px;gap:24px}
.util__left,.util__right{display:flex;align-items:center;gap:20px;min-width:0}
.util a{text-decoration:none;color:inherit;opacity:.85;transition:opacity .2s,color .2s;display:inline-flex;align-items:center;gap:7px}
.util a:hover{opacity:1;color:var(--gold-light)}
.util .icon{width:13px;height:13px;opacity:.75}
.util__right span{opacity:.35}
.util__lang{display:flex;gap:8px;align-items:center}
.util__lang a[aria-current]{color:var(--gold-light);opacity:1;font-weight:700}

.identity{background:var(--ivory);border-bottom:1px solid var(--hairline)}
.identity .wrap{display:flex;align-items:center;justify-content:space-between;height:88px;gap:24px}
.brand{display:flex;align-items:center;gap:14px;text-decoration:none;color:var(--blue-800);flex-shrink:0}
.brand__seal{width:46px;height:46px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 35% 25%,var(--ivory),var(--cream) 70%);border:1.5px solid var(--gold);
  box-shadow:0 0 0 1px rgba(184,147,61,.16),var(--sh-soft)}
.header.scrolled .brand__seal{background:radial-gradient(circle at 35% 25%,var(--blue-800),var(--blue-900) 70%);
  border-color:var(--gold-light)}
.brand svg{width:24px;height:24px;flex-shrink:0}
.brand .word{font-family:var(--f-display);font-size:1.25rem;font-weight:500;letter-spacing:.01em;line-height:1.15}
.brand .word small{display:block;font-family:var(--f-ui);font-size:.625rem;letter-spacing:.16em;text-transform:uppercase;
  color:var(--gold-ink);font-weight:700;margin-top:3px}
.identity__tag{font-family:var(--f-ui);font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-faint);
  display:flex;align-items:center;gap:14px;text-align:center}
.identity__tag i{display:inline-block;width:26px;height:1px;background:var(--hairline)}
.identity__actions{display:flex;align-items:center;gap:18px;flex-shrink:0}
.iconbtn{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;
  background:none;border:0;cursor:pointer;color:var(--blue-800);transition:background .2s}
.iconbtn:hover{background:var(--cream)}
.iconbtn .icon{width:19px;height:19px}
.navtoggle{display:none}

.navgrid{background:linear-gradient(180deg,var(--cream) 0%,var(--parchment) 220%);
  padding-block:26px;position:relative;overflow:hidden}
.navgrid::before{content:'';position:absolute;inset-inline:0;top:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(184,147,61,.4) 20%,rgba(184,147,61,.4) 80%,transparent)}
.navgrid::after{content:'';position:absolute;top:-1px;left:-8%;width:12%;height:2px;
  background:linear-gradient(90deg,transparent,#fff,transparent);opacity:0;pointer-events:none;
  animation:light-travel-wide 2.2s var(--ease) 1.6s 1 forwards}
@keyframes light-travel-wide{0%{left:-8%;opacity:0}10%{opacity:.9}90%{opacity:.9}100%{left:104%;opacity:0}}
.navgrid__row{display:flex;gap:16px;flex-wrap:wrap}
.navgrid__row a{position:relative;flex:1 1 140px;display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:13px;padding:24px 10px;text-decoration:none;color:var(--ink-soft);text-align:center;overflow:hidden;
  background:linear-gradient(165deg,var(--ivory) 0%,var(--cream) 100%);
  border:1px solid rgba(184,147,61,.22);border-radius:var(--r-card);box-shadow:var(--sh-soft);
  transition:transform .32s var(--ease),box-shadow .32s var(--ease),border-color .32s var(--ease),color .2s}
.navgrid__row a:hover,.navgrid__row a:focus-visible{transform:translateY(-4px);box-shadow:var(--sh);
  border-color:var(--gold);color:var(--blue-800)}
.navgrid__row a[aria-current]{border-color:var(--gold);background:linear-gradient(165deg,#fffdf7,var(--ivory));
  box-shadow:var(--sh)}
.navgrid__row a::after,.glance__grid a::after{content:'';position:absolute;top:0;left:-60%;width:34%;height:100%;
  background:linear-gradient(115deg,transparent,rgba(255,255,255,.5),transparent);transform:skewX(-18deg);
  pointer-events:none;opacity:0}
.navgrid__row a:hover::after{animation:card-shine .85s var(--ease) forwards}
.glance__grid a::after{background:linear-gradient(115deg,transparent,rgba(217,188,123,.4),transparent)}
.glance__grid a:hover::after{animation:card-shine .85s var(--ease) forwards}
@keyframes card-shine{0%{left:-60%;opacity:1}90%{opacity:1}100%{left:130%;opacity:0}}
.navgrid__badge{width:50px;height:50px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 35% 22%,#fffdf7,var(--cream) 78%);border:1.5px solid var(--gold);
  box-shadow:0 0 0 1px rgba(184,147,61,.14),0 3px 10px -4px rgba(140,106,34,.35);
  transition:border-color .32s var(--ease),transform .32s var(--ease)}
.navgrid__row a:hover .navgrid__badge{border-color:var(--gold-ink);transform:scale(1.06)}
.navgrid__row .icon{width:21px;height:21px;color:var(--gold-ink)}
.navgrid__row span:last-child{font-size:.6875rem;letter-spacing:.06em;text-transform:uppercase;font-weight:700}

.subnav{background:transparent;padding-block:18px}
.subnav .wrap{display:flex;align-items:stretch;gap:12px;overflow-x:auto;scrollbar-width:none}
.subnav .wrap::-webkit-scrollbar{display:none}
.subnav a{display:flex;align-items:center;gap:9px;padding:12px 22px;text-decoration:none;font-size:.75rem;
  letter-spacing:.06em;text-transform:uppercase;font-weight:700;color:var(--ink-soft);white-space:nowrap;
  background:var(--ivory);border:1px solid rgba(184,147,61,.22);border-radius:var(--r-pill);box-shadow:var(--sh-soft);
  transition:transform .28s var(--ease),box-shadow .28s var(--ease),border-color .28s,color .2s,background .28s}
.subnav a .icon{width:14px;height:14px}
.subnav a:hover{transform:translateY(-2px);box-shadow:var(--sh);border-color:var(--gold);color:var(--blue-800)}
.subnav a.is-primary{background:linear-gradient(180deg,var(--blue-700),var(--blue-800));color:var(--on-blue);
  border-color:var(--blue-800)}
.subnav a.is-primary:hover{box-shadow:0 14px 28px -10px rgba(11,27,66,.5);border-color:var(--gold)}

.notices{background:var(--ivory)}
.notices .wrap{display:flex;justify-content:space-between;align-items:center;height:38px;font-size:.8125rem;gap:16px}
.notices__l{display:flex;align-items:center;gap:10px;color:var(--ink-soft);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.notices__l .icon{width:14px;height:14px;color:var(--gold-ink);flex-shrink:0}
.notices a{color:var(--blue-700);text-decoration:none;font-weight:700;flex-shrink:0}
.notices a:hover{text-decoration:underline}

.drawer{position:fixed;inset:0;background:var(--ivory);z-index:300;display:none;overflow-y:auto}
.drawer[data-open="true"]{display:block}
.drawer__top{display:flex;justify-content:space-between;align-items:center;padding:20px 20px;border-bottom:1px solid var(--hairline)}
.drawer__close{background:none;border:0;cursor:pointer;color:var(--blue-800);padding:8px}
.drawer__close .icon{width:22px;height:22px}
.drawer__grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:16px 20px 4px}
.drawer__grid a{background:linear-gradient(165deg,var(--ivory),var(--cream));display:flex;align-items:center;gap:12px;
  padding:16px;text-decoration:none;color:var(--ink);font-size:.8438rem;font-weight:700;border-radius:14px;
  border:1px solid rgba(184,147,61,.2);box-shadow:var(--sh-soft)}
.drawer__badge{width:36px;height:36px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 35% 22%,#fffdf7,var(--cream) 78%);border:1.5px solid var(--gold)}
.drawer__grid .icon{width:16px;height:16px;color:var(--gold-ink);flex-shrink:0}
.drawer__actions{display:flex;flex-direction:column;padding:18px 20px;gap:10px;background:var(--parchment)}
.drawer__actions a{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;text-decoration:none;
  color:var(--ink-soft);font-size:.8125rem;letter-spacing:.04em;text-transform:uppercase;font-weight:700;
  background:var(--ivory);border:1px solid rgba(184,147,61,.2);border-radius:var(--r-pill);box-shadow:var(--sh-soft)}
.drawer__actions a.is-primary{color:var(--on-blue);background:linear-gradient(180deg,var(--blue-700),var(--blue-800));
  border-color:var(--blue-800)}
.drawer__util{display:flex;justify-content:space-between;padding:18px 20px;font-size:.8125rem;color:var(--ink-faint)}

.header.scrolled .util,.header.scrolled .notices{display:none}
.header.scrolled .identity .wrap{height:64px}
.header.scrolled .navgrid__row a{padding-block:12px}

@media (max-width:1180px){
  .util__left{display:none}
}
@media (max-width:820px){
  .identity .wrap{height:80px}
  .identity__tag{display:none}
}
@media (max-width:640px){
  .navgrid,.subnav{display:none}
  .navtoggle{display:inline-flex}
  .identity .wrap{height:76px}
  .identity__actions .iconbtn:not(.navtoggle),.identity__actions .btn{display:none}
}
@media (max-width:560px){
  .util .wrap{height:32px}
  .util a span:not(.icon){display:none}
}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:.6em;font-family:var(--f-ui);
  font-size:.8125rem;letter-spacing:.08em;text-transform:uppercase;font-weight:700;padding:15px 32px;
  border-radius:var(--r-pill);text-decoration:none;cursor:pointer;
  transition:transform .22s var(--ease),box-shadow .3s var(--ease),color .22s,background .3s}
.btn--primary{position:relative;overflow:hidden;background:linear-gradient(180deg,var(--blue-700),var(--blue-800));
  color:var(--on-blue);border:1px solid var(--blue-800);box-shadow:var(--sh-soft)}
.btn--primary:hover{transform:translateY(-2px);box-shadow:0 14px 30px -10px rgba(11,27,66,.5)}
.btn--primary::after{content:'';position:absolute;top:0;left:-60%;width:34%;height:100%;
  background:linear-gradient(115deg,transparent,rgba(255,255,255,.4),transparent);transform:skewX(-18deg);
  pointer-events:none;opacity:0}
.btn--primary:hover::after{animation:card-shine .8s var(--ease) forwards}
.btn--primary:disabled{opacity:.6;cursor:not-allowed;transform:none!important}
.btn--gilt{position:relative;background:transparent;color:var(--gold-ink);border:1px solid var(--gold);overflow:hidden;z-index:0;
  box-shadow:var(--sh-soft)}
.btn--gilt::before{content:'';position:absolute;inset:0;background:var(--gold);transform:scaleX(0);
  transform-origin:left;transition:transform .32s var(--ease);z-index:-1}
.btn--gilt:hover::before{transform:scaleX(1)}
.btn--gilt:hover{color:var(--blue-950)}
.hero .btn--gilt{color:var(--gold-light);border-color:var(--gold-light)}
.hero .btn--gilt:hover{color:var(--blue-950)}

.hero{position:relative;background:linear-gradient(175deg,var(--blue-900) 0%,var(--blue-800) 55%,var(--blue-950) 100%);
  color:var(--on-blue);overflow:hidden;padding-block:var(--sp-10) var(--sp-9)}
.hero .plate{position:absolute;inset-inline-end:-6%;top:8%;width:56%;max-width:640px;opacity:.16;pointer-events:none}
.hero .wrap{position:relative;z-index:1}
.hero .rule{width:64px;height:1px;background:var(--gold);margin:var(--sp-5) 0;position:relative;overflow:hidden}
.hero .rule::after{content:'';position:absolute;inset-block:0;width:46px;
  background:linear-gradient(90deg,transparent,var(--gold-light) 45%,#fff 50%,var(--gold-light) 55%,transparent);
  transform:translateX(-140px);opacity:0;
  animation:light-travel 1.5s var(--ease) 1.05s 1 forwards}
@keyframes light-travel{0%{transform:translateX(-140px);opacity:0}
  12%{opacity:1} 88%{opacity:1} 100%{transform:translateX(140px);opacity:0}}
.hero h1{font-size:var(--fs-hero,clamp(2.75rem,5.4vw,4.75rem));line-height:1.1;color:var(--on-blue);max-width:16ch}
.hero .ar{font-family:var(--f-ar-display);direction:rtl;font-size:clamp(1.3rem,2.1vw,1.75rem);color:var(--gold-light);
  margin-top:var(--sp-4);max-width:24ch;line-height:1.5}
.hero .lead{color:var(--on-blue-soft);margin-top:var(--sp-5)}
.hero strong{color:var(--on-blue)}
.hero .ctas{display:flex;flex-wrap:wrap;gap:18px;margin-top:var(--sp-6)}
.hero .status{margin-top:var(--sp-8);padding-top:var(--sp-5);border-top:1px solid rgba(199,208,234,.22);
  display:flex;gap:14px;align-items:baseline;flex-wrap:wrap}
.hero .status .dot{width:7px;height:7px;border-radius:50%;background:var(--gold);flex-shrink:0;position:relative;top:-2px}
.hero .status p{margin:0;font-size:.9rem;color:var(--on-blue-soft);max-width:56ch}
.hero .status a{color:var(--gold-light);text-decoration:underline;text-underline-offset:3px}

.rv{opacity:0;transform:translateY(14px);transition:opacity var(--dur) var(--ease),transform var(--dur) var(--ease)}
.rv.in{opacity:1;transform:none}
.rv-draw{width:0;transition:width .9s var(--ease)}
.rv-draw.in{width:64px}

.section{padding-block:var(--sp-9)}
.section--cream{background:var(--cream)}
.section--ivory{background:var(--ivory)}
.section-head{max-width:760px;margin-bottom:var(--sp-7)}
.section-head h2{font-size:var(--fs-h1,clamp(2rem,3.4vw,3rem));margin-top:14px;line-height:1.15}
.section-head__lead{margin-top:16px}

.progrid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.progrid__card{position:relative;overflow:hidden;padding:38px 32px;display:flex;flex-direction:column;gap:18px;
  text-align:start;background:linear-gradient(165deg,var(--ivory) 0%,var(--cream) 100%);
  border:1px solid rgba(184,147,61,.22);border-radius:var(--r-card);box-shadow:var(--sh-soft);
  transition:transform .32s var(--ease),box-shadow .32s var(--ease),border-color .32s var(--ease)}
.progrid__card:hover{transform:translateY(-5px);box-shadow:var(--sh);border-color:var(--gold)}
.progrid__card::after{content:'';position:absolute;top:0;left:-60%;width:34%;height:100%;
  background:linear-gradient(115deg,transparent,rgba(255,255,255,.5),transparent);transform:skewX(-18deg);
  pointer-events:none;opacity:0}
.progrid__card:hover::after{animation:card-shine .9s var(--ease) forwards}
.progrid__badge{width:60px;height:60px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 35% 22%,#fffdf7,var(--cream) 78%);border:1.5px solid var(--gold);
  box-shadow:0 0 0 1px rgba(184,147,61,.14),0 3px 10px -4px rgba(140,106,34,.35)}
.progrid__badge .icon{width:26px;height:26px;color:var(--gold-ink)}
.progrid__card h3{font-size:1.3rem;display:flex;flex-direction:column;gap:5px;color:var(--blue-800);font-weight:500}
.progrid__card h3 .ar{font-family:var(--f-ar-display);color:var(--blue-700);font-size:1.05rem;direction:rtl;font-weight:400}
.progrid__card p{color:var(--ink-soft);font-size:.9375rem;line-height:1.65;margin:0}
.progrid__tags{display:flex;flex-wrap:wrap;gap:7px;list-style:none;margin:auto 0 0;padding:0}
.progrid__tags li{font-size:.6875rem;letter-spacing:.05em;text-transform:uppercase;font-weight:700;color:var(--blue-700);
  border:1px solid var(--hairline);background:var(--ivory);padding:6px 11px;border-radius:var(--r-pill)}
.progrid__foot{margin-top:var(--sp-6);padding:20px 26px;border:1px solid var(--hairline);border-radius:14px;
  background:var(--parchment);color:var(--ink-soft);font-size:.9375rem;display:flex;align-items:center;gap:14px}
.progrid__foot svg{width:22px;height:22px;color:var(--gold-ink);flex-shrink:0}
.progrid__foot strong{color:var(--blue-800)}
@media (max-width:1000px){ .progrid{grid-template-columns:1fr 1fr} }
@media (max-width:640px){ .progrid{grid-template-columns:1fr} }

.steps{border-top:1px solid var(--hairline);counter-reset:step}
.steps li{list-style:none;display:grid;grid-template-columns:64px 1fr;gap:28px;
  padding-block:34px;border-bottom:1px solid var(--hairline);position:relative;counter-increment:step}
.steps__n{width:52px;height:52px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;
  justify-content:center;background:radial-gradient(circle at 35% 22%,#fffdf7,var(--cream) 78%);
  border:1.5px solid var(--gold);font-family:var(--f-display);font-size:1.15rem;color:var(--blue-800);
  box-shadow:0 0 0 1px rgba(184,147,61,.14)}
.steps__n::before{content:counter(step)}
.steps h3{font-size:1.15rem;margin-bottom:8px}
.steps p{color:var(--ink-soft);margin:0;max-width:60ch}
@media (max-width:640px){ .steps li{grid-template-columns:44px 1fr;gap:18px}
  .steps__n{width:40px;height:40px;font-size:.9375rem} }

.placement{display:grid;grid-template-columns:1.1fr 1fr;gap:var(--sp-7);align-items:center}
.placement__card{position:relative;overflow:hidden;padding:36px;background:linear-gradient(165deg,var(--ivory),var(--cream));
  border:1px solid rgba(184,147,61,.22);border-radius:var(--r-card);box-shadow:var(--sh-soft)}
.placement__card h3{font-size:1.15rem;margin-bottom:14px;display:flex;align-items:center;gap:12px}
.placement__list{list-style:none;margin:0 0 22px;padding:0;display:flex;flex-direction:column;gap:12px}
.placement__list li{display:flex;gap:10px;color:var(--ink-soft);font-size:.9375rem}
.placement__list .icon{width:16px;height:16px;color:var(--gold-ink);flex-shrink:0;margin-top:3px}
@media (max-width:900px){ .placement{grid-template-columns:1fr} }

.callout{border:1px solid var(--hairline);border-inline-start:3px solid var(--gold);border-radius:14px;
  padding:28px 30px;background:var(--parchment)}
.callout__k{font-family:var(--f-ui);font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;
  color:var(--gold-ink);font-weight:700}
.callout p{margin:12px 0 0;color:var(--ink-soft)}
.callout p:first-of-type{margin-top:14px}
.callout__date{font-size:.8125rem;color:var(--ink-faint);margin-top:16px!important}

.pacegrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
.pacegrid__card{padding:28px 24px;background:linear-gradient(165deg,var(--ivory),var(--cream));
  border:1px solid rgba(184,147,61,.22);border-radius:var(--r-card);box-shadow:var(--sh-soft)}
.pacegrid__card h3{font-size:1.05rem;margin-bottom:6px}
.pacegrid__hrs{font-family:var(--f-display);font-size:1.5rem;color:var(--gold-ink);margin:0 0 10px}
.pacegrid__hrs span{font-family:var(--f-ui);font-size:.75rem;color:var(--ink-faint);font-weight:400}
.pacegrid__card p{color:var(--ink-soft);font-size:.875rem;margin:0}
@media (max-width:1000px){ .pacegrid{grid-template-columns:1fr 1fr} }
@media (max-width:560px){ .pacegrid{grid-template-columns:1fr} }

.whorow{display:flex;flex-wrap:wrap;gap:12px}
.whorow li{list-style:none;font-size:.9375rem;font-weight:600;color:var(--blue-800);
  border:1px solid var(--hairline);background:var(--ivory);padding:12px 22px;border-radius:var(--r-pill)}
.whorow__foot{margin-top:28px}
.placement__intro{margin-bottom:18px}
.placement__cta{width:100%}

.foot{background:var(--blue-950);color:var(--on-blue-soft);padding-block:0 var(--sp-6);
  border-top:2px solid var(--gold);position:relative}

.glance{padding-block:var(--sp-7);position:relative;overflow:hidden;
  background:radial-gradient(ellipse 90% 70% at 50% -10%,rgba(217,188,123,.10),transparent 60%),
    linear-gradient(180deg,var(--blue-900) 0%,var(--blue-950) 60%)}
.glance__label{font-family:var(--f-ui);font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;
  color:var(--gold-light);margin:0 0 var(--sp-5);font-weight:700;text-align:center;position:relative;z-index:1}
.glance__grid{display:flex;flex-wrap:wrap;gap:14px;position:relative;z-index:1}
.glance__grid a{position:relative;overflow:hidden;flex:1 1 128px;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:12px;padding:22px 8px;text-decoration:none;color:var(--on-blue-soft);text-align:center;
  background:linear-gradient(165deg,var(--blue-900) 0%,var(--blue-950) 100%);
  border:1px solid rgba(217,188,123,.2);border-radius:var(--r-card);
  box-shadow:0 12px 26px -14px rgba(0,0,0,.6);
  transition:transform .32s var(--ease),box-shadow .32s var(--ease),border-color .32s var(--ease),color .2s}
.glance__grid a:hover{transform:translateY(-4px);border-color:var(--gold);color:var(--gold-light);
  box-shadow:0 18px 34px -14px rgba(0,0,0,.65),0 0 0 1px rgba(184,147,61,.3)}
.glance__badge{width:44px;height:44px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(circle at 35% 22%,var(--blue-700),var(--blue-950) 78%);border:1.5px solid var(--gold);
  transition:border-color .32s var(--ease),transform .32s var(--ease)}
.glance__grid a:hover .glance__badge{border-color:var(--gold-light);transform:scale(1.06)}
.glance__grid .icon{width:18px;height:18px;color:var(--gold-light)}
.glance__grid span:last-child{font-size:.6875rem;letter-spacing:.03em;line-height:1.3}

.footcols{border-top:1px solid rgba(199,208,234,.18);padding-block:var(--sp-7)}
.footcols .grid{display:grid;grid-template-columns:1.3fr repeat(5,1fr);gap:var(--sp-6)}
.brandblock{display:flex;flex-direction:column;align-items:flex-start;gap:14px}
.brandblock .brand__seal{color:var(--blue-800);margin-bottom:2px}
.brandblock .word{font-family:var(--f-display);font-size:1.35rem;color:var(--on-blue)}
.brandblock .ar{font-family:var(--f-ar-display);direction:rtl;color:var(--gold-light);font-size:1.05rem}
.brandblock p{color:var(--on-blue-soft);font-size:.8125rem;max-width:30ch;line-height:1.6}
.foot h4{font-family:var(--f-ui);font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:var(--gold-light);
  margin:0 0 16px;font-weight:700}
.foot ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:11px}
.foot a{color:var(--on-blue-soft);text-decoration:none;font-size:.8438rem;transition:color .2s}
.foot a:hover{color:var(--gold-light)}

.footbar{border-top:1px solid rgba(199,208,234,.18);padding-top:var(--sp-5);display:flex;justify-content:space-between;
  gap:24px;flex-wrap:wrap;font-size:.8125rem;color:var(--on-blue-soft)}
.footbar .dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--gold);margin-inline-end:8px}

.footcols details{border-bottom:1px solid rgba(199,208,234,.14)}
.footcols summary{display:none}
@media (max-width:920px){
  .glance__grid{grid-template-columns:repeat(4,1fr)}
  .footcols .grid{grid-template-columns:1fr}
  .footcols summary{display:flex;justify-content:space-between;align-items:center;padding:16px 0;cursor:pointer;
    list-style:none;font-family:var(--f-ui);font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;
    color:var(--gold-light);font-weight:700}
  .footcols summary::-webkit-details-marker{display:none}
  .footcols summary::after{content:'+';font-size:1.1rem;color:var(--gold)}
  .footcols details[open] summary::after{content:'\\2013'}
  .footcols details ul{padding-bottom:16px}
  .brandblock{padding-bottom:20px;border-bottom:1px solid rgba(199,208,234,.14);margin-bottom:6px}
}
@media (max-width:560px){ .glance__grid{grid-template-columns:repeat(3,1fr)} }

@media (max-width:760px){
  .index__row{grid-template-columns:1fr}
  .index__n{font-size:2.2rem}
}

@media (prefers-reduced-motion:reduce){
  .rv,.rv-draw,.btn,.navgrid__row a,.header{transition:none!important}
  .rv{opacity:1!important;transform:none!important}
  .rv-draw{width:64px!important}
  .hero .rule::after,.navgrid__row a::after,.glance__grid a::after,.btn--primary::after,.navgrid::after{
    animation:none!important;display:none!important}
  .eyebrow .type{animation:none!important;width:auto!important;border-inline-end-color:var(--gold-light)!important}
}
`;

export const LEGAL_CSS = `
.legal{max-width:760px;margin-inline:auto}
.legal__meta{color:var(--ink-faint);font-size:.875rem;margin:10px 0 0}
.legal article{margin-top:var(--sp-6)}
.legal h2{font-size:1.5rem;margin-top:2.4em;margin-bottom:.6em}
.legal h2:first-child{margin-top:0}
.legal h3{font-size:1.1rem;margin-top:1.8em;margin-bottom:.5em;color:var(--blue-700)}
.legal p{color:var(--ink-soft);line-height:1.75;margin:0 0 1.1em}
.legal ul,.legal ol{color:var(--ink-soft);line-height:1.75;padding-inline-start:1.4em;margin:0 0 1.1em}
.legal li{margin-bottom:.5em}
.legal strong{color:var(--ink)}
.legal a{color:var(--blue-700);font-weight:700;text-decoration:underline}
.legal .callout{margin:1.6em 0}
`;

export const CHROME_SCRIPT = `
(function(){
  var header = document.querySelector('.header');
  if (header) {
    var onScroll = function(){ header.classList.toggle('scrolled', window.scrollY > 90); };
    window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
  }

  var drawer = document.getElementById('drawer');
  if (drawer) {
    var openBtns = document.querySelectorAll('[data-drawer-open]');
    var closeBtns = document.querySelectorAll('[data-drawer-close]');
    var setDrawer = function(open){
      drawer.setAttribute('data-open', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    openBtns.forEach(function(b){ b.addEventListener('click', function(){ setDrawer(true); }); });
    closeBtns.forEach(function(b){ b.addEventListener('click', function(){ setDrawer(false); }); });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && drawer.getAttribute('data-open') === 'true') setDrawer(false);
    });
  }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function(el){ el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.14, rootMargin:'0px 0px -8% 0px'});
    items.forEach(function(el){ io.observe(el); });
  }

  var plate = document.querySelector('.hero .plate');
  if (plate && !reduce) {
    var ticking = false;
    var onPlateScroll = function () {
      var y = Math.min(window.scrollY, 600);
      plate.style.transform = 'translateY(' + (y * 0.08) + 'px)';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(onPlateScroll); ticking = true; }
    }, { passive: true });
  }
})();
`;

export type Locale = "en" | "ar";
export type NavKey = "home" | "admissions" | "study" | "other";

const SEAL = `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 4 L24 44 M10 44 Q10 20 24 12 Q38 20 38 44" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="9" r="2.2" fill="currentColor"/></svg>`;

const T = {
  en: {
    dir: "ltr",
    email: "admissions@almadeenah.college",
    contactNumbers: "Contact numbers by region",
    readingSize: "Reading size",
    signIn: "Sign in",
    tag: "Founding phase · Fully distance-learning",
    beginPlacement: "Begin placement",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    searchAria: "Search the College",
    navInst: "The Institution",
    navAcademics: "Academics",
    navAdmissions: "Admissions",
    navStudy: "The Study",
    navCredentials: "Credentials",
    navNews: "News",
    navContact: "Contact",
    subSignIn: "Sign in to the Study",
    subPlacement: "Placement assessment",
    subVerify: "Verify a credential",
    subBible: "The Academic Bible",
    subContact: "Contact admissions",
    noticesText: "Notices — no active announcements yet",
    noticesLink: "View all →",
    brandWord: "Al-Madeenah",
    brandSmall: "International College",
    brandAr: "كلية المدينة العالمية للدراسات العربية والإسلامية",
    glanceLabel: "The institution, at a glance",
    footTagline:
      "A distance-learning college for Arabic language, Qur'an and the Islamic sciences — fixed standards, flexible pace.",
    footStatus:
      "Founding phase — no cohort has yet begun teaching.",
    copyright: "© Al-Madeenah International College for Arabic & Islamic Studies",
  },
  ar: {
    dir: "rtl",
    email: "admissions@almadeenah.college",
    contactNumbers: "أرقام التواصل حسب المنطقة",
    readingSize: "حجم القراءة",
    signIn: "تسجيل الدخول",
    tag: "مرحلة التأسيس · تعليم عن بُعد بالكامل",
    beginPlacement: "ابدأ التقييم",
    openMenu: "افتح القائمة",
    closeMenu: "أغلق القائمة",
    searchAria: "البحث في موقع الكلية",
    navInst: "المؤسسة",
    navAcademics: "البرامج الأكاديمية",
    navAdmissions: "القبول",
    navStudy: "الدراسة",
    navCredentials: "الشهادات",
    navNews: "الأخبار",
    navContact: "التواصل",
    subSignIn: "الدخول إلى الدراسة",
    subPlacement: "تقييم المستوى",
    subVerify: "تحقّق من شهادة",
    subBible: "الميثاق الأكاديمي",
    subContact: "تواصل مع القبول",
    noticesText: "الإعلانات — لا إعلانات فعّالة حاليًا",
    noticesLink: "عرض الكل ←",
    brandWord: "المدينة",
    brandSmall: "INTERNATIONAL COLLEGE",
    brandAr: "",
    glanceLabel: "الكلية في لمحة",
    footTagline:
      "كليةٌ للتعليم عن بُعد في اللغة العربية والقرآن الكريم والعلوم الإسلامية — معيارٌ ثابت، ووتيرة مرنة.",
    footStatus: "مرحلة التأسيس — لم يبدأ أي فوج دراسي التدريس بعد.",
    copyright: "© كلية المدينة العالمية للدراسات العربية والإسلامية",
  },
} as const;

function flip(locale: Locale) {
  return locale === "ar" ? " icon--flip" : "";
}

export function headerHtml(locale: Locale, current: NavKey, homeHref: string): string {
  const t = T[locale];
  const langSwitch =
    locale === "en"
      ? `<a href="/" aria-current="true">EN</a><a href="/ar/" lang="ar">العربية</a>`
      : `<a href="/ar/" aria-current="true">العربية</a><a href="/" lang="en" class="latin">EN</a>`;
  const arrow = locale === "ar" ? "←" : "→";

  return `
<header class="header">
  <div class="util">
    <div class="wrap">
      <div class="util__left">
        <a href="mailto:${t.email}"><svg class="icon"><use href="#ic-mail"/></svg>${t.email}</a>
        <a href="#"><svg class="icon"><use href="#ic-phone"/></svg>${t.contactNumbers}</a>
      </div>
      <div class="util__right">
        <a href="#" data-read-step><svg class="icon"><use href="#ic-type"/></svg><span>${t.readingSize}</span></a>
        <span aria-hidden="true">·</span>
        <div class="util__lang">${langSwitch}</div>
        <span aria-hidden="true">·</span>
        <a href="/study/"><svg class="icon${flip(locale)}"><use href="#ic-signin"/></svg><span>${t.signIn}</span></a>
      </div>
    </div>
  </div>

  <div class="identity">
    <div class="wrap">
      <a class="brand" href="${homeHref}">
        <span class="brand__seal">${SEAL}</span>
        <span class="word">${t.brandWord}<small${locale === "ar" ? ' class="latin"' : ""}>${t.brandSmall}</small></span>
      </a>
      <p class="identity__tag"><i></i>${t.tag}<i></i></p>
      <div class="identity__actions">
        <button class="iconbtn" aria-label="${t.searchAria}"><svg class="icon"><use href="#ic-search"/></svg></button>
        <a class="btn btn--gilt btn--sm" href="/admissions/">${t.beginPlacement}</a>
        <button class="navtoggle iconbtn" aria-label="${t.openMenu}" data-drawer-open><svg class="icon"><use href="#ic-menu"/></svg></button>
      </div>
    </div>
  </div>

  <nav class="navgrid" aria-label="Primary">
    <div class="wrap"><div class="navgrid__row">
      <a href="#"><span class="navgrid__badge"><svg class="icon"><use href="#ic-inst"/></svg></span><span>${t.navInst}</span></a>
      <a href="#"><span class="navgrid__badge"><svg class="icon"><use href="#ic-book"/></svg></span><span>${t.navAcademics}</span></a>
      <a href="/admissions/"${current === "admissions" ? ' aria-current="page"' : ""}><span class="navgrid__badge"><svg class="icon"><use href="#ic-doc"/></svg></span><span>${t.navAdmissions}</span></a>
      <a href="/study/"${current === "study" ? ' aria-current="page"' : ""}><span class="navgrid__badge"><svg class="icon${flip(locale)}"><use href="#ic-signin"/></svg></span><span>${t.navStudy}</span></a>
      <a href="#"><span class="navgrid__badge"><svg class="icon"><use href="#ic-ribbon"/></svg></span><span>${t.navCredentials}</span></a>
      <a href="#"><span class="navgrid__badge"><svg class="icon"><use href="#ic-bell"/></svg></span><span>${t.navNews}</span></a>
      <a href="#"><span class="navgrid__badge"><svg class="icon"><use href="#ic-mail"/></svg></span><span>${t.navContact}</span></a>
    </div></div>
  </nav>

  <div class="subnav">
    <div class="wrap">
      <a href="/study/" class="is-primary"><svg class="icon${flip(locale)}"><use href="#ic-signin"/></svg>${t.subSignIn}</a>
      <a href="/admissions/"><svg class="icon"><use href="#ic-target"/></svg>${t.subPlacement}</a>
      <a href="#"><svg class="icon"><use href="#ic-check"/></svg>${t.subVerify}</a>
      <a href="#"><svg class="icon"><use href="#ic-book"/></svg>${t.subBible}</a>
      <a href="mailto:${t.email}"><svg class="icon"><use href="#ic-mail"/></svg>${t.subContact}</a>
    </div>
  </div>

  <div class="notices">
    <div class="wrap">
      <div class="notices__l"><svg class="icon"><use href="#ic-bell"/></svg>${t.noticesText}</div>
      <a href="#">${t.noticesLink}</a>
    </div>
  </div>
</header>

<div class="drawer" id="drawer">
  <div class="drawer__top">
    <a class="brand" href="${homeHref}"><span class="brand__seal">${SEAL}</span><span class="word">${t.brandWord}</span></a>
    <button class="drawer__close" aria-label="${t.closeMenu}" data-drawer-close><svg class="icon"><use href="#ic-close"/></svg></button>
  </div>
  <div class="drawer__actions">
    <a href="/study/" class="is-primary">${t.subSignIn}<span>${arrow}</span></a>
    <a href="/admissions/">${t.subPlacement}<span>${arrow}</span></a>
    <a href="#">${t.subVerify}<span>${arrow}</span></a>
  </div>
  <nav class="drawer__grid" aria-label="Primary">
    <a href="#"><span class="drawer__badge"><svg class="icon"><use href="#ic-inst"/></svg></span>${t.navInst}</a>
    <a href="#"><span class="drawer__badge"><svg class="icon"><use href="#ic-book"/></svg></span>${t.navAcademics}</a>
    <a href="/admissions/"><span class="drawer__badge"><svg class="icon"><use href="#ic-doc"/></svg></span>${t.navAdmissions}</a>
    <a href="/study/"><span class="drawer__badge"><svg class="icon${flip(locale)}"><use href="#ic-signin"/></svg></span>${t.navStudy}</a>
    <a href="#"><span class="drawer__badge"><svg class="icon"><use href="#ic-ribbon"/></svg></span>${t.navCredentials}</a>
    <a href="#"><span class="drawer__badge"><svg class="icon"><use href="#ic-bell"/></svg></span>${t.navNews}</a>
    <a href="#"><span class="drawer__badge"><svg class="icon"><use href="#ic-mail"/></svg></span>${t.navContact}</a>
  </nav>
  <div class="drawer__util">
    <span>${t.readingSize} · ${locale === "en" ? `<a href="/">EN</a> / <a href="/ar/">العربية</a>` : `<a href="/ar/">العربية</a> / <a href="/">EN</a>`}</span>
    <span>${locale === "en" ? "Founding phase" : "مرحلة التأسيس"}</span>
  </div>
</div>`;
}

export function footerHtml(locale: Locale): string {
  const t = T[locale];
  const en = locale === "en";
  const arSpan = t.brandAr
    ? `<span class="ar" lang="ar">${t.brandAr}</span>`
    : `<span class="latin brandblock__en">Al-Madeenah International College</span>`;

  const glance = en
    ? [
        ["#", "ic-scale", "Governance"],
        ["#", "ic-book", "Faculty of Arabic"],
        ["#", "ic-scroll", "Faculty of Qur'an"],
        ["#", "ic-scale", "Islamic Sciences"],
        ["#", "ic-brief", "Professional Programmes"],
        ["/admissions/", "ic-target", "Placement Assessment"],
        ["/admissions/", "ic-doc", "Admissions"],
        ["/register/", "ic-check", "Register (16+)"],
        ["#", "ic-coin", "Fees &amp; Scholarships"],
        ["/study/", "ic-signin", "Sign in to the Study"],
        ["#", "ic-ribbon", "Award Ladder"],
        ["#", "ic-check", "Verify a Credential"],
        ["/safeguarding/", "ic-shield", "Safeguarding"],
        ["/privacy/", "ic-lock", "Privacy &amp; Data"],
        ["/terms/", "ic-doc", "Terms"],
        ["#", "ic-mail", "Contact"],
      ]
    : [
        ["#", "ic-scale", "الحوكمة"],
        ["#", "ic-book", "كلية اللغة العربية"],
        ["#", "ic-scroll", "كلية القرآن"],
        ["#", "ic-scale", "العلوم الشرعية"],
        ["#", "ic-brief", "البرامج المهنية"],
        ["/admissions/", "ic-target", "تقييم المستوى"],
        ["/admissions/", "ic-doc", "القبول"],
        ["/register/", "ic-check", "التسجيل (١٦+)"],
        ["#", "ic-coin", "الرسوم والمنح"],
        ["/study/", "ic-signin", "الدخول إلى الدراسة"],
        ["#", "ic-ribbon", "سلّم الشهادات"],
        ["#", "ic-check", "تحقّق من شهادة"],
        ["/safeguarding/", "ic-shield", "الحماية والسلامة"],
        ["/privacy/", "ic-lock", "الخصوصية والبيانات"],
        ["/terms/", "ic-doc", "الشروط"],
        ["#", "ic-mail", "التواصل"],
      ];

  const glanceHtml = glance
    .map(
      ([href, icon, label]) =>
        `<a href="${href}"><span class="glance__badge"><svg class="icon${
          icon === "ic-signin" ? flip(locale) : ""
        }"><use href="#${icon}"/></svg></span><span>${label}</span></a>`
    )
    .join("\n        ");

  const cols = en
    ? [
        {
          summary: "Institution",
          items: [
            ["#", "About"],
            ["#", "Governance"],
            ["#", "The Academic &amp; Editorial Bible"],
            ["#", "Honesty &amp; status register"],
            ["/safeguarding/", "Safeguarding"],
            ["#", "Teach with us"],
          ],
        },
        {
          summary: "Academics",
          items: [
            ["#", "Faculty of Arabic"],
            ["#", "Faculty of Qur'an"],
            ["#", "Faculty of Islamic Sciences"],
            ["#", "Professional &amp; Specialist Programmes"],
            ["#", "The Itqān method"],
          ],
        },
        {
          summary: "Admissions &amp; Study",
          items: [
            ["/admissions/", "The journey"],
            ["/admissions/", "Placement assessment"],
            ["/register/", "Apply / Register (16+)"],
            ["#", "Fees &amp; scholarships"],
            ["/study/", "Sign in to the Study"],
          ],
        },
        {
          summary: "Credentials &amp; Policies",
          items: [
            ["#", "The award ladder"],
            ["#", "Verify a credential"],
            ["/privacy/", "Privacy notice"],
            ["/terms/", "Terms"],
            ["/safeguarding/", "Safeguarding policy"],
          ],
        },
        {
          summary: "Contact",
          items: [
            ["mailto:admissions.almadeenah@agentmail.to", "Admissions enquiries"],
            ["mailto:admissions.almadeenah@agentmail.to", "General contact"],
            ["#", "Teach with us"],
            ["#", "Press enquiries"],
          ],
        },
      ]
    : [
        {
          summary: "المؤسسة",
          items: [
            ["#", "عن الكلية"],
            ["#", "الحوكمة"],
            ["#", "الميثاق الأكاديمي والتحريري"],
            ["#", "سجل الشفافية والوضع المؤسسي"],
            ["/safeguarding/", "الحماية والسلامة"],
            ["#", "انضمّ كمعلّم"],
          ],
        },
        {
          summary: "البرامج الأكاديمية",
          items: [
            ["#", "كلية اللغة العربية"],
            ["#", "كلية القرآن"],
            ["#", "كلية العلوم الشرعية"],
            ["#", "البرامج المهنية والتخصصية"],
            ["#", "منهج الإتقان"],
          ],
        },
        {
          summary: "القبول والدراسة",
          items: [
            ["/admissions/", "رحلة الطالب"],
            ["/admissions/", "تقييم المستوى"],
            ["/register/", "التقديم / التسجيل (١٦+)"],
            ["#", "الرسوم والمنح"],
            ["/study/", "الدخول إلى الدراسة"],
          ],
        },
        {
          summary: "الشهادات والسياسات",
          items: [
            ["#", "سلّم الشهادات"],
            ["#", "تحقّق من شهادة"],
            ["/privacy/", "سياسة الخصوصية"],
            ["/terms/", "الشروط"],
            ["/safeguarding/", "سياسة الحماية والسلامة"],
          ],
        },
        {
          summary: "التواصل",
          items: [
            ["mailto:admissions.almadeenah@agentmail.to", "استفسارات القبول"],
            ["mailto:admissions.almadeenah@agentmail.to", "تواصل عام"],
            ["#", "انضمّ كمعلّم"],
            ["#", "استفسارات إعلامية"],
          ],
        },
      ];

  const colsHtml = cols
    .map(
      (c) =>
        `<details class="rv" open><summary>${c.summary}</summary><ul>${c.items
          .map(([href, label]) => `<li><a href="${href}">${label}</a></li>`)
          .join("")}</ul></details>`
    )
    .join("\n      ");

  return `
<footer class="foot">
  <div class="glance">
    <div class="wrap">
      <p class="glance__label">${t.glanceLabel}</p>
      <nav class="glance__grid" aria-label="All destinations">
        ${glanceHtml}
      </nav>
    </div>
  </div>

  <div class="footcols">
    <div class="wrap grid">
      <div class="brandblock rv">
        <span class="brand__seal">${SEAL}</span>
        <span class="word">${t.brandWord}</span>
        ${arSpan}
        <p>${t.footTagline}</p>
      </div>
      ${colsHtml}
    </div>
  </div>

  <div class="wrap">
    <div class="footbar">
      <span><span class="dot"></span>${t.footStatus}</span>
      <span>${t.copyright}</span>
    </div>
  </div>
</footer>`;
}

// --- Database ---
let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes("sslmode=disable")
        ? undefined
        : { rejectUnauthorized: false },
    });
  }
  return pool;
}

let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = getPool()
      .query(
        `CREATE EXTENSION IF NOT EXISTS pgcrypto;
         CREATE TABLE IF NOT EXISTS registrants (
           id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
           full_name        TEXT NOT NULL,
           email            TEXT NOT NULL UNIQUE,
           password_hash    TEXT NOT NULL,
           date_of_birth    DATE NOT NULL,
           country          TEXT NOT NULL,
           preferred_pace   TEXT NOT NULL CHECK (preferred_pace IN ('Flexible', 'Regular', 'Intensive', 'Accelerated')),
           created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
         );
         CREATE INDEX IF NOT EXISTS registrants_email_idx ON registrants (email);
         CREATE INDEX IF NOT EXISTS registrants_created_at_idx ON registrants (created_at);`
      )
      .then(() => undefined)
      .catch((err) => {
        schemaReady = null;
        throw err;
      });
  }
  return schemaReady;
}

// --- AgentMail ---
const AGENTMAIL_BASE = "https://api.agentmail.to/v0";
const SENDING_INBOX = "admissions.almadeenah@agentmail.to";

export class AgentMailError extends Error {}

export async function sendMail(opts: {
  to: string[];
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const apiKey = process.env.AGENTMAIL_API_KEY;
  if (!apiKey) {
    throw new AgentMailError("AGENTMAIL_API_KEY is not set — email was not sent.");
  }

  const res = await fetch(
    `${AGENTMAIL_BASE}/inboxes/${encodeURIComponent(SENDING_INBOX)}/messages/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        to: opts.to,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new AgentMailError(`AgentMail send failed: ${res.status} ${res.statusText} ${body}`);
  }
}
