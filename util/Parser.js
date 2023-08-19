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
  if (!window.blah) window.blah = {}
  window.blah[a] = true;
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
    if (comp.m) {
      if (comp.m.length) {
        out.push(`M (${comp.m})`);
      } else if (comp.m.text) {
        out.push(`M (${comp.m.text})`);
      }
    }
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

Parser.SRC_CoS = "CoS";
Parser.SRC_DMG = "DMG";
Parser.SRC_EEPC = "EEPC";
Parser.SRC_EET = "EET";
Parser.SRC_HotDQ = "HotDQ";
Parser.SRC_LMoP = "LMoP";
Parser.SRC_MM = "MM";
Parser.SRC_OotA = "OotA";
Parser.SRC_PHB = "PHB";
Parser.SRC_PotA = "PotA";
Parser.SRC_RoT = "RoT";
Parser.SRC_RoTOS = "RoTOS";
Parser.SRC_SCAG = "SCAG";
Parser.SRC_SKT = "SKT";
Parser.SRC_ToA = "ToA";
Parser.SRC_TLK = "TLK";
Parser.SRC_ToD = "ToD";
Parser.SRC_TTP = "TTP";
Parser.SRC_TYP = "TftYP";
Parser.SRC_TYP_AtG = "TftYP-AtG";
Parser.SRC_TYP_DiT = "TftYP-DiT";
Parser.SRC_TYP_TFoF = "TftYP-TFoF";
Parser.SRC_TYP_THSoT = "TftYP-THSoT";
Parser.SRC_TYP_TSC = "TftYP-TSC";
Parser.SRC_TYP_ToH = "TftYP-ToH";
Parser.SRC_TYP_WPM = "TftYP-WPM";
Parser.SRC_VGM = "VGM";
Parser.SRC_XGE = "XGE";
Parser.SRC_OGA = "OGA";
Parser.SRC_MTF = "MTF";
Parser.SRC_WDH = "WDH";
Parser.SRC_WDMM = "WDMM";
Parser.SRC_GGR = "GGR";
Parser.SRC_KKW = "KKW";
Parser.SRC_LLK = "LLK";
Parser.SRC_AZfyT = "AZfyT";
Parser.SRC_GoS = "GoS";
Parser.SRC_AI = "AI";
Parser.SRC_OoW = "OoW";
Parser.SRC_ESK = "ESK";
Parser.SRC_DIP = "DIP";
Parser.SRC_HftT = "HftT";
Parser.SRC_DC = "DC";
Parser.SRC_SLW = "SLW";
Parser.SRC_SDW = "SDW";
Parser.SRC_BGDIA = "BGDIA";
Parser.SRC_LR = "LR";
Parser.SRC_AL = "AL";
Parser.SRC_SAC = "SAC";
Parser.SRC_ERLW = "ERLW";
Parser.SRC_EFR = "EFR";
Parser.SRC_RMBRE = "RMBRE";
Parser.SRC_RMR = "RMR";
Parser.SRC_MFF = "MFF";
Parser.SRC_AWM = "AWM";
Parser.SRC_IMR = "IMR";
Parser.SRC_SADS = "SADS";
Parser.SRC_EGW = "EGW";
Parser.SRC_EGW_ToR = "ToR";
Parser.SRC_EGW_DD = "DD";
Parser.SRC_EGW_FS = "FS";
Parser.SRC_EGW_US = "US";
Parser.SRC_MOT = "MOT";
Parser.SRC_IDRotF = "IDRotF";
Parser.SRC_TCE = "TCE";
Parser.SRC_VRGR = "VRGR";
Parser.SRC_HoL = "HoL";
Parser.SRC_XMtS = "XMtS";
Parser.SRC_RtG = "RtG";
Parser.SRC_AitFR = "AitFR";
Parser.SRC_AitFR_ISF = "AitFR-ISF";
Parser.SRC_AitFR_THP = "AitFR-THP";
Parser.SRC_AitFR_AVT = "AitFR-AVT";
Parser.SRC_AitFR_DN = "AitFR-DN";
Parser.SRC_AitFR_FCD = "AitFR-FCD";
Parser.SRC_WBtW = "WBtW";
Parser.SRC_DoD = "DoD";
Parser.SRC_MaBJoV = "MaBJoV";
Parser.SRC_FTD = "FTD";
Parser.SRC_SCC = "SCC";
Parser.SRC_SCC_CK = "SCC-CK";
Parser.SRC_SCC_HfMT = "SCC-HfMT";
Parser.SRC_SCC_TMM = "SCC-TMM";
Parser.SRC_SCC_ARiR = "SCC-ARiR";
Parser.SRC_MPMM = "MPMM";
Parser.SRC_CRCotN = "CRCotN";
Parser.SRC_JttRC = "JttRC";
Parser.SRC_SAiS = "SAiS";
Parser.SRC_AAG = "AAG";
Parser.SRC_BAM = "BAM";
Parser.SRC_LoX = "LoX";
Parser.SRC_DoSI = "DoSI";
Parser.SRC_DSotDQ = "DSotDQ";
Parser.SRC_KftGV = "KftGV";
Parser.SRC_SCREEN = "Screen";
Parser.SRC_SCREEN_WILDERNESS_KIT = "ScreenWildernessKit";
Parser.SRC_SCREEN_DUNGEON_KIT = "ScreenDungeonKit";
Parser.SRC_SCREEN_SPELLJAMMER = "ScreenSpelljammer";
Parser.SRC_HEROES_FEAST = "HF";
Parser.SRC_CM = "CM";
Parser.SRC_NRH = "NRH";
Parser.SRC_NRH_TCMC = "NRH-TCMC";
Parser.SRC_NRH_AVitW = "NRH-AVitW";
Parser.SRC_NRH_ASS = "NRH-ASS";
Parser.SRC_NRH_CoI = "NRH-CoI";
Parser.SRC_NRH_TLT = "NRH-TLT";
Parser.SRC_NRH_AWoL = "NRH-AWoL";
Parser.SRC_NRH_AT = "NRH-AT";
Parser.SRC_MGELFT = "MGELFT";
Parser.SRC_VD = "VD";
Parser.SRC_SjA = "SjA";
Parser.SRC_TG = "TG";
Parser.SRC_AL_PREFIX = "AL";
Parser.SRC_ALCoS = `${Parser.SRC_AL_PREFIX}CurseOfStrahd`;
Parser.SRC_ALEE = `${Parser.SRC_AL_PREFIX}ElementalEvil`;
Parser.SRC_ALRoD = `${Parser.SRC_AL_PREFIX}RageOfDemons`;
Parser.SRC_PS_PREFIX = "PS";
Parser.SRC_PSA = `${Parser.SRC_PS_PREFIX}A`;
Parser.SRC_PSI = `${Parser.SRC_PS_PREFIX}I`;
Parser.SRC_PSK = `${Parser.SRC_PS_PREFIX}K`;
Parser.SRC_PSZ = `${Parser.SRC_PS_PREFIX}Z`;
Parser.SRC_PSX = `${Parser.SRC_PS_PREFIX}X`;
Parser.SRC_PSD = `${Parser.SRC_PS_PREFIX}D`;
Parser.SRC_UA_PREFIX = "UA";
Parser.SRC_UA_ONE_PREFIX = "XUA";
Parser.SRC_MCVX_PREFIX = "MCV";
Parser.SRC_UAA = `${Parser.SRC_UA_PREFIX}Artificer`;
Parser.SRC_UAEAG = `${Parser.SRC_UA_PREFIX}EladrinAndGith`;
Parser.SRC_UAEBB = `${Parser.SRC_UA_PREFIX}Eberron`;
Parser.SRC_UAFFR = `${Parser.SRC_UA_PREFIX}FeatsForRaces`;
Parser.SRC_UAFFS = `${Parser.SRC_UA_PREFIX}FeatsForSkills`;
Parser.SRC_UAFO = `${Parser.SRC_UA_PREFIX}FiendishOptions`;
Parser.SRC_UAFT = `${Parser.SRC_UA_PREFIX}Feats`;
Parser.SRC_UAGH = `${Parser.SRC_UA_PREFIX}GothicHeroes`;
Parser.SRC_UAMDM = `${Parser.SRC_UA_PREFIX}ModernMagic`;
Parser.SRC_UASSP = `${Parser.SRC_UA_PREFIX}StarterSpells`;
Parser.SRC_UATMC = `${Parser.SRC_UA_PREFIX}TheMysticClass`;
Parser.SRC_UATOBM = `${Parser.SRC_UA_PREFIX}ThatOldBlackMagic`;
Parser.SRC_UATRR = `${Parser.SRC_UA_PREFIX}TheRangerRevised`;
Parser.SRC_UAWA = `${Parser.SRC_UA_PREFIX}WaterborneAdventures`;
Parser.SRC_UAVR = `${Parser.SRC_UA_PREFIX}VariantRules`;
Parser.SRC_UALDR = `${Parser.SRC_UA_PREFIX}LightDarkUnderdark`;
Parser.SRC_UARAR = `${Parser.SRC_UA_PREFIX}RangerAndRogue`;
Parser.SRC_UAATOSC = `${Parser.SRC_UA_PREFIX}ATrioOfSubclasses`;
Parser.SRC_UABPP = `${Parser.SRC_UA_PREFIX}BarbarianPrimalPaths`;
Parser.SRC_UARSC = `${Parser.SRC_UA_PREFIX}RevisedSubclasses`;
Parser.SRC_UAKOO = `${Parser.SRC_UA_PREFIX}KitsOfOld`;
Parser.SRC_UABBC = `${Parser.SRC_UA_PREFIX}BardBardColleges`;
Parser.SRC_UACDD = `${Parser.SRC_UA_PREFIX}ClericDivineDomains`;
Parser.SRC_UAD = `${Parser.SRC_UA_PREFIX}Druid`;
Parser.SRC_UARCO = `${Parser.SRC_UA_PREFIX}RevisedClassOptions`;
Parser.SRC_UAF = `${Parser.SRC_UA_PREFIX}Fighter`;
Parser.SRC_UAM = `${Parser.SRC_UA_PREFIX}Monk`;
Parser.SRC_UAP = `${Parser.SRC_UA_PREFIX}Paladin`;
Parser.SRC_UAMC = `${Parser.SRC_UA_PREFIX}ModifyingClasses`;
Parser.SRC_UAS = `${Parser.SRC_UA_PREFIX}Sorcerer`;
Parser.SRC_UAWAW = `${Parser.SRC_UA_PREFIX}WarlockAndWizard`;
Parser.SRC_UATF = `${Parser.SRC_UA_PREFIX}TheFaithful`;
Parser.SRC_UAWR = `${Parser.SRC_UA_PREFIX}WizardRevisited`;
Parser.SRC_UAESR = `${Parser.SRC_UA_PREFIX}ElfSubraces`;
Parser.SRC_UAMAC = `${Parser.SRC_UA_PREFIX}MassCombat`;
Parser.SRC_UA3PE = `${Parser.SRC_UA_PREFIX}ThreePillarExperience`;
Parser.SRC_UAGHI = `${Parser.SRC_UA_PREFIX}GreyhawkInitiative`;
Parser.SRC_UATSC = `${Parser.SRC_UA_PREFIX}ThreeSubclasses`;
Parser.SRC_UAOD = `${Parser.SRC_UA_PREFIX}OrderDomain`;
Parser.SRC_UACAM = `${Parser.SRC_UA_PREFIX}CentaursMinotaurs`;
Parser.SRC_UAGSS = `${Parser.SRC_UA_PREFIX}GiantSoulSorcerer`;
Parser.SRC_UARoE = `${Parser.SRC_UA_PREFIX}RacesOfEberron`;
Parser.SRC_UARoR = `${Parser.SRC_UA_PREFIX}RacesOfRavnica`;
Parser.SRC_UAWGE = `${Parser.SRC_UA_PREFIX}WGE`;
Parser.SRC_UAOSS = `${Parser.SRC_UA_PREFIX}OfShipsAndSea`;
Parser.SRC_UASIK = `${Parser.SRC_UA_PREFIX}Sidekicks`;
Parser.SRC_UAAR = `${Parser.SRC_UA_PREFIX}ArtificerRevisited`;
Parser.SRC_UABAM = `${Parser.SRC_UA_PREFIX}BarbarianAndMonk`;
Parser.SRC_UASAW = `${Parser.SRC_UA_PREFIX}SorcererAndWarlock`;
Parser.SRC_UABAP = `${Parser.SRC_UA_PREFIX}BardAndPaladin`;
Parser.SRC_UACDW = `${Parser.SRC_UA_PREFIX}ClericDruidWizard`;
Parser.SRC_UAFRR = `${Parser.SRC_UA_PREFIX}FighterRangerRogue`;
Parser.SRC_UACFV = `${Parser.SRC_UA_PREFIX}ClassFeatureVariants`;
Parser.SRC_UAFRW = `${Parser.SRC_UA_PREFIX}FighterRogueWizard`;
Parser.SRC_UAPCRM = `${Parser.SRC_UA_PREFIX}PrestigeClassesRunMagic`;
Parser.SRC_UAR = `${Parser.SRC_UA_PREFIX}Ranger`;
Parser.SRC_UA2020SC1 = `${Parser.SRC_UA_PREFIX}2020SubclassesPt1`;
Parser.SRC_UA2020SC2 = `${Parser.SRC_UA_PREFIX}2020SubclassesPt2`;
Parser.SRC_UA2020SC3 = `${Parser.SRC_UA_PREFIX}2020SubclassesPt3`;
Parser.SRC_UA2020SC4 = `${Parser.SRC_UA_PREFIX}2020SubclassesPt4`;
Parser.SRC_UA2020SC5 = `${Parser.SRC_UA_PREFIX}2020SubclassesPt5`;
Parser.SRC_UA2020SMT = `${Parser.SRC_UA_PREFIX}2020SpellsAndMagicTattoos`;
Parser.SRC_UA2020POR = `${Parser.SRC_UA_PREFIX}2020PsionicOptionsRevisited`;
Parser.SRC_UA2020SCR = `${Parser.SRC_UA_PREFIX}2020SubclassesRevisited`;
Parser.SRC_UA2020F = `${Parser.SRC_UA_PREFIX}2020Feats`;
Parser.SRC_UA2021GL = `${Parser.SRC_UA_PREFIX}2021GothicLineages`;
Parser.SRC_UA2021FF = `${Parser.SRC_UA_PREFIX}2021FolkOfTheFeywild`;
Parser.SRC_UA2021DO = `${Parser.SRC_UA_PREFIX}2021DraconicOptions`;
Parser.SRC_UA2021MoS = `${Parser.SRC_UA_PREFIX}2021MagesOfStrixhaven`;
Parser.SRC_UA2021TotM = `${Parser.SRC_UA_PREFIX}2021TravelersOfTheMultiverse`;
Parser.SRC_UA2022HoK = `${Parser.SRC_UA_PREFIX}2022HeroesOfKrynn`;
Parser.SRC_UA2022HoKR = `${Parser.SRC_UA_PREFIX}2022HeroesOfKrynnRevisited`;
Parser.SRC_UA2022GO = `${Parser.SRC_UA_PREFIX}2022GiantOptions`;
Parser.SRC_UA2022WotM = `${Parser.SRC_UA_PREFIX}2022WondersOfTheMultiverse`;
Parser.SRC_MCV1SC = `${Parser.SRC_MCVX_PREFIX}1SC`;
Parser.SRC_MCV2DC = `${Parser.SRC_MCVX_PREFIX}2DC`;
Parser.SRC_MCV3MC = `${Parser.SRC_MCVX_PREFIX}3MC`;
Parser.AL_PREFIX = "Adventurers League: ";
Parser.AL_PREFIX_SHORT = "AL: ";
Parser.PS_PREFIX = "Plane Shift: ";
Parser.PS_PREFIX_SHORT = "PS: ";
Parser.UA_PREFIX = "Unearthed Arcana: ";
Parser.UA_PREFIX_SHORT = "UA: ";
Parser.TftYP_NAME = "Tales from the Yawning Portal";
Parser.AitFR_NAME = "Adventures in the Forgotten Realms";
Parser.NRH_NAME = "NERDS Restoring Harmony";
Parser.MCVX_PREFIX = "Monstrous Compendium Volume ";
Parser.SOURCE_JSON_TO_FULL = {};
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_CoS] = "Curse of Strahd";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_DMG] = "Dungeon Master's Guide";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_EEPC] = "Elemental Evil Player's Companion";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_EET] = "Elemental Evil: Trinkets";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_HotDQ] = "Hoard of the Dragon Queen";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_LMoP] = "Lost Mine of Phandelver";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_MM] = "Monster Manual";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_OotA] = "Out of the Abyss";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_PHB] = "Player's Handbook";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_PotA] = "Princes of the Apocalypse";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_RoT] = "The Rise of Tiamat";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_RoTOS] = "The Rise of Tiamat Online Supplement";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SCAG] = "Sword Coast Adventurer's Guide";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SKT] = "Storm King's Thunder";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_ToA] = "Tomb of Annihilation";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TLK] = "The Lost Kenku";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_ToD] = "Tyranny of Dragons";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TTP] = "The Tortle Package";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TYP] = Parser.TftYP_NAME;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TYP_AtG] = `${Parser.TftYP_NAME}: Against the Giants`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TYP_DiT] = `${Parser.TftYP_NAME}: Dead in Thay`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TYP_TFoF] = `${Parser.TftYP_NAME}: The Forge of Fury`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TYP_THSoT] = `${Parser.TftYP_NAME}: The Hidden Shrine of Tamoachan`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TYP_TSC] = `${Parser.TftYP_NAME}: The Sunless Citadel`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TYP_ToH] = `${Parser.TftYP_NAME}: Tomb of Horrors`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TYP_WPM] = `${Parser.TftYP_NAME}: White Plume Mountain`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_VGM] = "Volo's Guide to Monsters";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_XGE] = "Xanathar's Guide to Everything";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_OGA] = "One Grung Above";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_MTF] = "Mordenkainen's Tome of Foes";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_WDH] = "Waterdeep: Dragon Heist";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_WDMM] = "Waterdeep: Dungeon of the Mad Mage";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_GGR] = "Guildmasters' Guide to Ravnica";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_KKW] = "Krenko's Way";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_LLK] = "Lost Laboratory of Kwalish";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AZfyT] = "A Zib for your Thoughts";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_GoS] = "Ghosts of Saltmarsh";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AI] = "Acquisitions Incorporated";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_OoW] = "The Orrery of the Wanderer";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_ESK] = "Essentials Kit";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_DIP] = "Dragon of Icespire Peak";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_HftT] = "Hunt for the Thessalhydra";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_DC] = "Divine Contention";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SLW] = "Storm Lord's Wrath";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SDW] = "Sleeping Dragon's Wake";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_BGDIA] = "Baldur's Gate: Descent Into Avernus";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_LR] = "Locathah Rising";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AL] = "Adventurers' League";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SAC] = "Sage Advice Compendium";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_ERLW] = "Eberron: Rising from the Last War";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_EFR] = "Eberron: Forgotten Relics";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_RMBRE] = "The Lost Dungeon of Rickedness: Big Rick Energy";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_RMR] = "Dungeons & Dragons vs. Rick and Morty: Basic Rules";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_MFF] = "Mordenkainen's Fiendish Folio";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AWM] = "Adventure with Muk";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_IMR] = "Infernal Machine Rebuild";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SADS] = "Sapphire Anniversary Dice Set";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_EGW] = "Explorer's Guide to Wildemount";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_EGW_ToR] = "Tide of Retribution";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_EGW_DD] = "Dangerous Designs";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_EGW_FS] = "Frozen Sick";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_EGW_US] = "Unwelcome Spirits";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_MOT] = "Mythic Odysseys of Theros";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_IDRotF] = "Icewind Dale: Rime of the Frostmaiden";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TCE] = "Tasha's Cauldron of Everything";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_VRGR] = "Van Richten's Guide to Ravenloft";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_HoL] = "The House of Lament";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_RtG] = "Return to Glory";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AitFR] = Parser.AitFR_NAME;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AitFR_ISF] = `${Parser.AitFR_NAME}: In Scarlet Flames`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AitFR_THP] = `${Parser.AitFR_NAME}: The Hidden Page`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AitFR_AVT] = `${Parser.AitFR_NAME}: A Verdant Tomb`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AitFR_DN] = `${Parser.AitFR_NAME}: Deepest Night`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AitFR_FCD] = `${Parser.AitFR_NAME}: From Cyan Depths`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_WBtW] = "The Wild Beyond the Witchlight";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_DoD] = "Domains of Delight";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_MaBJoV] = "Minsc and Boo's Journal of Villainy";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_FTD] = "Fizban's Treasury of Dragons";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SCC] = "Strixhaven: A Curriculum of Chaos";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SCC_CK] = "Campus Kerfuffle";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SCC_HfMT] = "Hunt for Mage Tower";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SCC_TMM] = "The Magister's Masquerade";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SCC_ARiR] = "A Reckoning in Ruins";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_MPMM] = "Mordenkainen Presents: Monsters of the Multiverse";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_CRCotN] = "Critical Role: Call of the Netherdeep";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_JttRC] = "Journeys through the Radiant Citadel";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SAiS] = "Spelljammer: Adventures in Space";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_AAG] = "Astral Adventurer's Guide";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_BAM] = "Boo's Astral Menagerie";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_LoX] = "Light of Xaryxis";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_DoSI] = "Dragons of Stormwreck Isle";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_DSotDQ] = "Dragonlance: Shadow of the Dragon Queen";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_KftGV] = "Keys from the Golden Vault";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SCREEN] = "Dungeon Master's Screen";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SCREEN_WILDERNESS_KIT] = "Dungeon Master's Screen: Wilderness Kit";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SCREEN_DUNGEON_KIT] = "Dungeon Master's Screen: Dungeon Kit";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SCREEN_SPELLJAMMER] = "Dungeon Master's Screen: Spelljammer";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_HEROES_FEAST] = "Heroes' Feast";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_CM] = "Candlekeep Mysteries";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_NRH] = Parser.NRH_NAME;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_NRH_TCMC] = `${Parser.NRH_NAME}: The Candy Mountain Caper`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_NRH_AVitW] = `${Parser.NRH_NAME}: A Voice in the Wilderness`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_NRH_ASS] = `${Parser.NRH_NAME}: A Sticky Situation`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_NRH_CoI] = `${Parser.NRH_NAME}: Circus of Illusions`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_NRH_TLT] = `${Parser.NRH_NAME}: The Lost Tomb`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_NRH_AWoL] = `${Parser.NRH_NAME}: A Web of Lies`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_NRH_AT] = `${Parser.NRH_NAME}: Adventure Together`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_MGELFT] = "Muk's Guide To Everything He Learned From Tasha";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_VD] = "Vecna Dossier";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_SjA] = "Spelljammer Academy";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_TG] = "Thieves' Gallery";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_ALCoS] = `${Parser.AL_PREFIX}Curse of Strahd`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_ALEE] = `${Parser.AL_PREFIX}Elemental Evil`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_ALRoD] = `${Parser.AL_PREFIX}Rage of Demons`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_PSA] = `${Parser.PS_PREFIX}Amonkhet`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_PSI] = `${Parser.PS_PREFIX}Innistrad`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_PSK] = `${Parser.PS_PREFIX}Kaladesh`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_PSZ] = `${Parser.PS_PREFIX}Zendikar`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_PSX] = `${Parser.PS_PREFIX}Ixalan`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_PSD] = `${Parser.PS_PREFIX}Dominaria`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_XMtS] = `X Marks the Spot`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAA] = `${Parser.UA_PREFIX}Artificer`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAEAG] = `${Parser.UA_PREFIX}Eladrin and Gith`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAEBB] = `${Parser.UA_PREFIX}Eberron`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAFFR] = `${Parser.UA_PREFIX}Feats for Races`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAFFS] = `${Parser.UA_PREFIX}Feats for Skills`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAFO] = `${Parser.UA_PREFIX}Fiendish Options`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAFT] = `${Parser.UA_PREFIX}Feats`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAGH] = `${Parser.UA_PREFIX}Gothic Heroes`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAMDM] = `${Parser.UA_PREFIX}Modern Magic`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UASSP] = `${Parser.UA_PREFIX}Starter Spells`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UATMC] = `${Parser.UA_PREFIX}The Mystic Class`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UATOBM] = `${Parser.UA_PREFIX}That Old Black Magic`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UATRR] = `${Parser.UA_PREFIX}The Ranger, Revised`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAWA] = `${Parser.UA_PREFIX}Waterborne Adventures`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAVR] = `${Parser.UA_PREFIX}Variant Rules`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UALDR] = `${Parser.UA_PREFIX}Light, Dark, Underdark!`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UARAR] = `${Parser.UA_PREFIX}Ranger and Rogue`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAATOSC] = `${Parser.UA_PREFIX}A Trio of Subclasses`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UABPP] = `${Parser.UA_PREFIX}Barbarian Primal Paths`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UARSC] = `${Parser.UA_PREFIX}Revised Subclasses`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAKOO] = `${Parser.UA_PREFIX}Kits of Old`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UABBC] = `${Parser.UA_PREFIX}Bard: Bard Colleges`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UACDD] = `${Parser.UA_PREFIX}Cleric: Divine Domains`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAD] = `${Parser.UA_PREFIX}Druid`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UARCO] = `${Parser.UA_PREFIX}Revised Class Options`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAF] = `${Parser.UA_PREFIX}Fighter`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAM] = `${Parser.UA_PREFIX}Monk`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAP] = `${Parser.UA_PREFIX}Paladin`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAMC] = `${Parser.UA_PREFIX}Modifying Classes`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAS] = `${Parser.UA_PREFIX}Sorcerer`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAWAW] = `${Parser.UA_PREFIX}Warlock and Wizard`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UATF] = `${Parser.UA_PREFIX}The Faithful`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAWR] = `${Parser.UA_PREFIX}Wizard Revisited`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAESR] = `${Parser.UA_PREFIX}Elf Subraces`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAMAC] = `${Parser.UA_PREFIX}Mass Combat`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA3PE] = `${Parser.UA_PREFIX}Three-Pillar Experience`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAGHI] = `${Parser.UA_PREFIX}Greyhawk Initiative`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UATSC] = `${Parser.UA_PREFIX}Three Subclasses`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAOD] = `${Parser.UA_PREFIX}Order Domain`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UACAM] = `${Parser.UA_PREFIX}Centaurs and Minotaurs`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAGSS] = `${Parser.UA_PREFIX}Giant Soul Sorcerer`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UARoE] = `${Parser.UA_PREFIX}Races of Eberron`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UARoR] = `${Parser.UA_PREFIX}Races of Ravnica`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAWGE] = "Wayfinder's Guide to Eberron";
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAOSS] = `${Parser.UA_PREFIX}Of Ships and the Sea`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UASIK] = `${Parser.UA_PREFIX}Sidekicks`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAAR] = `${Parser.UA_PREFIX}Artificer Revisited`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UABAM] = `${Parser.UA_PREFIX}Barbarian and Monk`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UASAW] = `${Parser.UA_PREFIX}Sorcerer and Warlock`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UABAP] = `${Parser.UA_PREFIX}Bard and Paladin`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UACDW] = `${Parser.UA_PREFIX}Cleric, Druid, and Wizard`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAFRR] = `${Parser.UA_PREFIX}Fighter, Ranger, and Rogue`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UACFV] = `${Parser.UA_PREFIX}Class Feature Variants`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAFRW] = `${Parser.UA_PREFIX}Fighter, Rogue, and Wizard`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAPCRM] = `${Parser.UA_PREFIX}Prestige Classes and Rune Magic`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UAR] = `${Parser.UA_PREFIX}Ranger`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2020SC1] = `${Parser.UA_PREFIX}2020 Subclasses, Part 1`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2020SC2] = `${Parser.UA_PREFIX}2020 Subclasses, Part 2`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2020SC3] = `${Parser.UA_PREFIX}2020 Subclasses, Part 3`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2020SC4] = `${Parser.UA_PREFIX}2020 Subclasses, Part 4`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2020SC5] = `${Parser.UA_PREFIX}2020 Subclasses, Part 5`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2020SMT] = `${Parser.UA_PREFIX}2020 Spells and Magic Tattoos`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2020POR] = `${Parser.UA_PREFIX}2020 Psionic Options Revisited`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2020SCR] = `${Parser.UA_PREFIX}2020 Subclasses Revisited`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2020F] = `${Parser.UA_PREFIX}2020 Feats`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2021GL] = `${Parser.UA_PREFIX}2021 Gothic Lineages`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2021FF] = `${Parser.UA_PREFIX}2021 Folk of the Feywild`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2021DO] = `${Parser.UA_PREFIX}2021 Draconic Options`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2021MoS] = `${Parser.UA_PREFIX}2021 Mages of Strixhaven`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2021TotM] = `${Parser.UA_PREFIX}2021 Travelers of the Multiverse`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2022HoK] = `${Parser.UA_PREFIX}2022 Heroes of Krynn`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2022HoKR] = `${Parser.UA_PREFIX}2022 Heroes of Krynn Revisited`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2022GO] = `${Parser.UA_PREFIX}2022 Giant Options`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_UA2022WotM] = `${Parser.UA_PREFIX}2022 Wonders of the Multiverse`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_MCV1SC] = `${Parser.MCVX_PREFIX}1: Spelljammer Creatures`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_MCV2DC] = `${Parser.MCVX_PREFIX}2: Dragonlance Creatures`;
Parser.SOURCE_JSON_TO_FULL[Parser.SRC_MCV3MC] = `${Parser.MCVX_PREFIX}3: Minecraft Creatures`;
Parser.SOURCE_JSON_TO_ABV = {};
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_CoS] = "CoS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_DMG] = "DMG";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_EEPC] = "EEPC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_EET] = "EET";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_HotDQ] = "HotDQ";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_LMoP] = "LMoP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_MM] = "MM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_OotA] = "OotA";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_PHB] = "PHB";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_PotA] = "PotA";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_RoT] = "RoT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_RoTOS] = "RoTOS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SCAG] = "SCAG";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SKT] = "SKT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_ToA] = "ToA";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TLK] = "TLK";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_ToD] = "ToD";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TTP] = "TTP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TYP] = "TftYP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TYP_AtG] = "TftYP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TYP_DiT] = "TftYP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TYP_TFoF] = "TftYP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TYP_THSoT] = "TftYP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TYP_TSC] = "TftYP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TYP_ToH] = "TftYP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TYP_WPM] = "TftYP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_VGM] = "VGM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_XGE] = "XGE";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_OGA] = "OGA";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_MTF] = "MTF";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_WDH] = "WDH";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_WDMM] = "WDMM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_GGR] = "GGR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_KKW] = "KKW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_LLK] = "LLK";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AZfyT] = "AZfyT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_GoS] = "GoS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AI] = "AI";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_OoW] = "OoW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_ESK] = "ESK";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_DIP] = "DIP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_HftT] = "HftT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_DC] = "DC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SLW] = "SLW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SDW] = "SDW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_BGDIA] = "BGDIA";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_LR] = "LR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AL] = "AL";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SAC] = "SAC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_ERLW] = "ERLW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_EFR] = "EFR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_RMBRE] = "RMBRE";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_RMR] = "RMR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_MFF] = "MFF";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AWM] = "AWM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_IMR] = "IMR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SADS] = "SADS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_EGW] = "EGW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_EGW_ToR] = "ToR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_EGW_DD] = "DD";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_EGW_FS] = "FS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_EGW_US] = "US";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_MOT] = "MOT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_IDRotF] = "IDRotF";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TCE] = "TCE";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_VRGR] = "VRGR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_HoL] = "HoL";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_RtG] = "RtG";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AitFR] = "AitFR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AitFR_ISF] = "AitFR-ISF";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AitFR_THP] = "AitFR-THP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AitFR_AVT] = "AitFR-AVT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AitFR_DN] = "AitFR-DN";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AitFR_FCD] = "AitFR-FCD";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_WBtW] = "WBtW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_DoD] = "DoD";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_MaBJoV] = "MaBJoV";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_FTD] = "FTD";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SCC] = "SCC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SCC_CK] = "SCC-CK";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SCC_HfMT] = "SCC-HfMT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SCC_TMM] = "SCC-TMM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SCC_ARiR] = "SCC-ARiR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_MPMM] = "MPMM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_CRCotN] = "CRCotN";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_JttRC] = "JttRC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SAiS] = "SAiS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_AAG] = "AAG";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_BAM] = "BAM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_LoX] = "LoX";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_DoSI] = "DoSI";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_DSotDQ] = "DSotDQ";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_KftGV] = "KftGV";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SCREEN] = "Screen";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SCREEN_WILDERNESS_KIT] = "ScWild";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SCREEN_DUNGEON_KIT] = "ScDun";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SCREEN_SPELLJAMMER] = "ScSJ";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_HEROES_FEAST] = "HF";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_CM] = "CM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_NRH] = "NRH";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_NRH_TCMC] = "NRH-TCMC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_NRH_AVitW] = "NRH-AVitW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_NRH_ASS] = "NRH-ASS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_NRH_CoI] = "NRH-CoI";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_NRH_TLT] = "NRH-TLT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_NRH_AWoL] = "NRH-AWoL";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_NRH_AT] = "NRH-AT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_MGELFT] = "MGELFT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_VD] = "VD";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_SjA] = "SjA";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_TG] = "TG";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_ALCoS] = "ALCoS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_ALEE] = "ALEE";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_ALRoD] = "ALRoD";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_PSA] = "PSA";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_PSI] = "PSI";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_PSK] = "PSK";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_PSZ] = "PSZ";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_PSX] = "PSX";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_PSD] = "PSD";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_XMtS] = "XMtS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAA] = "UA:A";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAEAG] = "UA:EaG";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAEBB] = "UA:EB";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAFFR] = "UA:FFR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAFFS] = "UA:FFS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAFO] = "UA:FO";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAFT] = "UA:FT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAGH] = "UA:GH";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAMDM] = "UA:MM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UASSP] = "UA:SS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UATMC] = "UA:My";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UATOBM] = "UA:OBM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UATRR] = "UA:TRR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAWA] = "UA:WA";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAVR] = "UA:VR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UALDR] = "UA:LDU";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UARAR] = "UA:RAR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAATOSC] = "UA:ATOSC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UABPP] = "UA:BPP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UARSC] = "UA:RSC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAKOO] = "UA:KoO";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UABBC] = "UA:BBC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UACDD] = "UA:CDD";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAD] = "UA:D";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UARCO] = "UA:RCO";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAF] = "UA:F";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAM] = "UA:Mk";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAP] = "UA:P";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAMC] = "UA:MC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAS] = "UA:S";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAWAW] = "UA:WAW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UATF] = "UA:TF";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAWR] = "UA:WR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAESR] = "UA:ESR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAMAC] = "UA:MAC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA3PE] = "UA:3PE";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAGHI] = "UA:GHI";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UATSC] = "UA:TSC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAOD] = "UA:OD";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UACAM] = "UA:CAM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAGSS] = "UA:GSS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UARoE] = "UA:RoE";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UARoR] = "UA:RoR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAWGE] = "UA:WGE";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAOSS] = "UA:OSS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UASIK] = "UA:SIK";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAAR] = "UA:AR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UABAM] = "UA:BAM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UASAW] = "UA:SAW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UABAP] = "UA:BAP";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UACDW] = "UA:CDW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAFRR] = "UA:FRR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UACFV] = "UA:CFV";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAFRW] = "UA:FRW";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAPCRM] = "UA:PCRM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UAR] = "UA:R";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2020SC1] = "UA:20S1";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2020SC2] = "UA:20S2";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2020SC3] = "UA:20S3";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2020SC4] = "UA:20S4";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2020SC5] = "UA:20S5";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2020SMT] = "UA:20SMT";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2020POR] = "UA:20POR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2020SCR] = "UA:20SCR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2020F] = "UA:20F";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2021GL] = "UA:21GL";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2021FF] = "UA:21FF";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2021DO] = "UA:21DO";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2021MoS] = "UA:21MoS";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2021TotM] = "UA:21TotM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2022HoK] = "UA:22HoK";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2022HoKR] = "UA:22HoKR";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2022GO] = "UA:22GO";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_UA2022WotM] = "UA:22WotM";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_MCV1SC] = "MCV1SC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_MCV2DC] = "MCV2DC";
Parser.SOURCE_JSON_TO_ABV[Parser.SRC_MCV3MC] = "MCV3MC";

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
  WD: "Wand",
  $: "Currency",
  OTH: "Other",
  AIR: "Airship",
  FD: "Food",
  MR: "Magic Rune",
  SHP: "Ship",
  SPC: "Spaceship",
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