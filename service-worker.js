if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return o[e]||(s=new Promise(async s=>{if("document"in self){const o=document.createElement("script");o.src=e,document.head.appendChild(o),o.onload=s}else importScripts(e),s()})),s.then(()=>{if(!o[e])throw new Error(`Module ${e} didn’t register its module`);return o[e]})},s=(s,o)=>{Promise.all(s.map(e)).then(e=>o(1===e.length?e[0]:e))},o={require:Promise.resolve(s)};self.define=(s,a,l)=>{o[s]||(o[s]=Promise.resolve().then(()=>{let o={};const d={uri:location.origin+s.slice(1)};return Promise.all(a.map(s=>{switch(s){case"exports":return o;case"module":return d;default:return e(s)}})).then(e=>{const s=l(...e);return o.default||(o.default=s),o})}))}}define("./service-worker.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/5etools/0.bundle.js",revision:"837331d8dcd686fa327e2e1fcde5cfb3"},{url:"/5etools/1.bundle.js",revision:"613a48c745990bdd85b0f767637e515c"},{url:"/5etools/10.bundle.js",revision:"4953ca85ab0cb672f08bf8a3a6ec0d87"},{url:"/5etools/12.bundle.js",revision:"a44b67739cb7e0a933686c501afa699a"},{url:"/5etools/13.bundle.js",revision:"36212c818a649b149627fe1ed7425634"},{url:"/5etools/14.bundle.js",revision:"42c8df04803f03c2f6ed3d613ae5a142"},{url:"/5etools/15.bundle.js",revision:"dc324f2640b8a2972caca6de84010872"},{url:"/5etools/16.bundle.js",revision:"caa9afcbb23c1dd4ad4ff69e10e5f2a9"},{url:"/5etools/17.bundle.js",revision:"dc3aebf6fe267c6a28aa6cbdfa3761ae"},{url:"/5etools/18.bundle.js",revision:"1cf8b12cb3369993bd1f04412aa04b00"},{url:"/5etools/19.bundle.js",revision:"aa2f87a6d55118772ad336dd532b03e8"},{url:"/5etools/2.bundle.js",revision:"fb6d5c16c18692281422490d2d05c57e"},{url:"/5etools/20.bundle.js",revision:"3c5b87f62118663ec3d3474812855db4"},{url:"/5etools/21.bundle.js",revision:"6a9a4f79e734473ce7bb5f3ac4a0e87d"},{url:"/5etools/22.bundle.js",revision:"582a7d6cccd30c7ce47dc2cbda50a538"},{url:"/5etools/23.bundle.js",revision:"2e43a5a1f804da899732949a4f45545d"},{url:"/5etools/24.bundle.js",revision:"bf3415d0b64da0516e8b3728837080c2"},{url:"/5etools/25.bundle.js",revision:"b36566dbb50f2d3419e1f8879b064ae8"},{url:"/5etools/26.bundle.js",revision:"a062015d89399d89cba44479bd8cc65c"},{url:"/5etools/27.bundle.js",revision:"49af2e8b4cb51f38a2532a5d96f07ce1"},{url:"/5etools/28.bundle.js",revision:"f6e28e0c854eca7f16695c58ac5c5b8f"},{url:"/5etools/29.bundle.js",revision:"33cc62d7cb2537ec5a900cded4d628f2"},{url:"/5etools/3.bundle.js",revision:"8433592085e06eca25c108d57405cb2b"},{url:"/5etools/4.bundle.js",revision:"8991254009287abcbac972a556a17e8b"},{url:"/5etools/5.bundle.js",revision:"dfd195fb975dc38ff7e7fd0c7b5c1985"},{url:"/5etools/6.bundle.js",revision:"2a2aa6e57780258ae8fdb48b66cd1f79"},{url:"/5etools/7.bundle.js",revision:"8768871cb1a1150e44e782dd7533304a"},{url:"/5etools/8.bundle.js",revision:"3ed758728bd04d58a1ebe0d9abd050f4"},{url:"/5etools/9.bundle.js",revision:"921bbd18ec453cce58edbc8935c74572"},{url:"/5etools/data/backgrounds.json",revision:"820a6f456399efe960aeab43d959a4ba"},{url:"/5etools/data/basicitems.json",revision:"15d8b9dd4bf68c0d1aefba00ba020e48"},{url:"/5etools/data/choices.js",revision:"29da0cdac8c664cec6ee33da4db39331"},{url:"/5etools/data/classes/artificer.json",revision:"f120a78d2f3c6e03b13d2caa01fa3650"},{url:"/5etools/data/classes/barbarian.json",revision:"82031fa73734fe685e205892d5d414e3"},{url:"/5etools/data/classes/bard.json",revision:"41508c2c797e076ea504c93941b042fe"},{url:"/5etools/data/classes/cleric.json",revision:"d46621f402c113e8e987ac8d7691302f"},{url:"/5etools/data/classes/druid.json",revision:"fda549d7ac93453963db58624e2f4276"},{url:"/5etools/data/classes/fighter.json",revision:"b3497f5236c865012b1a81482e413ee7"},{url:"/5etools/data/classes/index.json",revision:"abb3d74bad7c604db80258f19172e2c7"},{url:"/5etools/data/classes/monk.json",revision:"63e6ceb141d28d47cf352e74600ac45b"},{url:"/5etools/data/classes/mystic.json",revision:"7f4936b0863c9076e091650478482019"},{url:"/5etools/data/classes/paladin.json",revision:"f3c1e7fc329bec0eb99a25d47acb64b3"},{url:"/5etools/data/classes/pirate.json",revision:"3d6aa1caaa4c26f52d5890ad1215b3bf"},{url:"/5etools/data/classes/ranger.json",revision:"b9adc917a6098a91a68641a0da639087"},{url:"/5etools/data/classes/rogue.json",revision:"da6616eb2a807c91df71373dd9643c77"},{url:"/5etools/data/classes/sidekick.json",revision:"b5a3e340b41b79325ab6352f47579c5d"},{url:"/5etools/data/classes/sorcerer.json",revision:"69d08048aa41707f844a2427b3e7bbcc"},{url:"/5etools/data/classes/warlock.json",revision:"7340dd1b51aa286e28894e788b82fc6b"},{url:"/5etools/data/classes/wizard.json",revision:"8a3247a9bd5ef71d3d168aebf705911c"},{url:"/5etools/data/conditions.json",revision:"6afd0c28969c88d52b909b48614ecc8e"},{url:"/5etools/data/cults.json",revision:"784409e3ea77a18f263b0e0d55cec45f"},{url:"/5etools/data/feats.json",revision:"9967a346cf5b9cd13edadab233c1bd6a"},{url:"/5etools/data/features.json",revision:"1835cbe62a4e8c8ac03ecfdaa9fdefae"},{url:"/5etools/data/items.json",revision:"24d438e3c50c8df3f6bf2a67d023b2b2"},{url:"/5etools/data/legendarygroups.json",revision:"51ce9d4c3464c99ef5a7044da9ae43ee"},{url:"/5etools/data/magicvariants.json",revision:"fce713481043f969f81d3f0633b2feef"},{url:"/5etools/data/psionics.json",revision:"d4d3983309dce6690814d09650cdb4f9"},{url:"/5etools/data/races.json",revision:"4bd6042ffeb5a20e2549329d11113615"},{url:"/5etools/data/rewards.json",revision:"e1502186046faf2c6a462a7d307f4764"},{url:"/5etools/data/rules.json",revision:"bd0eb7c4f5abeeb26fff70ba40de4715"},{url:"/5etools/data/spells/index.json",revision:"e2d320d2cb613e8c25bf648f73d8beda"},{url:"/5etools/data/spells/spells-ai.json",revision:"2d587d6c98023603f39eda454ab15e91"},{url:"/5etools/data/spells/spells-egw.json",revision:"188a72e6a6de31449225ea734f122afb"},{url:"/5etools/data/spells/spells-ggr.json",revision:"427f6bfd44a859ef4e14918e202c3e2f"},{url:"/5etools/data/spells/spells-llk.json",revision:"427f6bfd44a859ef4e14918e202c3e2f"},{url:"/5etools/data/spells/spells-phb.json",revision:"31576bc0943585b323a5087e79e92a0a"},{url:"/5etools/data/spells/spells-scag.json",revision:"b4e2fbcb5ecd42163db644031102d0eb"},{url:"/5etools/data/spells/spells-stream.json",revision:"325c882960a827949572d3a4de9f1f07"},{url:"/5etools/data/spells/spells-ua-2020por.json",revision:"dbb7bd0ead60172b02f1cbd803fbf5a5"},{url:"/5etools/data/spells/spells-ua-2020smt.json",revision:"a0826ac9ed50dc7d2282b48a5a5d0c40"},{url:"/5etools/data/spells/spells-ua-ar.json",revision:"82368a54d661178cb88d524ee29bb6b1"},{url:"/5etools/data/spells/spells-ua-frw.json",revision:"8dedb5b6f12a9bd43d2d075be5a1638b"},{url:"/5etools/data/spells/spells-ua-mm.json",revision:"6c9bf8abb3f5eded9a90cf520cc8addb"},{url:"/5etools/data/spells/spells-ua-saw.json",revision:"aa10f5eb3b1d74e89f5fc5142c5b8cd0"},{url:"/5etools/data/spells/spells-ua-ss.json",revision:"20a303115150a6ddcb32b8bfe876aa35"},{url:"/5etools/data/spells/spells-ua-tobm.json",revision:"cd939f11a18a0490c3a1d0a190c09bef"},{url:"/5etools/data/spells/spells-xge.json",revision:"f248bdc2c05e22db3381107bba4e16fc"},{url:"/5etools/data/variantrules.json",revision:"c0d0ee6cd56dead6b8a2df246873a6c1"},{url:"/5etools/favicon.ico",revision:"0410ac12516c73b5d2113ecb6d8e82fc"},{url:"/5etools/fonts/MaterialIcons-Regular.ttf",revision:"a37b0c01c0baf1888ca812cc0508f6e2"},{url:"/5etools/fonts/MaterialIcons-Regular.woff",revision:"012cf6a10129e2275d79d6adac7f3b02"},{url:"/5etools/fonts/MaterialIcons-Regular.woff2",revision:"570eb83859dc23dd0eec423a49e147fe"},{url:"/5etools/img/android-chrome-192x192.png",revision:"be4c0728c703a538fb126893b628ccd7"},{url:"/5etools/img/android-chrome-512x512.png",revision:"eeb392253dca9a14d0b6059e39eda40d"},{url:"/5etools/img/apple-touch-icon.png",revision:"857576c68505885d2855fb6513bee130"},{url:"/5etools/img/favicon-16x16.png",revision:"c580ba205c94c7b2e19edf5feb286018"},{url:"/5etools/img/favicon-32x32.png",revision:"1ce713bb2f1c6bd34f61cfb3373cffe0"},{url:"/5etools/img/favicon.ico",revision:"0410ac12516c73b5d2113ecb6d8e82fc"},{url:"/5etools/img/logo-white-192x192.png",revision:"de037ebe3d00877d460c1d93936f29ef"},{url:"/5etools/index.bundle.js",revision:"3adc9e15dca2e668dfbb4da325040db4"},{url:"/5etools/index.html",revision:"60c5efd516af5f3d43cf1234ab64c998"},{url:"/5etools/manifest.json",revision:"327324c87dc1e6cd42339625c4bfdd39"},{url:"/5etools/node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",revision:"de4bdd416c5bdb296585ee9f5f918002"}],{})}));
//# sourceMappingURL=service-worker.js.map
