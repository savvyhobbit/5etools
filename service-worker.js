if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return o[e]||(s=new Promise(async s=>{if("document"in self){const o=document.createElement("script");o.src=e,document.head.appendChild(o),o.onload=s}else importScripts(e),s()})),s.then(()=>{if(!o[e])throw new Error(`Module ${e} didn’t register its module`);return o[e]})},s=(s,o)=>{Promise.all(s.map(e)).then(e=>o(1===e.length?e[0]:e))},o={require:Promise.resolve(s)};self.define=(s,a,l)=>{o[s]||(o[s]=Promise.resolve().then(()=>{let o={};const d={uri:location.origin+s.slice(1)};return Promise.all(a.map(s=>{switch(s){case"exports":return o;case"module":return d;default:return e(s)}})).then(e=>{const s=l(...e);return o.default||(o.default=s),o})}))}}define("./service-worker.js",["./workbox-468c4d03"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/5etools0.bundle.js",revision:"76d3b4857f91644418720a8a03a04eb4"},{url:"/5etools1.bundle.js",revision:"7c0242a6fbd9a9fbd242a5e9f910a79f"},{url:"/5etools11.bundle.js",revision:"b0c6e14aac0aab30c4b09b843692788e"},{url:"/5etools12.bundle.js",revision:"b7bbcd5792a12722e7d78355d685be75"},{url:"/5etools13.bundle.js",revision:"79b9e3688655de5a568acaf0b9121a7b"},{url:"/5etools14.bundle.js",revision:"bd256aa284ba6d0bacbebf1997446dd3"},{url:"/5etools15.bundle.js",revision:"a5f130340afe87e44e9c526cd2ef31c2"},{url:"/5etools16.bundle.js",revision:"f34dbbb00e8373f9e54ac8dd25d44715"},{url:"/5etools17.bundle.js",revision:"fa8263fe4e584189b61d5a4c4b16875c"},{url:"/5etools18.bundle.js",revision:"3e5dcd376aeaf331b693f36648f0eed4"},{url:"/5etools19.bundle.js",revision:"f090a4b32ae2aab3e2ae4cd36811fc1a"},{url:"/5etools2.bundle.js",revision:"a3f458432e3697d79a1230768ccd7744"},{url:"/5etools20.bundle.js",revision:"90f11008b9c43c69d5762a11a5a6f190"},{url:"/5etools21.bundle.js",revision:"1d6cec9d64fc83e37f0842484660f939"},{url:"/5etools22.bundle.js",revision:"de28cd06d9a95082a0cfb87c164fce3e"},{url:"/5etools23.bundle.js",revision:"f513faf3b03d76cd277be4804aa9af0a"},{url:"/5etools24.bundle.js",revision:"654a8037baacce07e598b35d830f6e0e"},{url:"/5etools25.bundle.js",revision:"8f2344fdb238c07aefc15b2b15e6ba9e"},{url:"/5etools26.bundle.js",revision:"9f276eb99abc93ab3486fcac80bd60cd"},{url:"/5etools27.bundle.js",revision:"97d850dca093edce9840f50c0e5c6b66"},{url:"/5etools28.bundle.js",revision:"2d64c87b06c2251d4874c5e45e8e0abf"},{url:"/5etools3.bundle.js",revision:"90f8ce1de0c865a56b0085aec7050ba2"},{url:"/5etools4.bundle.js",revision:"1778925436af0aa254391e65b7afba04"},{url:"/5etools5.bundle.js",revision:"516c8ee1a03cbd96bd7b0f3c86720032"},{url:"/5etools6.bundle.js",revision:"75d86b87fe763f4bd258a446981cd0ad"},{url:"/5etools7.bundle.js",revision:"64be708a0a9fe009c8eae9ae6aab92a3"},{url:"/5etools8.bundle.js",revision:"03a8a36604e7f5bc21cfcd0bd053a649"},{url:"/5etools9.bundle.js",revision:"b219f1cc2d150869bbacce2e1208a11b"},{url:"/5etoolsdata/backgrounds.json",revision:"820a6f456399efe960aeab43d959a4ba"},{url:"/5etoolsdata/basicitems.json",revision:"15d8b9dd4bf68c0d1aefba00ba020e48"},{url:"/5etoolsdata/choices.js",revision:"29da0cdac8c664cec6ee33da4db39331"},{url:"/5etoolsdata/classes/artificer.json",revision:"f120a78d2f3c6e03b13d2caa01fa3650"},{url:"/5etoolsdata/classes/barbarian.json",revision:"82031fa73734fe685e205892d5d414e3"},{url:"/5etoolsdata/classes/bard.json",revision:"41508c2c797e076ea504c93941b042fe"},{url:"/5etoolsdata/classes/cleric.json",revision:"d46621f402c113e8e987ac8d7691302f"},{url:"/5etoolsdata/classes/druid.json",revision:"fda549d7ac93453963db58624e2f4276"},{url:"/5etoolsdata/classes/fighter.json",revision:"b3497f5236c865012b1a81482e413ee7"},{url:"/5etoolsdata/classes/index.json",revision:"0be8f174566b9e49632522f2bc5504b4"},{url:"/5etoolsdata/classes/monk.json",revision:"63e6ceb141d28d47cf352e74600ac45b"},{url:"/5etoolsdata/classes/mystic.json",revision:"7f4936b0863c9076e091650478482019"},{url:"/5etoolsdata/classes/paladin.json",revision:"f3c1e7fc329bec0eb99a25d47acb64b3"},{url:"/5etoolsdata/classes/ranger.json",revision:"b9adc917a6098a91a68641a0da639087"},{url:"/5etoolsdata/classes/rogue.json",revision:"da6616eb2a807c91df71373dd9643c77"},{url:"/5etoolsdata/classes/sidekick.json",revision:"b5a3e340b41b79325ab6352f47579c5d"},{url:"/5etoolsdata/classes/sorcerer.json",revision:"69d08048aa41707f844a2427b3e7bbcc"},{url:"/5etoolsdata/classes/warlock.json",revision:"7340dd1b51aa286e28894e788b82fc6b"},{url:"/5etoolsdata/classes/wizard.json",revision:"8a3247a9bd5ef71d3d168aebf705911c"},{url:"/5etoolsdata/conditions.json",revision:"6afd0c28969c88d52b909b48614ecc8e"},{url:"/5etoolsdata/cults.json",revision:"784409e3ea77a18f263b0e0d55cec45f"},{url:"/5etoolsdata/feats.json",revision:"9967a346cf5b9cd13edadab233c1bd6a"},{url:"/5etoolsdata/features.json",revision:"1835cbe62a4e8c8ac03ecfdaa9fdefae"},{url:"/5etoolsdata/items.json",revision:"24d438e3c50c8df3f6bf2a67d023b2b2"},{url:"/5etoolsdata/legendarygroups.json",revision:"51ce9d4c3464c99ef5a7044da9ae43ee"},{url:"/5etoolsdata/magicvariants.json",revision:"fce713481043f969f81d3f0633b2feef"},{url:"/5etoolsdata/psionics.json",revision:"d4d3983309dce6690814d09650cdb4f9"},{url:"/5etoolsdata/races.json",revision:"4bd6042ffeb5a20e2549329d11113615"},{url:"/5etoolsdata/rewards.json",revision:"e1502186046faf2c6a462a7d307f4764"},{url:"/5etoolsdata/rules.json",revision:"bd0eb7c4f5abeeb26fff70ba40de4715"},{url:"/5etoolsdata/spells/index.json",revision:"e2d320d2cb613e8c25bf648f73d8beda"},{url:"/5etoolsdata/spells/spells-ai.json",revision:"2d587d6c98023603f39eda454ab15e91"},{url:"/5etoolsdata/spells/spells-egw.json",revision:"188a72e6a6de31449225ea734f122afb"},{url:"/5etoolsdata/spells/spells-ggr.json",revision:"427f6bfd44a859ef4e14918e202c3e2f"},{url:"/5etoolsdata/spells/spells-llk.json",revision:"427f6bfd44a859ef4e14918e202c3e2f"},{url:"/5etoolsdata/spells/spells-phb.json",revision:"31576bc0943585b323a5087e79e92a0a"},{url:"/5etoolsdata/spells/spells-scag.json",revision:"b4e2fbcb5ecd42163db644031102d0eb"},{url:"/5etoolsdata/spells/spells-stream.json",revision:"325c882960a827949572d3a4de9f1f07"},{url:"/5etoolsdata/spells/spells-ua-2020por.json",revision:"dbb7bd0ead60172b02f1cbd803fbf5a5"},{url:"/5etoolsdata/spells/spells-ua-2020smt.json",revision:"a0826ac9ed50dc7d2282b48a5a5d0c40"},{url:"/5etoolsdata/spells/spells-ua-ar.json",revision:"82368a54d661178cb88d524ee29bb6b1"},{url:"/5etoolsdata/spells/spells-ua-frw.json",revision:"8dedb5b6f12a9bd43d2d075be5a1638b"},{url:"/5etoolsdata/spells/spells-ua-mm.json",revision:"6c9bf8abb3f5eded9a90cf520cc8addb"},{url:"/5etoolsdata/spells/spells-ua-saw.json",revision:"aa10f5eb3b1d74e89f5fc5142c5b8cd0"},{url:"/5etoolsdata/spells/spells-ua-ss.json",revision:"20a303115150a6ddcb32b8bfe876aa35"},{url:"/5etoolsdata/spells/spells-ua-tobm.json",revision:"cd939f11a18a0490c3a1d0a190c09bef"},{url:"/5etoolsdata/spells/spells-xge.json",revision:"f248bdc2c05e22db3381107bba4e16fc"},{url:"/5etoolsdata/variantrules.json",revision:"c0d0ee6cd56dead6b8a2df246873a6c1"},{url:"/5etoolsfavicon.ico",revision:"0410ac12516c73b5d2113ecb6d8e82fc"},{url:"/5etoolsfonts/MaterialIcons-Regular.ttf",revision:"a37b0c01c0baf1888ca812cc0508f6e2"},{url:"/5etoolsfonts/MaterialIcons-Regular.woff",revision:"012cf6a10129e2275d79d6adac7f3b02"},{url:"/5etoolsfonts/MaterialIcons-Regular.woff2",revision:"570eb83859dc23dd0eec423a49e147fe"},{url:"/5etoolsimg/android-chrome-192x192.png",revision:"be4c0728c703a538fb126893b628ccd7"},{url:"/5etoolsimg/android-chrome-512x512.png",revision:"eeb392253dca9a14d0b6059e39eda40d"},{url:"/5etoolsimg/apple-touch-icon.png",revision:"857576c68505885d2855fb6513bee130"},{url:"/5etoolsimg/favicon-16x16.png",revision:"c580ba205c94c7b2e19edf5feb286018"},{url:"/5etoolsimg/favicon-32x32.png",revision:"1ce713bb2f1c6bd34f61cfb3373cffe0"},{url:"/5etoolsimg/favicon.ico",revision:"0410ac12516c73b5d2113ecb6d8e82fc"},{url:"/5etoolsimg/logo-white-192x192.png",revision:"de037ebe3d00877d460c1d93936f29ef"},{url:"/5etoolsindex.bundle.js",revision:"f0a2816d06a84b0ca1bd3becbf7e8b23"},{url:"/5etoolsindex.html",revision:"94b6fea19040bc275f7badd905e5d6e0"},{url:"/5etoolsmanifest.json",revision:"265fd3fcad8576a548c660295935282b"},{url:"/5etoolsnode_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js",revision:"de4bdd416c5bdb296585ee9f5f918002"}],{})}));
//# sourceMappingURL=service-worker.js.map