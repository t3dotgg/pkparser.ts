import * as util from "./utils.ts";

export type PokeStruct = {
  // Uints
  ec: number;
  pid: number;
  exp: number;
  evHp: number;
  evAtk: number;
  evDef: number;
  evSpAtk: number;
  evSpDef: number;
  evSpe: number;
  ivHp: number;
  ivAtk: number;
  ivDef: number;
  ivSpe: number;
  ivSpAtk: number;
  ivSpDef: number;
  contestStatCool: number;
  contestStatBeauty: number;
  contestStatCute: number;
  contestStatSmart: number;
  contestStatTough: number;
  contestStatSheen: number;
  hpType: number;
  markings: number;

  // Ints
  pkrsStrain: number;
  pkrsDuration: number;
  levelMet: number;

  // Ushorts
  ability: number;
  abilityNum: number;
  nature: number;
  species: number;
  heldItem: number;
  tid: number;
  sid: number;
  tsv: number;
  esv: number;
  move1: number;
  move2: number;
  move3: number;
  move4: number;
  move1Pp: number;
  move2Pp: number;
  move3Pp: number;
  move4Pp: number;
  move1Ppu: number;
  move2Ppu: number;
  move3Ppu: number;
  move4Ppu: number;
  eggMove1: number;
  eggMove2: number;
  eggMove3: number;
  eggMove4: number;
  ribbonSet1: number;
  ribbonSet2: number;
  chk: number;
  otFriendship: number;
  otAffection: number;
  notOtFriendship: number;
  notOtAffection: number;
  eggLocation: number;
  metLocation: number;
  ball: number;
  encounterType: number;
  gameVersion: number;
  countryID: number;
  regionID: number;
  dsregID: number;
  otLang: number;

  // Shorts
  box: number;
  slot: number;

  // Bytes
  ribbonSet3: number;
  ribbonSet4: number;
  contestMemoryRibbonCount: number;
  battleMemoryRibbonCount: number;
  form: number;
  gender: number;

  metDate: [number, number, number];
  eggDate: [number, number, number];

  isEgg: boolean;
  isNick: boolean;
  isShiny: boolean;
  isGhost: boolean;
  isFatefulEncounter: boolean;
  otGender: boolean;
  notOtGender: boolean;
  currentHandler: boolean;

  geoRegion1: number;
  geoCountry1: number;
  geoRegion2: number;
  geoCountry2: number;
  geoRegion3: number;
  geoCountry3: number;
  geoRegion4: number;
  geoCountry4: number;
  geoRegion5: number;
  geoCountry5: number;

  fullness: number;
  enjoyment: number;

  data: number[];
  ribbonData: number[];

  nickname: string;
  notOT: string;
  ot: string;
};

export const createPokemonStructFromPk6 = (pkx: Uint8Array) => {
  var data = new DataView(pkx.buffer, pkx.byteOffset, pkx.byteLength);

  const ec = data.getUint32(0x0, true);
  const chk = data.getUint16(0x6, true);
  const species = data.getUint16(0x8, true);
  const heldItem = data.getUint16(0xa, true);
  const tid = data.getUint16(0xc, true);
  const sid = data.getUint16(0xe, true);
  const exp = data.getUint32(0x10, true);
  const ability = pkx[0x14];
  const abilityNum = pkx[0x15];
  const pid = data.getUint32(0x18, true);
  const nature = pkx[0x1c];
  const isFatefulEncounter = (pkx[0x1d] & 1) == 1;
  const gender = (pkx[0x1d] >> 1) & 3;
  const form = pkx[0x1d] >> 3;
  const evHp = pkx[0x1e];
  const evAtk = pkx[0x1f];
  const evDef = pkx[0x20];
  const evSpAtk = pkx[0x22];
  const evSpDef = pkx[0x23];
  const evSpe = pkx[0x21];
  const contestStatCool = pkx[0x24];
  const contestStatBeauty = pkx[0x25];
  const contestStatCute = pkx[0x26];
  const contestStatSmart = pkx[0x27];
  const contestStatTough = pkx[0x28];
  const contestStatSheen = pkx[0x29];
  const pkrsStrain = pkx[0x2b] >> 4;
  const pkrsDuration = pkx[0x2b] & 0xf;
  const ribbonSet1 = data.getUint16(0x30, true);
  const ribbonSet2 = data.getUint16(0x32, true);
  const ribbonSet3 = pkx[0x34];
  const ribbonSet4 = pkx[0x35];
  const ribbonData = Array.from(pkx.subarray(0x30, 0x38));
  const contestMemoryRibbonCount = pkx[0x38];
  const battleMemoryRibbonCount = pkx[0x39];

  // Block B
  const nickname = util.decodeUnicode16LE(pkx, 0x40, 24);
  // 0x58, 0x59 - unused
  const move1 = data.getUint16(0x5a, true);
  const move2 = data.getUint16(0x5c, true);
  const move3 = data.getUint16(0x5e, true);
  const move4 = data.getUint16(0x60, true);
  const move1Pp = pkx[0x62];
  const move2Pp = pkx[0x63];
  const move3Pp = pkx[0x64];
  const move4Pp = pkx[0x65];
  const move1Ppu = pkx[0x66];
  const move2Ppu = pkx[0x67];
  const move3Ppu = pkx[0x68];
  const move4Ppu = pkx[0x69];
  const eggMove1 = data.getUint16(0x6a, true);
  const eggMove2 = data.getUint16(0x6c, true);
  const eggMove3 = data.getUint16(0x6e, true);
  const eggMove4 = data.getUint16(0x70, true);

  var IV32 = data.getUint32(0x74, true);
  const ivHp = IV32 & 31;
  const ivAtk = (IV32 >> 5) & 31;
  const ivDef = (IV32 >> 10) & 31;
  const ivSpe = (IV32 >> 15) & 31;
  const ivSpAtk = (IV32 >> 20) & 31;
  const ivSpDef = (IV32 >> 25) & 31;
  const isEgg = ((IV32 >> 30) & 1) != 0;
  const isNick = IV32 >> 31 != 0;

  // Block C
  const notOT = util.decodeUnicode16LE(pkx, 0x78, 24);
  const notOtGender = pkx[0x92] != 0;
  const currentHandler = pkx[0x93] != 0;
  const notOtFriendship = pkx[0xa2];
  const notOtAffection = pkx[0xa3];
  const geoRegion1 = pkx[0x94];
  const geoCountry1 = pkx[0x95];
  const geoRegion2 = pkx[0x96];
  const geoCountry2 = pkx[0x97];
  const geoRegion3 = pkx[0x98];
  const geoCountry3 = pkx[0x99];
  const geoRegion4 = pkx[0x9a];
  const geoCountry4 = pkx[0x9b];
  const geoRegion5 = pkx[0x9c];
  const geoCountry5 = pkx[0x9d];
  const fullness = pkx[0xae];
  const enjoyment = pkx[0xaf];

  // Block D
  const ot = util.decodeUnicode16LE(pkx, 0xb0, 24);
  // 0xC8, 0xC9 - unused
  const otFriendship = pkx[0xca];
  const otAffection = pkx[0xcb]; // Handled by Memory Editor
  // 0xCC, 0xCD, 0xCE, 0xCF, 0xD0
  const eggDate =
    (pkx[0xd1] | pkx[0xd2] | pkx[0xd3]) != 0
      ? [pkx[0xd1] + 2000, pkx[0xd2] - 1, pkx[0xd3]]
      : [2000, 0, 1];
  const metDate =
    (pkx[0xd4] | pkx[0xd5] | pkx[0xd6]) != 0
      ? [pkx[0xd4] + 2000, pkx[0xd5] - 1, pkx[0xd6]]
      : [2000, 0, 1];
  // 0xD7 - unused
  const eggLocation = data.getUint16(0xd8, true);
  const metLocation = data.getUint16(0xda, true);
  const ball = pkx[0xdc];
  const levelMet = pkx[0xdd] & 127;
  const otGender = pkx[0xdd] >> 7 != 0;
  const encounterType = pkx[0xde];
  const gameVersion = pkx[0xdf];
  const countryID = pkx[0xe0];
  const regionID = pkx[0xe1];
  const dsregID = pkx[0xe2];
  const otLang = pkx[0xe3];

  const hpType =
    (((15 *
      ((ivHp & 1) +
        2 * (ivAtk & 1) +
        4 * (ivDef & 1) +
        8 * (ivSpe & 1) +
        16 * (ivSpAtk & 1) +
        32 * (ivSpDef & 1))) /
      63) |
      0) +
    1;

  const tsv = ((tid ^ sid) >> 4) & 0xffff;
  const esv = ((((pid >> 16) & 65535) ^ (pid & 65535)) >> 4) & 0xffff;

  const isShiny = tsv == esv;

  return {
    ec,
    chk,
    species,
    heldItem,
    tid,
    sid,
    exp,
    ability,
    abilityNum,
    pid,
    nature,
    isFatefulEncounter,
    gender,
    form,
    evHp,
    evAtk,
    evDef,
    evSpAtk,
    evSpDef,
    evSpe,
    contestStatCool,
    contestStatBeauty,
    contestStatCute,
    contestStatSmart,
    contestStatTough,
    contestStatSheen,
    pkrsStrain,
    pkrsDuration,
    ribbonSet1,
    ribbonSet2,
    ribbonSet3,
    ribbonSet4,
    ribbonData,
    contestMemoryRibbonCount,
    battleMemoryRibbonCount,
    nickname,
    move1,
    move2,
    move3,
    move4,
    move1Pp,
    move2Pp,
    move3Pp,
    move4Pp,
    move1Ppu,
    move2Ppu,
    move3Ppu,
    move4Ppu,
    eggMove1,
    eggMove2,
    eggMove3,
    eggMove4,
    ivHp,
    ivAtk,
    ivDef,
    ivSpe,
    ivSpAtk,
    ivSpDef,
    isEgg,
    isNick,
    notOT,
    notOtGender,
    currentHandler,
    notOtFriendship,
    notOtAffection,
    geoRegion1,
    geoCountry1,
    geoRegion2,
    geoCountry2,
    geoRegion3,
    geoCountry3,
    geoRegion4,
    geoCountry4,
    geoRegion5,
    geoCountry5,
    fullness,
    enjoyment,
    ot,
    otFriendship,
    otAffection,
    eggDate,
    metDate,
    eggLocation,
    metLocation,
    ball,
    levelMet,
    otGender,
    encounterType,
    gameVersion,
    countryID,
    regionID,
    dsregID,
    otLang,
    hpType,
    tsv,
    esv,
    isShiny,
  } as PokeStruct;
};

export const createPokemonStructFromPk8 = (pkx: Uint8Array) => {
  var data = new DataView(pkx.buffer, pkx.byteOffset, pkx.byteLength);

  const ec = data.getUint32(0x0, true);
  const chk = data.getUint16(0x6, true);
  const species = data.getUint16(0x8, true);
  const heldItem = data.getUint16(0xa, true);
  const tid = data.getUint16(0xc, true);
  const sid = data.getUint16(0xe, true);
  const exp = data.getUint32(0x10, true);
  const ability = pkx[0x14];
  const abilityNum = pkx[0x16] & 7;
  const pid = data.getUint32(0x1c, true);
  const nature = pkx[0x20];
  const canGigantamax = (pkx[0x16] & 16) != 0;
  const isFatefulEncounter = (pkx[0x22] & 1) == 1;
  const gender = (pkx[0x22] >> 2) & 3;
  const form = pkx[0x1d] >> 3;
  const evHp = pkx[0x26];
  const evAtk = pkx[0x27];
  const evDef = pkx[0x28];
  const evSpAtk = pkx[0x29];
  const evSpDef = pkx[0x2a];
  const evSpe = pkx[0x2b];
  const contestStatCool = pkx[0x2c];
  const contestStatBeauty = pkx[0x2d];
  const contestStatCute = pkx[0x2e];
  const contestStatSmart = pkx[0x2f];
  const contestStatTough = pkx[0x30];
  const contestStatSheen = pkx[0x31];
  const pkrsStrain = pkx[0x32] >> 4;
  const pkrsDuration = pkx[0x32] & 0xf;
  const ribbonSet1 = data.getUint16(0x30, true);
  const ribbonSet2 = data.getUint16(0x32, true);
  const ribbonSet3 = pkx[0x34];
  const ribbonSet4 = pkx[0x35];
  const ribbonData = Array.from(pkx.subarray(0x30, 0x38));
  const contestMemoryRibbonCount = pkx[0x38];
  const battleMemoryRibbonCount = pkx[0x39];

  // Block B
  const nickname = util.decodeUnicode16LE(pkx, 0x58, 24);
  // 0x58, 0x59 - unused
  const move1 = data.getUint16(0x72, true);
  const move2 = data.getUint16(0x74, true);
  const move3 = data.getUint16(0x76, true);
  const move4 = data.getUint16(0x78, true);
  const move1Pp = pkx[0x7a];
  const move2Pp = pkx[0x7b];
  const move3Pp = pkx[0x7c];
  const move4Pp = pkx[0x7d];
  const move1Ppu = pkx[0x7e];
  const move2Ppu = pkx[0x7f];
  const move3Ppu = pkx[0x80];
  const move4Ppu = pkx[0x81];
  const eggMove1 = data.getUint16(0x82, true);
  const eggMove2 = data.getUint16(0x84, true);
  const eggMove3 = data.getUint16(0x86, true);
  const eggMove4 = data.getUint16(0x88, true);

  var IV32 = data.getUint32(0x74, true);
  const ivHp = IV32 & 31;
  const ivAtk = (IV32 >> 5) & 31;
  const ivDef = (IV32 >> 10) & 31;
  const ivSpe = (IV32 >> 15) & 31;
  const ivSpAtk = (IV32 >> 20) & 31;
  const ivSpDef = (IV32 >> 25) & 31;
  const isEgg = ((IV32 >> 30) & 1) != 0;
  const isNick = IV32 >> 31 != 0;

  // Block C
  const notOT = util.decodeUnicode16LE(pkx, 0xa8, 24);
  const notOtGender = pkx[0xc2] != 0;
  const currentHandler = pkx[0xc4] != 0;
  const notOtFriendship = pkx[0xa2];
  const notOtAffection = pkx[0xa3];
  const geoRegion1 = pkx[0x94];
  const geoCountry1 = pkx[0x95];
  const geoRegion2 = pkx[0x96];
  const geoCountry2 = pkx[0x97];
  const geoRegion3 = pkx[0x98];
  const geoCountry3 = pkx[0x99];
  const geoRegion4 = pkx[0x9a];
  const geoCountry4 = pkx[0x9b];
  const geoRegion5 = pkx[0x9c];
  const geoCountry5 = pkx[0x9d];
  const fullness = pkx[0xae];
  const enjoyment = pkx[0xaf];

  // Block D
  const ot = util.decodeUnicode16LE(pkx, 0xf8, 24);
  // 0xC8, 0xC9 - unused
  const otFriendship = pkx[0xca];
  const otAffection = pkx[0xcb]; // Handled by Memory Editor
  // 0xCC, 0xCD, 0xCE, 0xCF, 0xD0
  const eggDate =
    (pkx[0xd1] | pkx[0xd2] | pkx[0xd3]) != 0
      ? [pkx[0xd1] + 2000, pkx[0xd2] - 1, pkx[0xd3]]
      : [2000, 0, 1];
  const metDate =
    (pkx[0xd4] | pkx[0xd5] | pkx[0xd6]) != 0
      ? [pkx[0xd4] + 2000, pkx[0xd5] - 1, pkx[0xd6]]
      : [2000, 0, 1];
  // 0xD7 - unused
  const eggLocation = data.getUint16(0xd8, true);
  const metLocation = data.getUint16(0xda, true);
  const ball = pkx[0xdc];
  const levelMet = pkx[0xdd] & 127;
  const otGender = pkx[0xdd] >> 7 != 0;
  const encounterType = pkx[0xde];
  const gameVersion = pkx[0xdf];
  const countryID = pkx[0xe0];
  const regionID = pkx[0xe1];
  const dsregID = pkx[0xe2];
  const otLang = pkx[0xe3];

  const hpType =
    (((15 *
      ((ivHp & 1) +
        2 * (ivAtk & 1) +
        4 * (ivDef & 1) +
        8 * (ivSpe & 1) +
        16 * (ivSpAtk & 1) +
        32 * (ivSpDef & 1))) /
      63) |
      0) +
    1;

  const tsv = ((tid ^ sid) >> 4) & 0xffff;
  const esv = ((((pid >> 16) & 65535) ^ (pid & 65535)) >> 4) & 0xffff;

  const isShiny = tsv == esv;

  return {
    ec,
    chk,
    species,
    heldItem,
    tid,
    sid,
    exp,
    ability,
    abilityNum,
    pid,
    nature,
    isFatefulEncounter,
    gender,
    form,
    evHp,
    evAtk,
    evDef,
    evSpAtk,
    evSpDef,
    evSpe,
    contestStatCool,
    contestStatBeauty,
    contestStatCute,
    contestStatSmart,
    contestStatTough,
    contestStatSheen,
    pkrsStrain,
    pkrsDuration,
    ribbonSet1,
    ribbonSet2,
    ribbonSet3,
    ribbonSet4,
    ribbonData,
    contestMemoryRibbonCount,
    battleMemoryRibbonCount,
    nickname,
    move1,
    move2,
    move3,
    move4,
    move1Pp,
    move2Pp,
    move3Pp,
    move4Pp,
    move1Ppu,
    move2Ppu,
    move3Ppu,
    move4Ppu,
    eggMove1,
    eggMove2,
    eggMove3,
    eggMove4,
    ivHp,
    ivAtk,
    ivDef,
    ivSpe,
    ivSpAtk,
    ivSpDef,
    isEgg,
    isNick,
    notOT,
    notOtGender,
    currentHandler,
    notOtFriendship,
    notOtAffection,
    geoRegion1,
    geoCountry1,
    geoRegion2,
    geoCountry2,
    geoRegion3,
    geoCountry3,
    geoRegion4,
    geoCountry4,
    geoRegion5,
    geoCountry5,
    fullness,
    enjoyment,
    ot,
    otFriendship,
    otAffection,
    eggDate,
    metDate,
    eggLocation,
    metLocation,
    ball,
    levelMet,
    otGender,
    encounterType,
    gameVersion,
    countryID,
    regionID,
    dsregID,
    otLang,
    hpType,
    tsv,
    esv,
    isShiny,
  } as PokeStruct;
};
