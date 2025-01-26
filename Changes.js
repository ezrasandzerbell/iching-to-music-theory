/**********************************************************************
 * 1) Basic music data & helpers
 **********************************************************************/

// Using sharps (C#) by default for accidentals.
const NOTE_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

/** Convert integer semitone => note name (0 => "C", 1 => "C#", etc.) */
function semitoneToName(s) {
  return NOTE_NAMES[((s % 12) + 12) % 12];
}

/** Convert note name => integer semitone (e.g. "C#" => 1). */
function nameToSemitone(n) {
  return NOTE_NAMES.indexOf(n);
}

/** Convert array of semitones => array of note name strings. */
function semitonesToNames(semitones) {
  return semitones.map(s => semitoneToName(s));
}

/**
 * Reorder a collection of semitones into a single octave from the first pitch,
 * removing duplicates. E.g. if first pitch = C => semitone 0, we might get
 * [0,2,3,5,7,9,10].
 */
function reorderToSingleOctave(allSemitones) {
  const root = allSemitones[0] % 12;
  const relative = allSemitones.map(s => (s - root + 12) % 12);
  const uniqueSorted = [...new Set(relative)].sort((a,b) => a - b);
  return uniqueSorted.map(x => root + x);
}

/** Check two arrays for element-wise equality. */
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
}

/**
 * Convert a trigram’s 3 lines => 4 absolute semitones from startSemitone.
 * lines: array of 3 bits (1 => +4 semitones, 0 => +3 semitones).
 */
function trigramToSemitones(lines, startSemitone) {
  let result = [startSemitone];
  let current = startSemitone;
  for (let bit of lines) {
    const interval = (bit === 1) ? 4 : 3;
    current += interval;
    result.push(current);
  }
  return result;
}

/**********************************************************************
 * 2) TRIGRAM DEFINITIONS
 **********************************************************************/
const TRIGRAMS = {
  "Qian":  { nameEn: "Heaven",   lines: [1,1,1] }, // 111
  "Kun":   { nameEn: "Earth",    lines: [0,0,0] }, // 000
  "Zhen":  { nameEn: "Thunder",  lines: [1,0,0] }, // 100
  "Xun":   { nameEn: "Wind",     lines: [0,1,1] }, // 011
  "Kan":   { nameEn: "Water",    lines: [0,1,0] }, // 010
  "Li":    { nameEn: "Fire",     lines: [1,0,1] }, // 101
  "Gen":   { nameEn: "Mountain", lines: [0,0,1] }, // 001
  "Dui":   { nameEn: "Lake",     lines: [1,1,0] }  // 110
};

/**********************************************************************
 * 3) 7th Chord Dictionary
 **********************************************************************/
const SEVENTH_CHORDS = [
  { name: "maj7",       intervals: [0,4,7,11] },
  { name: "dom7",       intervals: [0,4,7,10] },
  { name: "min7",       intervals: [0,3,7,10] },
  { name: "m7b5",       intervals: [0,3,6,10] }, // half-dim
  { name: "dim7",       intervals: [0,3,6,9] },  // fully dim
  { name: "min(maj7)",  intervals: [0,3,7,11] },
  { name: "augmaj7",    intervals: [0,4,8,11] },
  { name: "7#5",        intervals: [0,4,8,10] },
  { name: "aug7",       intervals: [0,4,8,10] }, // same as 7#5
];

/**
 * Name a 4-note chord from the bottom note. If it fails dictionary,
 * do a simple triad check for +, dim, etc.
 */
function nameFourNoteChord(notes4) {
  const rootName = notes4[0];
  const rootSemitone = nameToSemitone(rootName);

  // build array of intervals from that root
  let intervals = notes4.map(n => (nameToSemitone(n) - rootSemitone + 12) % 12);
  intervals.sort((a,b) => a - b);

  // compare to known 7th-chord sets
  for (let c of SEVENTH_CHORDS) {
    if (arraysEqual(intervals, c.intervals)) {
      return rootName + c.name;
    }
  }

  // fallback triad check
  let consecutive = [];
  for (let i=1; i<intervals.length; i++){
    consecutive.push( (intervals[i] - intervals[i-1] + 12) % 12 );
  }
  const pattern = consecutive.join("-");
  if (pattern==="4-4-0") return rootName + "+";
  if (pattern==="3-3-0") return rootName + "dim";
  if (pattern==="4-3-4") return rootName + "maj7";
  return rootName + "???";
}

/**********************************************************************
 * 4) LARGE SCALE DICTIONARY for 7-note sets
 **********************************************************************/
const KNOWN_SCALES = [
  // 7 modes of the major scale
  { name: "Ionian (Major)", intervals: [0,2,4,5,7,9,11] },
  { name: "Dorian",         intervals: [0,2,3,5,7,9,10] },
  { name: "Phrygian",       intervals: [0,1,3,5,7,8,10] },
  { name: "Lydian",         intervals: [0,2,4,6,7,9,11] },
  { name: "Mixolydian",     intervals: [0,2,4,5,7,9,10] },
  { name: "Aeolian (Nat. Minor)", intervals: [0,2,3,5,7,8,10] },
  { name: "Locrian",        intervals: [0,1,3,5,6,8,10] },

  // Harmonic & Melodic Minor
  { name: "Harmonic Minor", intervals: [0,2,3,5,7,8,11] },
  { name: "Melodic Minor",  intervals: [0,2,3,5,7,9,11] },

  // Other
  { name: "Double Harmonic",   intervals: [0,1,4,5,7,8,11] },
  { name: "Neapolitan Minor",  intervals: [0,1,3,5,7,8,10] },
  { name: "Neapolitan Major",  intervals: [0,1,3,5,7,9,11] },
  { name: "Phrygian Dominant", intervals: [0,1,4,5,7,8,10] },
  { name: "Hungarian Minor",   intervals: [0,2,3,6,7,8,11] },
];

/** Identify a 7-note set if it matches the known scale dictionary. */
function name7NoteScale(absSemitones) {
  if (absSemitones.length !== 7) {
    return "Not a 7-note collection";
  }
  const root = absSemitones[0] % 12;
  let intervals = absSemitones.map(x => (x-root+12)%12).sort((a,b)=>a-b);

  for (let sc of KNOWN_SCALES) {
    if (arraysEqual(intervals, sc.intervals)) {
      return semitoneToName(root) + " " + sc.name;
    }
  }
  return "Unrecognized 7-note scale";
}

/**********************************************************************
 * 5) 64 HEXAGRAMS (CLASSICAL ORDER)
 *
 * Each entry now has the truly-lower trigram in 'bottom'
 * and the truly-upper trigram in 'top', for all 64 hexagrams.
 * That ensures the code prints "Bottom: Li" then "Top: Gen"
 * for #22, etc.
 **********************************************************************/
const ICHING_HEXAGRAMS = [
  // #1   Qian (Heaven over Heaven)
  { index: 1,  nameZh: "Qian",   nameEn: "The Creative", bottom: "Qian", top: "Qian" },
  // #2   Kun (Earth over Earth)
  { index: 2,  nameZh: "Kun",    nameEn: "The Receptive", bottom: "Kun", top: "Kun" },
  // #3   Zhun (Water over Thunder)
  { index: 3,  nameZh: "Zhun",   nameEn: "Difficulty at the Beginning", bottom: "Zhen", top: "Kan" },
  // #4   Meng (Mountain over Water)
  { index: 4,  nameZh: "Meng",   nameEn: "Youthful Folly", bottom: "Kan", top: "Gen" },
  // #5   Xu (Water over Heaven)
  { index: 5,  nameZh: "Xu",     nameEn: "Waiting", bottom: "Qian", top: "Kan" },
  // #6   Song (Heaven over Water)
  { index: 6,  nameZh: "Song",   nameEn: "Conflict", bottom: "Kan", top: "Qian" },
  // #7   Shi (Earth over Water)
  { index: 7,  nameZh: "Shi",    nameEn: "The Army", bottom: "Kan", top: "Kun" },
  // #8   Bi (Water over Earth)
  { index: 8,  nameZh: "Bi",     nameEn: "Holding Together", bottom: "Kun", top: "Kan" },
  // #9   Xiao Chu (Wind over Heaven)
  { index: 9,  nameZh: "Xiao Chu", nameEn: "The Taming Power of the Small", bottom: "Qian", top: "Xun" },
  // #10  Lu (Heaven over Lake)
  { index: 10, nameZh: "Lu",     nameEn: "Treading", bottom: "Dui", top: "Qian" },
  // #11  Tai (Earth over Heaven)
  { index: 11, nameZh: "Tai",    nameEn: "Peace", bottom: "Qian", top: "Kun" },
  // #12  Pi (Heaven over Earth)
  { index: 12, nameZh: "Pi",     nameEn: "Standstill", bottom: "Kun", top: "Qian" },
  // #13  Tong Ren (Heaven over Fire)
  { index: 13, nameZh: "Tong Ren", nameEn: "Fellowship with Men", bottom: "Li", top: "Qian" },
  // #14  Da You (Fire over Heaven)
  { index: 14, nameZh: "Da You", nameEn: "Great Possession", bottom: "Qian", top: "Li" },
  // #15  Qian (Earth over Mountain)
  { index: 15, nameZh: "Qian",   nameEn: "Modesty", bottom: "Gen", top: "Kun" },
  // #16  Yu (Thunder over Earth)
  { index: 16, nameZh: "Yu",     nameEn: "Enthusiasm", bottom: "Kun", top: "Zhen" },
  // #17  Sui (Lake over Thunder)
  { index: 17, nameZh: "Sui",    nameEn: "Following", bottom: "Zhen", top: "Dui" },
  // #18  Gu (Mountain over Wind)
  { index: 18, nameZh: "Gu",     nameEn: "Work on the Decayed", bottom: "Xun", top: "Gen" },
  // #19  Lin (Earth over Lake)
  { index: 19, nameZh: "Lin",    nameEn: "Approach", bottom: "Dui", top: "Kun" },
  // #20  Guan (Wind over Earth)
  { index: 20, nameZh: "Guan",   nameEn: "Contemplation", bottom: "Kun", top: "Xun" },
  // #21  Shi He (Fire over Thunder)
  { index: 21, nameZh: "Shi He", nameEn: "Biting Through", bottom: "Zhen", top: "Li" },
  // #22  Bi (Mountain over Fire) -- note the key requirement
  { index: 22, nameZh: "Bi",     nameEn: "Grace", bottom: "Li", top: "Gen" },
  // #23  Bo (Mountain over Earth)
  { index: 23, nameZh: "Bo",     nameEn: "Splitting Apart", bottom: "Kun", top: "Gen" },
  // #24  Fu (Earth over Thunder)
  { index: 24, nameZh: "Fu",     nameEn: "Return", bottom: "Zhen", top: "Kun" },
  // #25  Wu Wang (Heaven over Thunder)
  { index: 25, nameZh: "Wu Wang", nameEn: "Innocence", bottom: "Zhen", top: "Qian" },
  // #26  Da Chu (Mountain over Heaven)
  { index: 26, nameZh: "Da Chu", nameEn: "Taming Power of the Great", bottom: "Qian", top: "Gen" },
  // #27  Yi (Mountain over Thunder)
  { index: 27, nameZh: "Yi",     nameEn: "Nourishing", bottom: "Zhen", top: "Gen" },
  // #28  Da Guo (Lake over Wind)
  { index: 28, nameZh: "Da Guo", nameEn: "Preponderance of the Great", bottom: "Xun", top: "Dui" },
  // #29  Kan (Water over Water)
  { index: 29, nameZh: "Kan",    nameEn: "The Abysmal (Water)", bottom: "Kan", top: "Kan" },
  // #30  Li (Fire over Fire)
  { index: 30, nameZh: "Li",     nameEn: "The Clinging (Fire)", bottom: "Li", top: "Li" },
  // #31  Xian (Lake over Mountain)
  { index: 31, nameZh: "Xian",   nameEn: "Influence", bottom: "Gen", top: "Dui" },
  // #32  Heng (Thunder over Wind)
  { index: 32, nameZh: "Heng",   nameEn: "Duration", bottom: "Xun", top: "Zhen" },
  // #33  Dun (Heaven over Mountain)
  { index: 33, nameZh: "Dun",    nameEn: "Retreat", bottom: "Gen", top: "Qian" },
  // #34  Da Zhuang (Thunder over Heaven)
  { index: 34, nameZh: "Da Zhuang", nameEn: "Great Power", bottom: "Qian", top: "Zhen" },
  // #35  Jin (Fire over Earth)
  { index: 35, nameZh: "Jin",    nameEn: "Progress", bottom: "Kun", top: "Li" },
  // #36  Ming Yi (Earth over Fire)
  { index: 36, nameZh: "Ming Yi", nameEn: "Darkening of the Light", bottom: "Li", top: "Kun" },
  // #37  Jia Ren (Fire over Wind)
  { index: 37, nameZh: "Jia Ren", nameEn: "The Family", bottom: "Xun", top: "Li" },
  // #38  Kui (Lake over Fire)
  { index: 38, nameZh: "Kui",    nameEn: "Opposition", bottom: "Li", top: "Dui" },
  // #39  Jian (Water over Mountain)
  { index: 39, nameZh: "Jian",   nameEn: "Obstruction", bottom: "Gen", top: "Kan" },
  // #40  Xie (Thunder over Water)
  { index: 40, nameZh: "Xie",    nameEn: "Deliverance", bottom: "Kan", top: "Zhen" },
  // #41  Sun (Mountain over Lake)
  { index: 41, nameZh: "Sun",    nameEn: "Decrease", bottom: "Dui", top: "Gen" },
  // #42  Yi (Wind over Lake)
  { index: 42, nameZh: "Yi",     nameEn: "Increase", bottom: "Dui", top: "Xun" },
  // #43  Guai (Lake over Heaven)
  { index: 43, nameZh: "Guai",   nameEn: "Break-through", bottom: "Qian", top: "Dui" },
  // #44  Gou (Heaven over Lake)
  { index: 44, nameZh: "Gou",    nameEn: "Coming to Meet", bottom: "Dui", top: "Qian" },
  // #45  Cui (Lake over Earth)
  { index: 45, nameZh: "Cui",    nameEn: "Gathering Together", bottom: "Kun", top: "Dui" },
  // #46  Sheng (Earth over Wind)
  { index: 46, nameZh: "Sheng",  nameEn: "Pushing Upward", bottom: "Xun", top: "Kun" },
  // #47  Kun (Water over Lake)
  { index: 47, nameZh: "Kun",    nameEn: "Oppression (Exhaustion)", bottom: "Dui", top: "Kan" },
  // #48  Jing (Well) (Wind over Water)
  { index: 48, nameZh: "Jing",   nameEn: "The Well", bottom: "Kan", top: "Xun" },
  // #49  Ge (Revolution) (Lake over Fire)
  { index: 49, nameZh: "Ge",     nameEn: "Revolution (Molting)", bottom: "Li", top: "Dui" },
  // #50  Ding (Cauldron) (Fire over Wind)
  { index: 50, nameZh: "Ding",   nameEn: "The Cauldron", bottom: "Xun", top: "Li" },
  // #51  Zhen (Thunder over Thunder)
  { index: 51, nameZh: "Zhen",   nameEn: "The Arousing (Shock)", bottom: "Zhen", top: "Zhen" },
  // #52  Gen (Mountain over Mountain)
  { index: 52, nameZh: "Gen",    nameEn: "Keeping Still (Mountain)", bottom: "Gen", top: "Gen" },
  // #53  Jian (Development) (Wind over Mountain)
  { index: 53, nameZh: "Jian",   nameEn: "Development (Gradual Progress)", bottom: "Gen", top: "Xun" },
  // #54  Gui Mei (Marrying Maiden) (Thunder over Lake)
  { index: 54, nameZh: "Gui Mei", nameEn: "The Marrying Maiden", bottom: "Dui", top: "Zhen" },
  // #55  Feng (Abundance) (Thunder over Fire)
  { index: 55, nameZh: "Feng",   nameEn: "Abundance (Fullness)", bottom: "Li", top: "Zhen" },
  // #56  Lu (The Wanderer) (Fire over Mountain)
  { index: 56, nameZh: "Lu",     nameEn: "The Wanderer", bottom: "Gen", top: "Li" },
  // #57  Xun (Wind over Wind)
  { index: 57, nameZh: "Xun",    nameEn: "The Gentle (Wind)", bottom: "Xun", top: "Xun" },
  // #58  Dui (Lake over Lake)
  { index: 58, nameZh: "Dui",    nameEn: "The Joyous (Lake)", bottom: "Dui", top: "Dui" },
  // #59  Huan (Dispersion) (Wind over Water)
  { index: 59, nameZh: "Huan",   nameEn: "Dispersion", bottom: "Kan", top: "Xun" },
  // #60  Jie (Limitation) (Water over Lake)
  { index: 60, nameZh: "Jie",    nameEn: "Limitation", bottom: "Dui", top: "Kan" },
  // #61  Zhong Fu (Inner Truth) (Wind over Lake)
  { index: 61, nameZh: "Zhong Fu", nameEn: "Inner Truth", bottom: "Dui", top: "Xun" },
  // #62  Xiao Guo (Preponderance of the Small) (Thunder over Mountain)
  { index: 62, nameZh: "Xiao Guo", nameEn: "Preponderance of the Small", bottom: "Gen", top: "Zhen" },
  // #63  Ji Ji (After Completion) (Water over Fire)
  { index: 63, nameZh: "Ji Ji",  nameEn: "After Completion", bottom: "Li", top: "Kan" },
  // #64  Wei Ji (Before Completion) (Fire over Water)
  { index: 64, nameZh: "Wei Ji", nameEn: "Before Completion", bottom: "Kan", top: "Li" },
];

/**********************************************************************
 * 6) MAIN: generate each hexagram’s notes, chord, scale, then print
 **********************************************************************/

function runAllHexagrams() {
  for (const hx of ICHING_HEXAGRAMS) {
    // 1) get the “bottom” trigram from hx.bottom
    const bottomObj = TRIGRAMS[hx.bottom];
    // 2) get the “top” trigram from hx.top
    const topObj = TRIGRAMS[hx.top];

    // 3) build the bottom chord from C=0
    const bottomSemis = trigramToSemitones(bottomObj.lines, 0);
    const bottomNotes = semitonesToNames(bottomSemis);
    const bottomChord = nameFourNoteChord(bottomNotes);

    // 4) top chord starts from the last note of bottom
    const lastBottom = bottomSemis[bottomSemis.length - 1];
    const topSemis   = trigramToSemitones(topObj.lines, lastBottom);
    const topNotes   = semitonesToNames(topSemis);
    const topChord   = nameFourNoteChord(topNotes);

    // 5) combine => 7 distinct steps (skipping topSemis[0] which duplicates)
    const combined = bottomSemis.concat(topSemis.slice(1));
    const singleOct = reorderToSingleOctave(combined);
    const singleOctNames = semitonesToNames(singleOct);
    const scaleName = name7NoteScale(singleOct);

    // 6) Print final
    console.log(
      `#${hx.index}  ${hx.nameZh} (${hx.nameEn})\n` +
      `   Bottom: ${hx.bottom} [${bottomNotes.join(", ")}] => ${bottomChord}\n` +
      `   Top:    ${hx.top} [${topNotes.join(", ")}] => ${topChord}\n` +
      `   7-note set: [${singleOctNames.join(", ")}] => ${scaleName}\n`
    );
  }
}

// Run it:
runAllHexagrams();
