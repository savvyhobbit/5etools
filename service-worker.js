if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return o[e]||(s=new Promise(async s=>{if("document"in self){const o=document.createElement("script");o.src=e,document.head.appendChild(o),o.onload=s}else importScripts(e),s()})),s.then(()=>{if(!o[e])throw new Error(`Module ${e} didn’t register its module`);return o[e]})},s=(s,o)=>{Promise.all(s.map(e)).then(e=>o(1===e.length?e[0]:e))},o={require:Promise.resolve(s)};self.define=(s,a,l)=>{o[s]||(o[s]=Promise.resolve().then(()=>{let o={};const d={uri:location.origin+s.slice(1)};return Promise.all(a.map(s=>{switch(s){case"exports":return o;case"module":return d;default:return e(s)}})).then(e=>{const s=l(...e);return o.default||(o.default=s),o})}))}}define("./service-worker.js",["./workbox-b4c2a21b"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/5etools/0.bundle.js",revision:"54820570bbe306fba97c52cfba6a9817"},{url:"/5etools/1.bundle.js",revision:"621ddaeb6eab9f1ee7541946b94a6f53"},{url:"/5etools/11.bundle.js",revision:"7f5248d8211f3518a49fd690910c254a"},{url:"/5etools/12.bundle.js",revision:"166450f74e59567cc9fa135ce033b83d"},{url:"/5etools/13.bundle.js",revision:"6b1276ddd503073755acb0c19a2cc5b6"},{url:"/5etools/14.bundle.js",revision:"cd5b13a86141862c1c928ec941a7b5fb"},{url:"/5etools/15.bundle.js",revision:"cfead1008afb9ddefed60617542c0372"},{url:"/5etools/16.bundle.js",revision:"0dbd6f735ec1960031808f0e4c6638cf"},{url:"/5etools/17.bundle.js",revision:"26c1cf1355788a5bcdc2c4bb7b73187b"},{url:"/5etools/18.bundle.js",revision:"aebe7909c84f8481a11c4d8b6e54dc6f"},{url:"/5etools/19.bundle.js",revision:"94f6878ef8f3562b4dba0bd5abc365fb"},{url:"/5etools/2.bundle.js",revision:"a7eb67d3bde7765e8031fafcc37b9a31"},{url:"/5etools/3.bundle.js",revision:"34fba714f9ed43a5208d1e74d629a2df"},{url:"/5etools/4.bundle.js",revision:"4cf00fe6860b96b7f4918a9bc21b942d"},{url:"/5etools/5.bundle.js",revision:"63e85b466097e74c7e04716cd4631b6c"},{url:"/5etools/6.bundle.js",revision:"71bca1e5303b7e66b45728a7e9a8878f"},{url:"/5etools/7.bundle.js",revision:"ab284bc59ea3427ebab3abaaaf6635df"},{url:"/5etools/8.bundle.js",revision:"cd6a8c9c5c38e91afe79f64d1f1cacd7"},{url:"/5etools/9.bundle.js",revision:"0b1df0fc76d6d8f8ced06d7e672d1018"},{url:"/5etools/data/backgrounds.json",revision:"bcba449e6d4d9fbde8bb175f14ca74fc"},{url:"/5etools/data/basicitems.json",revision:"168651a4275c914ea4c9d61bd1903fe2"},{url:"/5etools/data/choices.js",revision:"751debd07d4d9686fbc85dfc4637f1cf"},{url:"/5etools/data/conditions.json",revision:"6afd0c28969c88d52b909b48614ecc8e"},{url:"/5etools/data/cults.json",revision:"784409e3ea77a18f263b0e0d55cec45f"},{url:"/5etools/data/feats.json",revision:"e7719aa816fadea38a5972ed910e0154"},{url:"/5etools/data/features.json",revision:"6d709ffaf43336d5422e456a6cf708d4"},{url:"/5etools/data/items.json",revision:"0dd2c892764366664be2677180e06cf4"},{url:"/5etools/data/legendarygroups.json",revision:"51ce9d4c3464c99ef5a7044da9ae43ee"},{url:"/5etools/data/magicvariants.json",revision:"9ff0aab3faba843d1b7a757937a8ae25"},{url:"/5etools/data/newClasses/class-artificer.json",revision:"6af7b051a9bb8d36ea2afc521a26d0ed"},{url:"/5etools/data/newClasses/class-barbarian.json",revision:"b1bcf9417f7e760c937fbc5c28351182"},{url:"/5etools/data/newClasses/class-bard.json",revision:"9dec68a8ded68391c62d95d4cdb04bc4"},{url:"/5etools/data/newClasses/class-cleric.json",revision:"65675badc8e68a1f79619e0ef3cc4910"},{url:"/5etools/data/newClasses/class-druid.json",revision:"01a4b1b97299727da381e2322a756543"},{url:"/5etools/data/newClasses/class-fighter.json",revision:"15a980b3375d8028f93b4aa82b40f984"},{url:"/5etools/data/newClasses/class-generic.json",revision:"987efbc13d39a7f6a5c4b04c57b9000b"},{url:"/5etools/data/newClasses/class-monk.json",revision:"fe6905d893f235d7f5a8d71d98b9c5ff"},{url:"/5etools/data/newClasses/class-mystic.json",revision:"40c56040c0ed637ea35e158ad7c0d0fe"},{url:"/5etools/data/newClasses/class-paladin.json",revision:"39de393654b0e72798eb701f6449d56f"},{url:"/5etools/data/newClasses/class-pirate.json",revision:"8f9075010cc091b0d2ac77f21d90d8c0"},{url:"/5etools/data/newClasses/class-ranger.json",revision:"98d13bbfecd0cdac808b8f07a568e6c5"},{url:"/5etools/data/newClasses/class-rogue.json",revision:"acbeceff896039f33d835a592876e904"},{url:"/5etools/data/newClasses/class-rune-scribe.json",revision:"cf45658cc1e4dff8c079ad57d350d48a"},{url:"/5etools/data/newClasses/class-sidekick.json",revision:"a8821714713cc5df588870ca0bda7ff1"},{url:"/5etools/data/newClasses/class-sorcerer.json",revision:"2cef25313e513f83b54cc94cfdad4b48"},{url:"/5etools/data/newClasses/class-warlock.json",revision:"1a45098e2efe09bf6e3c8079c694dcb5"},{url:"/5etools/data/newClasses/class-wizard.json",revision:"0d8b52e8eeede711cac2132387ead81a"},{url:"/5etools/data/newClasses/index.json",revision:"44d6c42226154e8674cee5e4fe252bb8"},{url:"/5etools/data/psionics.json",revision:"d4d3983309dce6690814d09650cdb4f9"},{url:"/5etools/data/races.json",revision:"8b857b5e5c75bd76243224430a08931f"},{url:"/5etools/data/rewards.json",revision:"e1502186046faf2c6a462a7d307f4764"},{url:"/5etools/data/rules.json",revision:"74c11bb0e2a1b2735b4bbf124b6c7892"},{url:"/5etools/data/spells/index.json",revision:"d7f673db419b3ced1fd7b52cf0dfb0e5"},{url:"/5etools/data/spells/spells-ai.json",revision:"69a593bcf522fc8cdd881efce744abda"},{url:"/5etools/data/spells/spells-aitfr-avt.json",revision:"432f41d81e4de6637ee3828b421a67b3"},{url:"/5etools/data/spells/spells-egw.json",revision:"287f148cb6db3813515e2043e167ae13"},{url:"/5etools/data/spells/spells-ftd.json",revision:"7d7b06619947f586383a6ac021e461f1"},{url:"/5etools/data/spells/spells-ggr.json",revision:"fc871a801a3376a747d80a30012b3268"},{url:"/5etools/data/spells/spells-idrotf.json",revision:"2943dc5fce91797e7130625ce8c0478f"},{url:"/5etools/data/spells/spells-llk.json",revision:"3942d38e874e2da850d3a198d6d5ea42"},{url:"/5etools/data/spells/spells-phb.json",revision:"adde88674443cc374d384a5cddeef036"},{url:"/5etools/data/spells/spells-scag.json",revision:"b4e2fbcb5ecd42163db644031102d0eb"},{url:"/5etools/data/spells/spells-stream.json",revision:"d1531c58190839b8399212324e681b02"},{url:"/5etools/data/spells/spells-tce.json",revision:"0b181c3c8858d4aa6cfc54dee4689bc0"},{url:"/5etools/data/spells/spells-ua-2020por.json",revision:"71bb49305c47dc8d6d3abf17c3bc8ba0"},{url:"/5etools/data/spells/spells-ua-2020smt.json",revision:"0f6c936436d1ba9dffaad5edea73b3a8"},{url:"/5etools/data/spells/spells-ua-2021do.json",revision:"79c124c9cab0635c3b78d75d05488dbe"},{url:"/5etools/data/spells/spells-ua-ar.json",revision:"cd9ed9ce80bfe8263188b194b204e2ab"},{url:"/5etools/data/spells/spells-ua-frw.json",revision:"eed0525923e4129505f0f1d8cb0234bc"},{url:"/5etools/data/spells/spells-ua-mm.json",revision:"9a829a1786cf830dbc2b8c1499e34c04"},{url:"/5etools/data/spells/spells-ua-saw.json",revision:"7b2259befc037954d1421219039433b7"},{url:"/5etools/data/spells/spells-ua-ss.json",revision:"1a6a292d4ff9dd189a4d0a1354adf352"},{url:"/5etools/data/spells/spells-ua-tobm.json",revision:"723f4cd5ea062b1185806fc9c4861bbd"},{url:"/5etools/data/spells/spells-xge.json",revision:"266196a33bed0a8210fbe080377fa7a8"},{url:"/5etools/data/variantrules.json",revision:"c0d0ee6cd56dead6b8a2df246873a6c1"},{url:"/5etools/favicon.ico",revision:"0410ac12516c73b5d2113ecb6d8e82fc"},{url:"/5etools/fonts/MaterialIcons-Regular.ttf",revision:"a37b0c01c0baf1888ca812cc0508f6e2"},{url:"/5etools/fonts/MaterialIcons-Regular.woff",revision:"012cf6a10129e2275d79d6adac7f3b02"},{url:"/5etools/fonts/MaterialIcons-Regular.woff2",revision:"570eb83859dc23dd0eec423a49e147fe"},{url:"/5etools/fonts/fa-brands-400.eot",revision:"2e45aa3fbc16f59a11849c3de08b2d70"},{url:"/5etools/fonts/fa-brands-400.svg",revision:"b85c148cc8390d62b0b9c9e743fe293f"},{url:"/5etools/fonts/fa-brands-400.ttf",revision:"0f1d490f450771ccd93c68c81fd25d2d"},{url:"/5etools/fonts/fa-brands-400.woff",revision:"73fb2ac5fbb5bd77b6874904ec7ec949"},{url:"/5etools/fonts/fa-brands-400.woff2",revision:"983d5f613da1fe0aebda986a7cc4d091"},{url:"/5etools/fonts/fa-light-300.eot",revision:"12f8d0eeba4504e025f30e4bf6326cd6"},{url:"/5etools/fonts/fa-light-300.svg",revision:"a53e2e1deb2df9bf484c1ea6291cb120"},{url:"/5etools/fonts/fa-light-300.ttf",revision:"da5526bf0f7fae09080945b15da77066"},{url:"/5etools/fonts/fa-light-300.woff",revision:"83c52b7102d3b3586554677f947792e7"},{url:"/5etools/fonts/fa-light-300.woff2",revision:"1d4e499e402761b86c26b5fa3ad51c30"},{url:"/5etools/fonts/fa-regular-400.eot",revision:"cdff9c2c9dab6c9aabd7c3da65b7c8d3"},{url:"/5etools/fonts/fa-regular-400.svg",revision:"25f201e551ca74e4846a50125416029c"},{url:"/5etools/fonts/fa-regular-400.ttf",revision:"4bf83cd68a11908a738f3b0c9640e4df"},{url:"/5etools/fonts/fa-regular-400.woff",revision:"7a9d78e9abadc2e97e5f48226e8ad829"},{url:"/5etools/fonts/fa-regular-400.woff2",revision:"751ce4031742c06c5b4ab34d00d16bd4"},{url:"/5etools/fonts/fa-solid-900.eot",revision:"f960deb9deac0887dd0d1a63a5383d93"},{url:"/5etools/fonts/fa-solid-900.svg",revision:"a2506b776dd7b96599faeaa3fbc2a3af"},{url:"/5etools/fonts/fa-solid-900.ttf",revision:"a5b659740171febe765cc5c2dbd4dd00"},{url:"/5etools/fonts/fa-solid-900.woff",revision:"f4e059be1b950e36ae69150aba13a2ad"},{url:"/5etools/fonts/fa-solid-900.woff2",revision:"6832e004c9705a8332676bcd85c4138c"},{url:"/5etools/img/android-chrome-192x192.png",revision:"be4c0728c703a538fb126893b628ccd7"},{url:"/5etools/img/android-chrome-512x512.png",revision:"eeb392253dca9a14d0b6059e39eda40d"},{url:"/5etools/img/apple-touch-icon.png",revision:"857576c68505885d2855fb6513bee130"},{url:"/5etools/img/favicon-16x16.png",revision:"c580ba205c94c7b2e19edf5feb286018"},{url:"/5etools/img/favicon-32x32.png",revision:"1ce713bb2f1c6bd34f61cfb3373cffe0"},{url:"/5etools/img/favicon.ico",revision:"0410ac12516c73b5d2113ecb6d8e82fc"},{url:"/5etools/img/logo-white-192x192.png",revision:"de037ebe3d00877d460c1d93936f29ef"},{url:"/5etools/index.bundle.js",revision:"216cd56ba855080f42f7e6a1c33ff3ec"},{url:"/5etools/index.html",revision:"ea7c631d2fc4ea5f280a29e20c7656ac"},{url:"/5etools/manifest.json",revision:"327324c87dc1e6cd42339625c4bfdd39"},{url:"/5etools/node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd.js",revision:"f7cb095eed03f56d081c752d543b80d4"}],{})}));
//# sourceMappingURL=service-worker.js.map
