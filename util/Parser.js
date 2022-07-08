import {
  STR_EMPTY,
  STR_SLUG_DASH,
  STR_APOSTROPHE,
  STR_CANTRIP,
  RNG_SPECIAL,
  RNG_POINT,
  RNG_LINE,
  RNG_CUBE,
  RNG_CONE,
  RNG_RADIUS,
  RNG_SPHERE,
  RNG_HEMISPHERE,
  RNG_SELF,
  RNG_SIGHT,
  RNG_UNLIMITED,
  RNG_TOUCH,
  UNT_FEET,
  UNT_MILES,
  LEVEL_TO_XP_EASY,
  LEVEL_TO_XP_MEDIUM,
  LEVEL_TO_XP_HARD,
  LEVEL_TO_XP_DEADLY,
  TP_ABERRATION,
  TP_BEAST,
  TP_CELESTIAL,
  TP_CONSTRUCT,
  TP_DRAGON,
  TP_ELEMENTAL,
  TP_FEY,
  TP_FIEND,
  TP_GIANT,
  TP_HUMANOID,
  TP_MONSTROSITY,
  TP_OOZE,
  TP_PLANT,
  TP_UNDEAD,
  SZ_FINE,
  SZ_DIMINUTIVE,
  SZ_TINY,
  SZ_SMALL,
  SZ_MEDIUM,
  SZ_LARGE,
  SZ_HUGE,
  SZ_GARGANTUAN,
  SZ_COLOSSAL,
  SZ_VARIES,
  SRC_CoS,
  SRC_DMG,
  SRC_EEPC,
  SRC_EET,
  SRC_HotDQ,
  SRC_LMoP,
  SRC_MM,
  SRC_OotA,
  SRC_PHB,
  SRC_PotA,
  SRC_RoT,
  SRC_RoTOS,
  SRC_SCAG,
  SRC_SKT,
  SRC_ToA,
  SRC_ToD,
  SRC_TTP,
  SRC_TYP,
  SRC_VGM,
  SRC_XGE,
  SRC_OGA,
  SRC_ALCoS,
  SRC_ALEE,
  SRC_ALRoD,
  SRC_PSA,
  SRC_PSI,
  SRC_PSK,
  SRC_PSZ,
  SRC_UAA,
  SRC_UAEAG,
  SRC_UAEBB,
  SRC_UAFFR,
  SRC_UAFFS,
  SRC_UAFO,
  SRC_UAFT,
  SRC_UAGH,
  SRC_UAMDM,
  SRC_UASSP,
  SRC_UATMC,
  SRC_UATOBM,
  SRC_UATRR,
  SRC_UAWA,
  SRC_UAVR,
  SRC_UALDR,
  SRC_UARAR,
  SRC_UAATOSC,
  SRC_UABPP,
  SRC_UARSC,
  SRC_UAKOO,
  SRC_UABBC,
  SRC_UACDD,
  SRC_UAD,
  SRC_UARCO,
  SRC_UAF,
  SRC_UAM,
  SRC_UAP,
  SRC_UAMC,
  SRC_UAS,
  SRC_UAWAW,
  SRC_UATF,
  SRC_UAWR,
  SRC_UAESR,
  SRC_MOT,
  SRC_GGR,
  SRC_AI,
  SRC_BGDIA,
  SRC_GoS,
  SRC_EGW,
  SRC_ERLW,
  SRC_UA2POR,
  SRC_UAFRW,
  SRC_MTF,
  SRC_PSX,
  SRC_BOLS_3PP,
  SRC_ToB_3PP,
  AL_PREFIX,
  AL_PREFIX_SHORT,
  PS_PREFIX,
  PS_PREFIX_SHORT,
  UA_PREFIX,
  UA_PREFIX_SHORT,
  PP3_SUFFIX
} from "../util/consts.js";
import { ascSort, hasBeenReprinted } from "../js/utils.js";

let Parser = {};
Parser._parse_aToB = function(abMap, a) {
  if (!a || !a.trim) return a;
  a = a.trim();
  if (abMap[a] !== undefined) return abMap[a];
  console.warn(a, abMap);
  return a;
};

Parser._parse_bToA = function(abMap, b) {
  if (!b || !b.trim) return b;
  b = b.trim();
  for (const v in abMap) {
    if (!abMap.hasOwnProperty(v)) continue;
    if (abMap[v] === b) return v;
  }
  return b;
};

Parser.attAbvToFull = function(abv) {
  return Parser._parse_aToB(Parser.ATB_ABV_TO_FULL, abv);
};

Parser.attFullToAbv = function(full) {
  return Parser._parse_bToA(Parser.ATB_ABV_TO_FULL, full);
};

Parser.sizeAbvToFull = function(abv) {
  if (abv) {
    return Parser._parse_aToB(Parser.SIZE_ABV_TO_FULL, Array.isArray(abv) ? abv[0] : abv);
  } else {
    return '';
  }
};

Parser.getAbilityModNumber = function(abilityScore) {
  return Math.floor((abilityScore - 10) / 2);
};

Parser.getAbilityModifier = function(abilityScore) {
  let modifier = Parser.getAbilityModNumber(abilityScore);
  if (modifier >= 0) modifier = "+" + modifier;
  return modifier;
};

Parser._addCommas = function(intNum) {
  return (intNum + "").replace(/(\d)(?=(\d{3})+$)/g, "$1,");
};

Parser.crToXp = function(cr) {
  if (cr === "Unknown" || cr === undefined) return "Unknown";
  if (cr === "0") return "0 or 10";
  if (cr === "1/8") return "25";
  if (cr === "1/4") return "50";
  if (cr === "1/2") return "100";
  return Parser._addCommas(Parser.XP_CHART[parseInt(cr) - 1]);
};

Parser.levelToXpThreshold = function(level) {
  return [LEVEL_TO_XP_EASY[level], LEVEL_TO_XP_MEDIUM[level], LEVEL_TO_XP_HARD[level], LEVEL_TO_XP_DEADLY[level]];
};

Parser.crToNumber = function(cr) {
  if (cr === "Unknown" || cr === undefined) return 100;
  const parts = cr.trim().split("/");
  if (parts.length === 1) return Number(parts[0]);
  else if (parts.length === 2) return Number(parts[0]) / Number(parts[1]);
  else return 0;
};

Parser.armorFullToAbv = function(armor) {
  return Parser._parse_bToA(Parser.ARMOR_ABV_TO_FULL, armor);
};

Parser.sourceJsonToFull = function(source) {
  const parsed = Parser._parse_aToB(Parser.SOURCE_JSON_TO_FULL, source)
  if (parsed && parsed.replace) return parsed.replace("'", STR_APOSTROPHE);
  return source
};

Parser.sourceJsonToFullCompactPrefix = function(source) {
  const parsed = Parser._parse_aToB(Parser.SOURCE_JSON_TO_FULL, source)
  if (parsed && parsed.replace) return parsed.replace("'", STR_APOSTROPHE)
    .replace(UA_PREFIX, UA_PREFIX_SHORT)
    .replace(AL_PREFIX, AL_PREFIX_SHORT)
    .replace(PS_PREFIX, PS_PREFIX_SHORT);
  return source
};

Parser.sourceJsonToAbv = function(source) {
  return Parser._parse_aToB(Parser.SOURCE_JSON_TO_ABV, source);
};

Parser.featureJsonToAbv = function(source) {
  return Parser._parse_aToB(Parser.OPT_FEATURE_TYPE_TO_FULL, source);
};

Parser.stringToSlug = function(str) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, STR_EMPTY)
    .replace(/ +/g, STR_SLUG_DASH);
};

Parser.itemTypeToAbv = function(type) {
  return Parser._parse_aToB(Parser.ITEM_TYPE_JSON_TO_ABV, type);
};

Parser.dmgTypeToFull = function(dmgType) {
  return Parser._parse_aToB(Parser.DMGTYPE_JSON_TO_FULL, dmgType);
};

Parser.skillToExplanation = function(skillType) {
  return Parser._parse_aToB(Parser.SKILL_JSON_TO_FULL, skillType);
};

Parser.actionToExplanation = function(actionType) {
  return Parser._parse_aToB(Parser.ACTION_JSON_TO_FULL, actionType);
};

Parser.numberToString = function(num) {
  if (num === 0) return "zero";
  else return parse_hundreds(num);

  function parse_hundreds(num) {
    if (num > 99) {
      return Parser.NUMBERS_ONES[Math.floor(num / 100)] + " hundred " + parse_tens(num % 100);
    } else {
      return parse_tens(num);
    }
  }
  function parse_tens(num) {
    if (num < 10) return Parser.NUMBERS_ONES[num];
    else if (num >= 10 && num < 20) return Parser.NUMBERS_TEENS[num - 10];
    else {
      return Parser.NUMBERS_TENS[Math.floor(num / 10)] + " " + Parser.NUMBERS_ONES[num % 10];
    }
  }
};
// sp-prefix functions are for parsing spell data, and shared with the roll20 script
Parser.spSchoolAbvToFull = function(school) {
  return Parser._parse_aToB(Parser.SP_SCHOOL_ABV_TO_FULL, school);
};

Parser.spLevelToFull = function(level) {
  if (level === 0) return STR_CANTRIP;
  if (level === 1) return level + "st";
  if (level === 2) return level + "nd";
  if (level === 3) return level + "rd";
  return level + "th";
};

Parser.spLevelSchoolMetaToFull = function(level, school, meta) {
  const levelPart = level === 0 ? Parser.spLevelToFull(level).toLowerCase() : Parser.spLevelToFull(level) + "-level";
  let levelSchoolStr =
    level === 0
      ? `${Parser.spSchoolAbvToFull(school)} ${levelPart}`
      : `${levelPart} ${Parser.spSchoolAbvToFull(school).toLowerCase()}`;
  // these tags are (so far) mutually independent, so we don't need to combine the text
  if (meta && meta.ritual) levelSchoolStr += " (ritual)";
  if (meta && meta.technomagic) levelSchoolStr += " (technomagic)";
  return levelSchoolStr;
};

Parser.spTimeListToFull = function(times) {
  return times.map(t => `${Parser.getTimeToFull(t)}${t.condition ? `, ${t.condition}` : ""}`).join(" or ");
};

Parser.getTimeToFull = function(time) {
  return `${time.number} ${time.unit}${time.number > 1 ? "s" : ""}`;
};

Parser.spRangeToFull = function(range) {
  switch (range.type) {
    case RNG_SPECIAL:
      return "Special";
    case RNG_POINT:
      return renderPoint();
    case RNG_LINE:
    case RNG_CUBE:
    case RNG_CONE:
    case RNG_RADIUS:
    case RNG_SPHERE:
    case RNG_HEMISPHERE:
      return renderArea();
  }

  function renderPoint() {
    const dist = range.distance;
    switch (dist.type) {
      case UNT_FEET:
      case UNT_MILES:
        return `${dist.amount} ${dist.amount === 1 ? Parser.getSingletonUnit(dist.type) : dist.type}`;
      case RNG_SELF:
        return "Self";
      case RNG_SIGHT:
        return "Sight";
      case RNG_UNLIMITED:
        return "Unlimited";
      case RNG_TOUCH:
        return "Touch";
    }
  }
  function renderArea() {
    const size = range.distance;
    return `${size.amount}-${Parser.getSingletonUnit(size.type)}${getAreaStyleStr()}`;

    function getAreaStyleStr() {
      return range.type === RNG_SPHERE || range.type === RNG_HEMISPHERE ? "-radius" : " " + range.type;
    }
  }
};

Parser.getSingletonUnit = function(unit) {
  if (unit === UNT_FEET) return "foot";
  if (unit.charAt(unit.length - 1) === "s") return unit.slice(0, -1);
  return unit;
};

Parser.spComponentsToFull = function(comp) {
  const out = [];
  if (comp) {
    if (comp.v) out.push("V");
    if (comp.s) out.push("S");
    if (comp.m) out.push("M" + (comp.m.length ? ` (${comp.m})` : ""));
  }
  return out.join(", ");
};

Parser.spDurationToFull = function(dur) {
  return (
    dur
      .map(d => {
        switch (d.type) {
          case "special":
            return "Special";
          case "instant":
            return `Instantaneous${d.condition ? ` (${d.condition})` : ""}`;
          case "timed":
            return `${d.concentration ? "Concentration, " : ""}${
              d.duration.upTo && d.concentration ? "u" : d.duration.upTo ? "U" : ""
            }${d.duration.upTo ? "p to " : ""}${d.duration.amount} ${
              d.duration.amount === 1 ? Parser.getSingletonUnit(d.duration.type) : d.duration.type
            }`;
          case "permanent":
            return `Until ${d.ends
              .map(m => (m === "dispell" ? "dispelled" : m === "trigger" ? "triggered" : undefined))
              .join(" or ")}`;
        }
      })
      .join(" or ") + (dur.length > 1 ? " (see below)" : "")
  );
};

Parser.spClassesToFull = function(classes) {
  if (classes) {
    const fromSubclasses = Parser.spSubclassesToFull(classes);
    return Parser.spMainClassesToFull(classes) + (fromSubclasses ? ", " + fromSubclasses : "");
  }
};

Parser.spMainClassesToFull = function(classes) {
  return classes && classes.fromClassList ? classes.fromClassList
    .sort((a, b) => ascSort(a.name, b.name))
    .map(c => `<span title="Source: ${Parser.sourceJsonToFull(c.source)}">${c.name}</span>`)
    .join(", ") : '';
};

Parser.spSubclassesToFull = function(classes) {
  if (!classes.fromSubclass) return "";
  return classes.fromSubclass
    .sort((a, b) => {
      const byName = ascSort(a.class.name, b.class.name);
      return byName ? byName : ascSort(a.subclass.name, b.subclass.name);
    })
    .map(c => Parser._spSubclassItem(c))
    .join(", ");
};

Parser._spSubclassItem = function(fromSubclass) {
  return `<span class="italic" title="Source: ${Parser.sourceJsonToFull(fromSubclass.subclass.source)}">${
    fromSubclass.subclass.name
  }${
    fromSubclass.subclass.subSubclass ? ` (${fromSubclass.subclass.subSubclass})` : ""
  }</span> <span title="Source: ${Parser.sourceJsonToFull(fromSubclass.class.source)}">${
    fromSubclass.class.name
  }</span>`;
};

Parser.monTypeToFullObj = function(type) {
  const out = { type: "", tags: [], asText: "" };

  if (typeof type === "string") {
    // handles e.g. "fey"
    out.type = type;
    out.asText = type;
    return out;
  }

  const tempTags = [];
  if (type.tags) {
    for (const tag of type.tags) {
      if (typeof tag === "string") {
        // handles e.g. "fiend (devil)"
        out.tags.push(tag);
        tempTags.push(tag);
      } else {
        // handles e.g. "humanoid (Chondathan human)"
        out.tags.push(tag.tag);
        tempTags.push(`${tag.prefix} ${tag.tag}`);
      }
    }
  }
  out.type = type.type;
  if (type.swarmSize) {
    out.tags.push("swarm");
    out.asText = `swarm of ${Parser.sizeAbvToFull(type.swarmSize).toLowerCase()} ${Parser.monTypeToPlural(type.type)}`;
  } else {
    out.asText = `${type.type} (${tempTags.join(", ")})`;
  }
  return out;
};

Parser.monTypeToPlural = function(type) {
  return Parser._parse_aToB(Parser.MON_TYPE_TO_PLURAL, type);
};

/**
 * Build a pair of strings; one with all current subclasses, one with all legacy subclasses
 *
 * @param classes a spell.classes JSON item
 * @returns {*[]} A two-element array. First item is a string of all the current subclasses, second item a string of
 * all the legacy/superceded subclasses
 */
Parser.spSubclassesToCurrentAndLegacyFull = function(classes) {
  const out = [[], []];
  if (!classes.fromSubclass) return out;
  const curNames = new Set();
  const toCheck = [];
  classes.fromSubclass
    .sort((a, b) => {
      const byName = ascSort(a.class.name, b.class.name);
      return byName ? byName : ascSort(a.subclass.name, b.subclass.name);
    })
    .forEach(c => {
      const nm = c.subclass.name;
      const src = c.subclass.source;
      const toAdd = Parser._spSubclassItem(c);
      if (hasBeenReprinted(nm, src)) {
        out[1].push(toAdd);
      } else if (
        Parser.sourceJsonToFull(src).startsWith(UA_PREFIX) ||
        Parser.sourceJsonToFull(src).startsWith(PS_PREFIX)
      ) {
        const cleanName = mapClassShortNameToMostRecent(
          nm
            .split("(")[0]
            .trim()
            .split(/v\d+/)[0]
            .trim()
        );
        toCheck.push({ name: cleanName, ele: toAdd });
      } else {
        out[0].push(toAdd);
        curNames.add(nm);
      }
    });
  toCheck.forEach(n => {
    if (curNames.has(n.name)) {
      out[1].push(n.ele);
    } else {
      out[0].push(n.ele);
    }
  });
  return [out[0].join(", "), out[1].join(", ")];

  /**
   * Get the most recent iteration of a subclass name
   */
  function mapClassShortNameToMostRecent(shortName) {
    switch (shortName) {
      case "Favored Soul":
        return "Divine Soul";
      case "Undying Light":
        return "Celestial";
      case "Deep Stalker":
        return "Gloom Stalker";
    }
    return shortName;
  }
};

Parser.SP_SCHOOL_ABV_TO_FULL = {
  A: "Abjuration",
  V: "Evocation",
  E: "Enchantment",
  I: "Illusion",
  D: "Divination",
  N: "Necromancy",
  T: "Transmutation",
  C: "Conjuration",
  P: "Psionics"
};

Parser.ATB_ABV_TO_FULL = {
  str: "Strength",
  dex: "Dexterity",
  con: "Constitution",
  int: "Intelligence",
  wis: "Wisdom",
  cha: "Charisma"
};

Parser.MON_TYPE_TO_PLURAL = {};
Parser.MON_TYPE_TO_PLURAL[TP_ABERRATION] = "aberrations";
Parser.MON_TYPE_TO_PLURAL[TP_BEAST] = "beasts";
Parser.MON_TYPE_TO_PLURAL[TP_CELESTIAL] = "celestials";
Parser.MON_TYPE_TO_PLURAL[TP_CONSTRUCT] = "constructs";
Parser.MON_TYPE_TO_PLURAL[TP_DRAGON] = "dragons";
Parser.MON_TYPE_TO_PLURAL[TP_ELEMENTAL] = "elementals";
Parser.MON_TYPE_TO_PLURAL[TP_FEY] = "fey";
Parser.MON_TYPE_TO_PLURAL[TP_FIEND] = "fiends";
Parser.MON_TYPE_TO_PLURAL[TP_GIANT] = "giants";
Parser.MON_TYPE_TO_PLURAL[TP_HUMANOID] = "humanoids";
Parser.MON_TYPE_TO_PLURAL[TP_MONSTROSITY] = "monstrosities";
Parser.MON_TYPE_TO_PLURAL[TP_OOZE] = "oozes";
Parser.MON_TYPE_TO_PLURAL[TP_PLANT] = "plants";
Parser.MON_TYPE_TO_PLURAL[TP_UNDEAD] = "undead";
Parser.SIZE_ABV_TO_FULL = {};
Parser.SIZE_ABV_TO_FULL[SZ_FINE] = "Fine";
Parser.SIZE_ABV_TO_FULL[SZ_DIMINUTIVE] = "Diminutive";
Parser.SIZE_ABV_TO_FULL[SZ_TINY] = "Tiny";
Parser.SIZE_ABV_TO_FULL[SZ_SMALL] = "Small";
Parser.SIZE_ABV_TO_FULL[SZ_MEDIUM] = "Medium";
Parser.SIZE_ABV_TO_FULL[SZ_LARGE] = "Large";
Parser.SIZE_ABV_TO_FULL[SZ_HUGE] = "Huge";
Parser.SIZE_ABV_TO_FULL[SZ_GARGANTUAN] = "Gargantuan";
Parser.SIZE_ABV_TO_FULL[SZ_COLOSSAL] = "Colossal";
Parser.SIZE_ABV_TO_FULL[SZ_VARIES] = "Varies";

Parser.XP_CHART = [
  200,
  450,
  700,
  1100,
  1800,
  2300,
  2900,
  3900,
  5000,
  5900,
  7200,
  8400,
  10000,
  11500,
  13000,
  15000,
  18000,
  20000,
  22000,
  25000,
  30000,
  41000,
  50000,
  62000,
  75000,
  90000,
  105000,
  102000,
  135000,
  155000
];

Parser.ARMOR_ABV_TO_FULL = {
  "l.": "light",
  "m.": "medium",
  "h.": "heavy"
};

Parser.SOURCE_JSON_TO_FULL = {};
Parser.SOURCE_JSON_TO_FULL[SRC_CoS] = "Curse of Strahd";
Parser.SOURCE_JSON_TO_FULL[SRC_DMG] = "Dungeon Master's Guide";
Parser.SOURCE_JSON_TO_FULL[SRC_EEPC] = "Elemental Evil Player's Companion";
Parser.SOURCE_JSON_TO_FULL[SRC_EET] = "Elemental Evil: Trinkets";
Parser.SOURCE_JSON_TO_FULL[SRC_HotDQ] = "Hoard of the Dragon Queen";
Parser.SOURCE_JSON_TO_FULL[SRC_LMoP] = "Lost Mine of Phandelver";
Parser.SOURCE_JSON_TO_FULL[SRC_MM] = "Monster Manual";
Parser.SOURCE_JSON_TO_FULL[SRC_OotA] = "Out of the Abyss";
Parser.SOURCE_JSON_TO_FULL[SRC_PHB] = "Player's Handbook";
Parser.SOURCE_JSON_TO_FULL[SRC_PotA] = "Princes of the Apocalypse";
Parser.SOURCE_JSON_TO_FULL[SRC_RoT] = "The Rise of Tiamat";
Parser.SOURCE_JSON_TO_FULL[SRC_RoTOS] = "The Rise of Tiamat Online Supplement";
Parser.SOURCE_JSON_TO_FULL[SRC_SCAG] = "Sword Coast Adventurer's Guide";
Parser.SOURCE_JSON_TO_FULL[SRC_SKT] = "Storm King's Thunder";
Parser.SOURCE_JSON_TO_FULL[SRC_ToA] = "Tomb of Annihilation";
Parser.SOURCE_JSON_TO_FULL[SRC_ToD] = "Tyranny of Dragons";
Parser.SOURCE_JSON_TO_FULL[SRC_TTP] = "The Tortle Package";
Parser.SOURCE_JSON_TO_FULL[SRC_TYP] = "Tales from the Yawning Portal";
Parser.SOURCE_JSON_TO_FULL[SRC_VGM] = "Volo's Guide to Monsters";
Parser.SOURCE_JSON_TO_FULL[SRC_XGE] = "Xanathar's Guide to Everything";
Parser.SOURCE_JSON_TO_FULL[SRC_OGA] = "One Grung Above";
Parser.SOURCE_JSON_TO_FULL[SRC_MTF] = "Mordenkainen’s Tome of Foes";
Parser.SOURCE_JSON_TO_FULL[SRC_UA2POR] = UA_PREFIX + "2020 Psionic Options Revisited";
Parser.SOURCE_JSON_TO_FULL[SRC_PSX] = PS_PREFIX + "Ixalan";
Parser.SOURCE_JSON_TO_FULL[SRC_UAFRW] = UA_PREFIX + "Fighter, Rogue, and Wizard";
Parser.SOURCE_JSON_TO_FULL[SRC_ALCoS] = AL_PREFIX + "Curse of Strahd";
Parser.SOURCE_JSON_TO_FULL[SRC_ALEE] = AL_PREFIX + "Elemental Evil";
Parser.SOURCE_JSON_TO_FULL[SRC_ALRoD] = AL_PREFIX + "Rage of Demons";
Parser.SOURCE_JSON_TO_FULL[SRC_PSA] = PS_PREFIX + "Amonkhet";
Parser.SOURCE_JSON_TO_FULL[SRC_PSI] = PS_PREFIX + "Innistrad";
Parser.SOURCE_JSON_TO_FULL[SRC_PSK] = PS_PREFIX + "Kaladesh";
Parser.SOURCE_JSON_TO_FULL[SRC_PSZ] = PS_PREFIX + "Zendikar";
Parser.SOURCE_JSON_TO_FULL[SRC_UAA] = UA_PREFIX + "Artificer";
Parser.SOURCE_JSON_TO_FULL[SRC_UAEAG] = UA_PREFIX + "Eladrin and Gith";
Parser.SOURCE_JSON_TO_FULL[SRC_UAEBB] = UA_PREFIX + "Eberron";
Parser.SOURCE_JSON_TO_FULL[SRC_UAFFR] = UA_PREFIX + "Feats for Races";
Parser.SOURCE_JSON_TO_FULL[SRC_UAFFS] = UA_PREFIX + "Feats for Skills";
Parser.SOURCE_JSON_TO_FULL[SRC_UAFO] = UA_PREFIX + "Fiendish Options";
Parser.SOURCE_JSON_TO_FULL[SRC_UAFT] = UA_PREFIX + "Feats";
Parser.SOURCE_JSON_TO_FULL[SRC_UAGH] = UA_PREFIX + "Gothic Heroes";
Parser.SOURCE_JSON_TO_FULL[SRC_UAMDM] = UA_PREFIX + "Modern Magic";
Parser.SOURCE_JSON_TO_FULL[SRC_UASSP] = UA_PREFIX + "Starter Spells";
Parser.SOURCE_JSON_TO_FULL[SRC_UATMC] = UA_PREFIX + "The Mystic Class";
Parser.SOURCE_JSON_TO_FULL[SRC_UATOBM] = UA_PREFIX + "That Old Black Magic";
Parser.SOURCE_JSON_TO_FULL[SRC_UATRR] = UA_PREFIX + "The Ranger, Revised";
Parser.SOURCE_JSON_TO_FULL[SRC_UAWA] = UA_PREFIX + "Waterborne Adventures";
Parser.SOURCE_JSON_TO_FULL[SRC_UAVR] = UA_PREFIX + "Variant Rules";
Parser.SOURCE_JSON_TO_FULL[SRC_UALDR] = UA_PREFIX + "Light, Dark, Underdark!";
Parser.SOURCE_JSON_TO_FULL[SRC_UARAR] = UA_PREFIX + "Ranger and Rogue";
Parser.SOURCE_JSON_TO_FULL[SRC_UAATOSC] = UA_PREFIX + "A Trio of Subclasses";
Parser.SOURCE_JSON_TO_FULL[SRC_UABPP] = UA_PREFIX + "Barbarian Primal Paths";
Parser.SOURCE_JSON_TO_FULL[SRC_UARSC] = UA_PREFIX + "Revised Subclasses";
Parser.SOURCE_JSON_TO_FULL[SRC_UAKOO] = UA_PREFIX + "Kits of Old";
Parser.SOURCE_JSON_TO_FULL[SRC_UABBC] = UA_PREFIX + "Bard: Bard Colleges";
Parser.SOURCE_JSON_TO_FULL[SRC_UACDD] = UA_PREFIX + "Cleric: Divine Domains";
Parser.SOURCE_JSON_TO_FULL[SRC_UAD] = UA_PREFIX + "Druid";
Parser.SOURCE_JSON_TO_FULL[SRC_UARCO] = UA_PREFIX + "Revised Class Options";
Parser.SOURCE_JSON_TO_FULL[SRC_UAF] = UA_PREFIX + "Fighter";
Parser.SOURCE_JSON_TO_FULL[SRC_UAM] = UA_PREFIX + "Monk";
Parser.SOURCE_JSON_TO_FULL[SRC_UAP] = UA_PREFIX + "Paladin";
Parser.SOURCE_JSON_TO_FULL[SRC_UAMC] = UA_PREFIX + "Modifying Classes";
Parser.SOURCE_JSON_TO_FULL[SRC_UAS] = UA_PREFIX + "Sorcerer";
Parser.SOURCE_JSON_TO_FULL[SRC_UAWAW] = UA_PREFIX + "Warlock and Wizard";
Parser.SOURCE_JSON_TO_FULL[SRC_UATF] = UA_PREFIX + "The Faithful";
Parser.SOURCE_JSON_TO_FULL[SRC_UAWR] = UA_PREFIX + "Wizard Revisited";
Parser.SOURCE_JSON_TO_FULL[SRC_UAESR] = UA_PREFIX + "Elf Subraces";
Parser.SOURCE_JSON_TO_FULL[SRC_MOT] = "Mythic Odysseys of Theros";
Parser.SOURCE_JSON_TO_FULL[SRC_GGR] = "Guildmasters’ Guide to Ravnica";
Parser.SOURCE_JSON_TO_FULL[SRC_AI] = "Acquisitions Incorporated";
Parser.SOURCE_JSON_TO_FULL[SRC_BGDIA] = "Baldur’s Gate: Descent Into Avernus";
Parser.SOURCE_JSON_TO_FULL[SRC_GoS] = "Ghosts of Saltmarsh";
Parser.SOURCE_JSON_TO_FULL[SRC_EGW] = "Explorer’s Guide to Wildemount";
Parser.SOURCE_JSON_TO_FULL[SRC_ERLW] = "Eberron: Rising from the Last War";
Parser.SOURCE_JSON_TO_FULL[SRC_BOLS_3PP] = "Book of Lost Spells" + PP3_SUFFIX;
Parser.SOURCE_JSON_TO_FULL[SRC_ToB_3PP] = "Tome of Beasts" + PP3_SUFFIX;
Parser.SOURCE_JSON_TO_FULL["VRGR"] = "Van Richten's Guide to Ravenloft";
Parser.SOURCE_JSON_TO_FULL["AWM"] = "Adventure with Muk";
Parser.SOURCE_JSON_TO_FULL["FTD"] = "Fizban’s Treasury of Dragons";
Parser.SOURCE_JSON_TO_FULL["LR"] = "Locathah Rising";
Parser.SOURCE_JSON_TO_FULL["PSA"] = "Plane Shift: Amonkhet";
Parser.SOURCE_JSON_TO_FULL["PSD"] = "Plane Shift: Dominaria";
Parser.SOURCE_JSON_TO_FULL["TCE"] = "Tasha’s Cauldron of Everything";
Parser.SOURCE_JSON_TO_FULL["UAWGE"] = "Wayfinder’s Guide to Eberron";
Parser.SOURCE_JSON_TO_FULL["WBtW"] = "The Wild Beyond the Witchlight";

Parser.SOURCE_JSON_TO_ABV = {};
Parser.SOURCE_JSON_TO_ABV[SRC_CoS] = "CoS";
Parser.SOURCE_JSON_TO_ABV[SRC_DMG] = "DMG";
Parser.SOURCE_JSON_TO_ABV[SRC_EEPC] = "EEPC";
Parser.SOURCE_JSON_TO_ABV[SRC_EET] = "EET";
Parser.SOURCE_JSON_TO_ABV[SRC_HotDQ] = "HotDQ";
Parser.SOURCE_JSON_TO_ABV[SRC_LMoP] = "LMoP";
Parser.SOURCE_JSON_TO_ABV[SRC_MM] = "MM";
Parser.SOURCE_JSON_TO_ABV[SRC_OotA] = "OotA";
Parser.SOURCE_JSON_TO_ABV[SRC_PHB] = "PHB";
Parser.SOURCE_JSON_TO_ABV[SRC_PotA] = "PotA";
Parser.SOURCE_JSON_TO_ABV[SRC_RoT] = "RoT";
Parser.SOURCE_JSON_TO_ABV[SRC_RoTOS] = "RoTOS";
Parser.SOURCE_JSON_TO_ABV[SRC_SCAG] = "SCAG";
Parser.SOURCE_JSON_TO_ABV[SRC_SKT] = "SKT";
Parser.SOURCE_JSON_TO_ABV[SRC_ToA] = "ToA";
Parser.SOURCE_JSON_TO_ABV[SRC_ToD] = "ToD";
Parser.SOURCE_JSON_TO_ABV[SRC_TTP] = "TTP";
Parser.SOURCE_JSON_TO_ABV[SRC_TYP] = "TftYP";
Parser.SOURCE_JSON_TO_ABV[SRC_VGM] = "VGM";
Parser.SOURCE_JSON_TO_ABV[SRC_XGE] = "XGE";
Parser.SOURCE_JSON_TO_ABV[SRC_OGA] = "OGA";
Parser.SOURCE_JSON_TO_ABV[SRC_ALCoS] = "ALCoS";
Parser.SOURCE_JSON_TO_ABV[SRC_ALEE] = "ALEE";
Parser.SOURCE_JSON_TO_ABV[SRC_ALRoD] = "ALRoD";
Parser.SOURCE_JSON_TO_ABV[SRC_PSA] = "PSA";
Parser.SOURCE_JSON_TO_ABV[SRC_PSI] = "PSI";
Parser.SOURCE_JSON_TO_ABV[SRC_PSK] = "PSK";
Parser.SOURCE_JSON_TO_ABV[SRC_PSZ] = "PSZ";
Parser.SOURCE_JSON_TO_ABV[SRC_UAA] = "UAA";
Parser.SOURCE_JSON_TO_ABV[SRC_UAEAG] = "UAEaG";
Parser.SOURCE_JSON_TO_ABV[SRC_UAEBB] = "UAEB";
Parser.SOURCE_JSON_TO_ABV[SRC_UAFFR] = "UAFFR";
Parser.SOURCE_JSON_TO_ABV[SRC_UAFFS] = "UAFFS";
Parser.SOURCE_JSON_TO_ABV[SRC_UAFO] = "UAFO";
Parser.SOURCE_JSON_TO_ABV[SRC_UAFT] = "UAFT";
Parser.SOURCE_JSON_TO_ABV[SRC_UAGH] = "UAGH";
Parser.SOURCE_JSON_TO_ABV[SRC_UAMDM] = "UAMM";
Parser.SOURCE_JSON_TO_ABV[SRC_UASSP] = "UASS";
Parser.SOURCE_JSON_TO_ABV[SRC_UATMC] = "UAM";
Parser.SOURCE_JSON_TO_ABV[SRC_UATOBM] = "UAOBM";
Parser.SOURCE_JSON_TO_ABV[SRC_UATRR] = "UATRR";
Parser.SOURCE_JSON_TO_ABV[SRC_UAWA] = "UAWA";
Parser.SOURCE_JSON_TO_ABV[SRC_UAVR] = "UAVR";
Parser.SOURCE_JSON_TO_ABV[SRC_UALDR] = "UALDU";
Parser.SOURCE_JSON_TO_ABV[SRC_UARAR] = "UARAR";
Parser.SOURCE_JSON_TO_ABV[SRC_UAATOSC] = "UAATOSC";
Parser.SOURCE_JSON_TO_ABV[SRC_UABPP] = "UABPP";
Parser.SOURCE_JSON_TO_ABV[SRC_UARSC] = "UARSC";
Parser.SOURCE_JSON_TO_ABV[SRC_UAKOO] = "UAKOO";
Parser.SOURCE_JSON_TO_ABV[SRC_UABBC] = "UABBC";
Parser.SOURCE_JSON_TO_ABV[SRC_UACDD] = "UACDD";
Parser.SOURCE_JSON_TO_ABV[SRC_UAD] = "UAD";
Parser.SOURCE_JSON_TO_ABV[SRC_UARCO] = "UARCO";
Parser.SOURCE_JSON_TO_ABV[SRC_UAF] = "UAF";
Parser.SOURCE_JSON_TO_ABV[SRC_UAM] = "UAM";
Parser.SOURCE_JSON_TO_ABV[SRC_UAP] = "UAP";
Parser.SOURCE_JSON_TO_ABV[SRC_UAMC] = "UAMC";
Parser.SOURCE_JSON_TO_ABV[SRC_UAS] = "UAS";
Parser.SOURCE_JSON_TO_ABV[SRC_UAWAW] = "UAWAW";
Parser.SOURCE_JSON_TO_ABV[SRC_UATF] = "UATF";
Parser.SOURCE_JSON_TO_ABV[SRC_UAWR] = "UAWR";
Parser.SOURCE_JSON_TO_ABV[SRC_UAESR] = "UAESR";
Parser.SOURCE_JSON_TO_ABV[SRC_MOT] = "MOT";
Parser.SOURCE_JSON_TO_ABV[SRC_GGR] = "GGR";
Parser.SOURCE_JSON_TO_ABV[SRC_AI] = "AI";
Parser.SOURCE_JSON_TO_ABV[SRC_BGDIA] = "BGDIA";
Parser.SOURCE_JSON_TO_ABV[SRC_GoS] = "GoS";
Parser.SOURCE_JSON_TO_ABV[SRC_EGW] = "EGW";
Parser.SOURCE_JSON_TO_ABV[SRC_ERLW] = "ERLW";
Parser.SOURCE_JSON_TO_ABV[SRC_UA2POR] = "UA2POR";
Parser.SOURCE_JSON_TO_ABV[SRC_MTF] = "MTF";
Parser.SOURCE_JSON_TO_ABV[SRC_PSX] = "PSX";
Parser.SOURCE_JSON_TO_ABV[SRC_UAFRW] = "UAFRW";
Parser.SOURCE_JSON_TO_ABV[SRC_BOLS_3PP] = "BolS (3pp)";
Parser.SOURCE_JSON_TO_ABV[SRC_ToB_3PP] = "ToB (3pp)";

Parser.ITEM_TYPE_JSON_TO_ABV = {
  A: "Ammunition",
  AF: "Ammunition",
  AT: "Artisan Tool",
  EXP: "Explosive",
  G: "Adventuring Gear",
  GS: "Gaming Set",
  HA: "Armor (Heavy)",
  INS: "Instrument",
  LA: "Armor (Light)",
  M: "Melee Weapon",
  MA: "Armor (Medium)",
  MNT: "Mount",
  GV: "Generic Variant",
  P: "Potion",
  R: "Ranged Weapon",
  RD: "Rod",
  RG: "Ring",
  S: "Shield",
  SC: "Scroll",
  SCF: "Spellcasting Focus",
  T: "Tool",
  TAH: "Tack and Harness",
  TG: "Trade Good",
  VEH: "Vehicle",
  WD: "Wand"
};

Parser.OPT_FEATURE_TYPE_TO_FULL = {
  AI: "Artificer Infusion",
  ED: "Elemental Discipline",
  EI: "Eldritch Invocation",
  MM: "Metamagic",
  MV: "Maneuver",
  "MV:B": "Maneuver: Battle Master",
  "MV:C2-UA": "Maneuver: Cavalier V2 (UA)",
  "AS:V1-UA": "Arcane Shot: V1 (UA)",
  "AS:V2-UA": "Arcane Shot: V2 (UA)",
  AS: "Arcane Shot",
  OTH: "Other",
  "FS:F": "Fighting Style: Fighter",
  "FS:B": "Fighting Style: Bard",
  "FS:P": "Fighting Style: Paladin",
  "FS:R": "Fighting Style: Ranger",
  PB: "Pact Boon",
  "SHP:H": "Ship Upgrade: Hull",
  "SHP:M": "Ship Upgrade: Movement",
  "SHP:W": "Ship Upgrade: Weapon",
  "SHP:F": "Ship Upgrade: Figurehead",
  "SHP:O": "Ship Upgrade: Miscellaneous",
  "IWM:W": "Infernal War Machine Variant: Weapon",
  "IWM:A": "Infernal War Machine Upgrade: Armor",
  "IWM:G": "Infernal War Machine Upgrade: Gadget",
  OR: "Onomancy Resonant",
  RN: "Rune Knight Rune",
  AF: "Alchemical Formula"
},

Parser.DMGTYPE_JSON_TO_FULL = {
  B: "bludgeoning",
  N: "necrotic",
  P: "piercing",
  R: "radiant",
  S: "slashing"
};

Parser.SKILL_JSON_TO_FULL = {
  Acrobatics:
    "Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you're trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship's deck.",
  "Animal Handling":
    "When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal’s intentions, the GM might call for a Wisdom (Animal Handling) check.",
  Arcana:
    "Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.",
  Athletics:
    "Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming.",
  Deception:
    "Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions.",
  History:
    "Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.",
  Insight:
    "Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone’s next move.",
  Intimidation:
    "When you attempt to influence someone through overt threats, hostile actions, and physical violence, the GM might ask you to make a Charisma (Intimidation) check.",
  Investigation:
    "When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check.",
  Medicine: "A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness.",
  Nature:
    "Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.",
  Perception:
    "Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses.",
  Performance:
    "Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment.",
  Persuasion:
    "When you attempt to influence someone or a group of people with tact, social graces, or good nature, the GM might ask you to make a Charisma (Persuasion) check.",
  Religion:
    "Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults.",
  "Sleight of Hand":
    "Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check.",
  Stealth:
    "Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.",
  Survival:
    "The GM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards."
};

Parser.ACTION_JSON_TO_FULL = {
  Dash:
    "When you take the Dash action, you gain extra movement for the current turn. The increase equals your speed, after applying any modifiers. With a speed of 30 feet, for example, you can move up to 60 feet on your turn if you dash.",
  Disengage:
    "If you take the Disengage action, your movement doesn’t provoke opportunity attacks for the rest of the turn.",
  Dodge:
    "When you take the Dodge action, you focus entirely on avoiding attacks. Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage.",
  Help:
    "You can lend your aid to another creature in the completion of a task. The creature you aid gains advantage on the next ability check it makes to perform the task you are helping with, provided that it makes the check before the start of your next turn.",
  Hide:
    "When you take the Hide action, you make a Dexterity (Stealth) check in an attempt to hide, following the rules for hiding.",
  Ready:
    "Sometimes you want to get the jump on a foe or wait for a particular circumstance before you act. To do so, you can take the Ready action on your turn, which lets you act using your reaction before the start of your next turn."
};

Parser.NUMBERS_ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
Parser.NUMBERS_TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
Parser.NUMBERS_TEENS = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen"
];

export default Parser;