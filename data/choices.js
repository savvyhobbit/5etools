export const classOptionsMap = {
  "artificer(ua)": {
    class: {
      2: {
        name: "Wonderous Invention",
        count: 1,
        options: ["{@item Bag of holding}", "{@item cap of water breathing}", "{@item driftglobe}", "{@item goggles of night}", "{@item sending stones}"]
      },
      5: {
        name: "Wonderous Invention",
        count: 1,
        options: ["{@item Alchemy jug}", "{@item helm of comprehending languages}", "{@item lantern of revealing}", "{@item ring of swimming}", "{@item robe of useful items}", "{@item rope of climbing}", "{@item wand of magic detection}", "{@item wand of secrets}", "{@item Bag of holding}", "{@item cap of water breathing}", "{@item driftglobe}", "{@item goggles of night}", "{@item sending stones}"]
      },
      10: {
        name: "Wonderous Invention",
        count: 1,
        options: ["{@item Bag of beans}", "{@item chime of opening}", "{@item decanter of endless water}", "{@item eyes of minute seeing}", "{@item folding boat}", "{@item Heward's handy haversack}", "{@item Alchemy jug}", "{@item helm of comprehending languages}", "{@item lantern of revealing}", "{@item ring of swimming}", "{@item robe of useful items}", "{@item rope of climbing}", "{@item wand of magic detection}", "{@item wand of secrets}", "{@item Bag of holding}", "{@item cap of water breathing}", "{@item driftglobe}", "{@item goggles of night}", "{@item sending stones}"]
      },
      15: {
        name: "Wonderous Invention",
        count: 1,
        options: ["{@item Boots of striding and springing}", "{@item bracers of archery}", "{@item brooch of shielding}", "{@item broom of flying}", "{@item hat of disguise}", "{@item slippers of spider climbing}", "{@item Bag of beans}", "{@item chime of opening}", "{@item decanter of endless water}", "{@item eyes of minute seeing}", "{@item folding boat}", "{@item Heward's handy haversack}", "{@item Alchemy jug}", "{@item helm of comprehending languages}", "{@item lantern of revealing}", "{@item ring of swimming}", "{@item robe of useful items}", "{@item rope of climbing}", "{@item wand of magic detection}", "{@item wand of secrets}", "{@item Bag of holding}", "{@item cap of water breathing}", "{@item driftglobe}", "{@item goggles of night}", "{@item sending stones}"]
      },
      20: {
        name: "Wonderous Invention",
        count: 1,
        options: ["{@item Eyes of the eagle}", "{@item gem of brightness}", "{@item gloves of missile snaring}", "{@item gloves of swimming and climbing}", "{@item ring of jumping}", "{@item ring of mind shielding}", "{@item wings of flying}", "{@item Boots of striding and springing}", "{@item bracers of archery}", "{@item brooch of shielding}", "{@item broom of flying}", "{@item hat of disguise}", "{@item slippers of spider climbing}", "{@item Bag of beans}", "{@item chime of opening}", "{@item decanter of endless water}", "{@item eyes of minute seeing}", "{@item folding boat}", "{@item Heward's handy haversack}", "{@item Alchemy jug}", "{@item helm of comprehending languages}", "{@item lantern of revealing}", "{@item ring of swimming}", "{@item robe of useful items}", "{@item rope of climbing}", "{@item wand of magic detection}", "{@item wand of secrets}", "{@item Bag of holding}", "{@item cap of water breathing}", "{@item driftglobe}", "{@item goggles of night}", "{@item sending stones}"]
      }
    }
  },
  "artificer (revisited)": {
    class: {
      2: {
        name: "Infuse Item",
        count: 3,
        type: "featureType=ai|source=UAArtificerRevisited"
      },
      4: {
        name: "Infuse Item",
        count: 1,
        type: "featureType=ai|source=UAArtificerRevisited"
      },
      7: {
        name: "Infuse Item",
        count: 1,
        type: "featureType=ai|source=UAArtificerRevisited"
      },
      11: {
        name: "Infuse Item",
        count: 1,
        type: "featureType=ai|source=UAArtificerRevisited"
      },
      15: {
        name: "Infuse Item",
        count: 1,
        type: "featureType=ai|source=UAArtificerRevisited"
      },
      19: {
        name: "Infuse Item",
        count: 1,
        type: "featureType=ai|source=UAArtificerRevisited"
      }
    }
  },
  artificer: {
    class: {
      2: {
        name: "Infuse Item",
        count: 4,
        type: "featureType=ai|source=TCE"
      },
      6: {
        name: "Infuse Item",
        count: 2,
        type: "featureType=ai|source=TCE"
      },
      10: {
        name: "Infuse Item",
        count: 2,
        type: "featureType=ai|source=TCE"
      },
      14: {
        name: "Infuse Item",
        count: 2,
        type: "featureType=ai|source=TCE"
      },
      18: {
        name: "Infuse Item",
        count: 2,
        type: "featureType=ai|source=TCE"
      }
    }
  },
  barbarian: {
    subclasses: {
      "Path of the Totem Warrior": {
        3: {
          name: "Totem Spirit",
          count: 1,
          options: ["Bear", "Eagle", "Elk", "Tiger", "Wolf"]
        },
        6: {
          name: "Aspect of the Beast",
          count: 1,
          options: ["Bear", "Eagle", "Elk", "Tiger", "Wolf"]
        },
        14: {
          name: "Totemic Attunement",
          count: 1,
          options: ["Bear", "Eagle", "Elk", "Tiger", "Wolf"]
        }
      }
    }
  },
  bard: {
    subclasses: {
      "College of Swords": {
        3: {
          name: "Fighting Style",
          count: 1,
          type: "fs:b"
        }
      }
    }
  },
  fighter: {
    class: {
      1: {
        name: "Fighting Style",
        type: "fs:f",
        count: 1
      }
    }
  },
  paladin: {
    class: {
      2: {
        name: "Fighting Style",
        type: "fs:p",
        count: 1
      },
    }
  },
  ranger: {
    class: {
      2: {
        name: "Fighting Style",
        type: "fs:r",
        count: 1
      },
    }
  },
  sorcerer: {
    class: {
      3: {
        name: "Metamagic",
        type: "mm",
        count: 2
      },
      10: {
        name: "Metamagic",
        type: "mm",
        count: 1
      },
      17: {
        name: "Metamagic",
        type: "mm",
        count: 1
      }
    },
    subclasses: {
      "Divine Soul": {
        1: [
          {
            name: "Divine Magic Affinity",
            options: ["Good (Cure Wounds)", "Evil (Inflict Wounds)", "Law (Bless)", "Chaos (Bane)", "Neutrality (Protection From Good and Evil"],
            count: 1
          }
        ]
      }
    }
  },
  warlock: {
    class: {
      2: {
        name: "Eldritch Invocations",
        type: "ei",
        count: 2
      },
      3: {
        name: "Pact Boon",
        type: "pb",
        count: 1
      },
      5: {
        name: "Eldritch Invocations",
        type: "ei",
        count: 1
      },
      7: {
        name: "Eldritch Invocations",
        type: "ei",
        count: 1
      },
      9: {
        name: "Eldritch Invocations",
        type: "ei",
        count: 1
      },
      12: {
        name: "Eldritch Invocations",
        type: "ei",
        count: 1
      },
      15: {
        name: "Eldritch Invocations",
        type: "ei",
        count: 1
      },
      18: {
        name: "Eldritch Invocations",
        type: "ei",
        count: 1
      }
    }
  }
};

export const proficiencyGains = {
  classes: {
    "artificer(ua)": {
      subclasses: {
        "Gunsmith": {
          1: {
            name: "Master Smith",
            value: "{@item smith's tools|phb}"
          }
        }
      }
    },
    "Artificer (Revisited)": {
      subclasses: {
        "Alchemist": {
          3: {
            name: "Tools of the Trade",
            value: ["{@item alchemist's supplies|phb}", "{@item herbalism kit|phb}"]
          }
        },
        "Archivist": {
          3: {
            name: "Tools of the Trade",
            value: ["{@item calligrapher's supplies|phb}", "{@item forgery kit|phb}"]
          }
        },
        "Artillerist": {
          3: {
            name: "Tools of the Trade",
            value: ["{@item smith's tools|phb}", "{@item woodcarver's tools|phb}"]
          }
        },
        "Battle Smith": {
          3: [
            {
              name: "Tools of the Trade",
              value: ["{@item leatherworker's tools|phb}", "{@item smith's tools|phb}"]
            }, 
            {
              name: "Battle Ready",
              value: "martial weapons"
            }
          ]
        }
      }
    },
    artificer: {
      subclasses: {
        "Alchemist": {
          3: {
            name: "Tool Proficiency",
            value: "alchemist's supplies",
            orOther: true,
            type: "artisan's tools"
          }
        },
        "Artillerist": {
          3: {
            name: "Tool Proficiency",
            value: "woodcarver's supplies"
          }
        },
        "Battle Smith": {
          3: [
            {
              name: "Tool Proficiency",
              value: "smith's supplies"
            },
            {
              name: "Battle Ready",
              value: "martial weapons"
            }
          ]
        },
        "Armorer (UA)": {
          3: {
            name: "Tricks of the Trade",
            value: ["heavy armor", "smith's tools"]
          }
        }
      }
    }
  }
};

export const spellGains = {
  classes: {
    "artificer(ua)": {
      subclasses: {
        "Gunsmith": {
          1: {
            name: "",
            value: "mending"
          }
        }
      }
    },
    "Artificer (Revisited)": {
      subclasses: {
        "Alchemist": {
          14: {
            name: "Chemical Savant",
            value: "greater restoration",
            noSlot: true,
            noMaterial: true,
            recharge: "long rest"
          }
        }
      }
    },
    "artificer": {
      subclasses: {
        "Alchemist": {
          14: {
            name: "Chemical Mastery",
            value: ["greater restoration", "heal"],
            noSlot: true,
            noMaterial: true,
            recharge: "long rest"
          }
        }
      }
    },
    barbarian: {
      subclasses: {
        "Path of the Totem Warrior": {
          3: {
            name: "Spirit Seeker",
            value: ["beast sense", "speak with animals"],
            ritualOnly: true,
            noSlot: true
          }
        },
        "Path of the Ancestral Guardian v2 (UA)": {
          10: {
            name: "Consult the Spirits",
            value: "clairvoyance",
            noSlot: true
          }
        },
        "Path of the Ancestral Guardian": {
          10: {
            name: "Consult the Spirits",
            value: ["augury", "clairvoyance"],
            noSlot: true,
            noMaterial: true,
            recharge: "short rest"
          }
        },
        "Path of the Wild Soul (UA)": {
          3: {
            name: "Lingering Magic",
            value: "detect magic",
            noSlot: true,
            noMaterial: true,
            recharge: "long rest",
            charges: "con"
          }
        }
      }
    },
    bard: {
      subclasses: {
        "College of Lore": {
          6: {
            name: "",
            count: 2,
            list: "any"
          }
        }
      },
      class: {
        10: {
          name: "Magical Secrets",
          count: 2,
          list: "any"
        },
        14: {
          name: "",
          count: 2,
          list: "any"
        },
        18: {
          name: "",
          count: 2,
          list: "any"
        }
      }
    }
  }
};

export const expertiseClasses = {
  "artificer(ua)": {
    2: {
      name: "Tool Expertise",
      type: "artificier-tools"
    }
  },
  "Artificer (Revisited)": {
    3: {
      name: "Tool Expertise",
      type: "artificier-tools"
    }
  },
  "Artificer": {
    6: {
      name: "Tool Expertise",
      type: "artificier-tools"
    }
  },
  bard: {
    3: 2,
    10: 2
  }
};

export const itemGains = {
  "Artificer (Revisited)": {
    subclasses: {
      "Alchemist": {
        3: {
          name: "Tools of the Trade",
          value: ["{@item alchemist's supplies|phb}", "{@item herbalism kit|phb}"]
        }
      },
      "Archivist": {
        3: {
          name: "Tools of the Trade",
          value: ["{@item calligrapher's supplies|phb}", "{@item forgery kit|phb}"]
        }
      },
      "Artillerist": {
        3: {
          name: "Tools of the Trade",
          value: ["{@item smith's tools|phb}", "{@item woodcarver's tools|phb}", "a nonmagical, wooden wand"]
        }
      },
      "Battle Smith": {
        3: {
          name: "Tools of the Trade",
          value: ["{@item leatherworker's tools|phb}", "{@item smith's tools|phb}"]
        }
      }
    }
  }
};

export const resistanceGains = {
  class: {
    "Artificer (Revisited)": {
      subclasses: {
        "Alchemist": {
          14: [
            {
              name: "Chemical Savant",
              level: "resistance",
              type: "damage",
              value: "acid"
            },
            {
              name: "Chemical Savant",
              level: "resistance",
              type: "damage",
              value: "poison"
            },
            {
              name: "Chemical Savant",
              level: "immunity",
              type: "condition",
              value: "poisoned"
            }
          ]
        }
      }
    }
  },
  artificer: {
    subclasses: {
      "Alchemist": {
        15: [
          {
            name: "Chemical Mastery",
            level: "resistance",
            type: "damage",
            value: "acid"
          },
          {
            name: "Chemical Mastery",
            level: "resistance",
            type: "damage",
            value: "poison"
          },
          {
            name: "Chemical Mastery",
            level: "immunity",
            type: "condition",
            value: "poisoned"
          }
        ]
      }
    }
  }
};
