# I Ching Music Mapping

This repository contains a JavaScript script that maps all 64 I Ching hexagrams to musical chords and scales. Each hexagram is interpreted as a two‐trigram stack, translating broken (0) and unbroken (1) lines into musical intervals (3 or 4 semitones, respectively). The code then:

1. **Generates a 4‐note chord** for the bottom trigram (starting on C=0).  
2. **Continues** from the final note of the bottom trigram to generate a 4‐note chord for the top trigram.  
3. **Combines** the resulting 7 pitches into a single‐octave set, detecting whether they form a known 7‐note scale (e.g., Ionian, Mixolydian, Melodic Minor, etc.).  
4. **Prints** the chord names for bottom and top trigram, plus any recognized 7‐note scale name.

---

## File Overview

- **`changes.js`**:  
  - Defines the 8 trigrams and their interval patterns.  
  - Lists all 64 hexagrams in classical (King Wen) order, each with a bottom and top trigram.  
  - Translates trigram lines → musical intervals.  
  - Names the resulting 4‐note chords.  
  - Checks the 7‐note collections for known scales.

---

## How It Works

1. **Trigram Lines to Chords**  
   Each trigram has three lines. Unbroken (1) means +4 semitones (major 3rd), broken (0) means +3 semitones (minor 3rd). Three intervals stacked from C=0 yields a 4‐note chord.

2. **Hexagrams**  
   - Two trigrams (bottom + top).  
   - The top trigram starts where the bottom ended, giving 7 distinct pitches total.  

3. **Chord & Scale Naming**  
   - 4‐note sets are matched to a dictionary of seventh chords (maj7, min7, etc.).  
   - The final 7‐note collection is matched to a dictionary of scales (major modes, melodic minor, etc.).

---

## Installation & Usage

1. **Clone** this repository or download the code.  
2. Ensure [Node.js](https://nodejs.org/) is installed.  
3. In a terminal, navigate into the project folder and run: node changes.js
The script will print all 64 hexagrams, their bottom + top chords, and a possible scale name (if recognized).

---

## Discovery of emergent diatonic scales

All standard 7 diatonic scales emerged naturally, as did common variations like harmonic and melodic minor, phrygian dominant. The index does not yet include non western scales, which would likely lead to other common scales emerging. I apologize in advance for the use of redundant enharmonic spellings like D and D# in the same row. The code could be improved over time, but the core proof is still present here.

#22 Bi (Grace) Bottom: Li [C, E, G, B] =&gt; Cmaj7 Top: Gen [B, D, F, A] =&gt; Bm7b5 7-note set: [C, D, E, F, G, A, B] =&gt; C Ionian (Major)

#64 Wei Ji (Before Completion) Bottom: Kan [C, D#, G, A#] =&gt; Cmin7 Top: Li [A#, D, F, A] =&gt; A#maj7 7-note set: [C, D, D#, F, G, A, A#] =&gt; C Dorian

#29 Kan (The Abysmal (Water)) Bottom: Kan [C, D#, G, A#] =&gt; Cmin7 Top: Kan [A#, C#, F, G#] =&gt; A#min7 7-note set: [C, C#, D#, F, G, G#, A#] =&gt; C Phrygian

#3 Zhun (Difficulty at the Beginning)
Bottom: Zhen [C, E, G, A#] =&gt; Cdom7
Top: Kan [A#, C#, F, G#] =&gt; A#min7
7-note set: [C, C#, E, F, G, G#, A#] =&gt; C Phrygian Dominant

#63 Ji Ji (After Completion) Bottom: Li [C, E, G, B] =&gt; Cmaj7 Top: Kan [B, D, F#, A] =&gt; Bmin7 7-note set: [C, D, E, F#, G, A, B] =&gt; C Lydian

#21 Shi He (Biting Through) Bottom: Zhen [C, E, G, A#] =&gt; Cdom7 Top: Li [A#, D, F, A] =&gt; A#maj7 7-note set: [C, D, E, F, G, A, A#] =&gt; C Mixolydian

#40 Xie (Deliverance) Bottom: Kan [C, D#, G, A#] =&gt; Cmin7 Top: Zhen [A#, D, F, G#] =&gt; A#dom7 7-note set: [C, D, D#, F, G, G#, A#] =&gt; C Aeolian (Nat. Minor)

#18 Gu (Work on the Decayed)
Bottom: Xun [C, D#, G, B] =&gt; Cmin(maj7)
Top: Gen [B, D, F, A] =&gt; Bm7b5
7-note set: [C, D, D#, F, G, A, B] =&gt; C Melodic Minor

#46 Sheng (Pushing Upward) Bottom: Xun [C, D#, G, B] =&gt; Cmin(maj7) Top: Kun [B, D, F, G#] =&gt; Bdim7 7-note set: [C, D, D#, F, G, G#, B] =&gt; C Harmonic Minor

#39 Jian (Obstruction)
Bottom: Gen [C, D#, F#, A#] =&gt; Cm7b5
Top: Kan [A#, C#, F, G#] =&gt; A#min7
7-note set: [C, C#, D#, F, F#, G#, A#] =&gt; C Locrian

---

## Scales not yet labeled

#1 Qian (The Creative)
Bottom: Qian [C, E, G#, C] => C???
Top: Qian [C, E, G#, C] => C???
7-note set: [C, E, G#] => Not a 7-note collection

#2 Kun (The Receptive)
Bottom: Kun [C, D#, F#, A] => Cdim7
Top: Kun [A, C, D#, F#] => Adim7
7-note set: [C, D#, F#, A] => Not a 7-note collection

#4 Meng (Youthful Folly)
Bottom: Kan [C, D#, G, A#] => Cmin7
Top: Gen [A#, C#, E, G#] => A#m7b5
7-note set: [C, C#, D#, E, G, G#, A#] => Unrecognized 7-note scale

#5 Xu (Waiting)
Bottom: Qian [C, E, G#, C] => C???
Top: Kan [C, D#, G, A#] => Cmin7
7-note set: [C, D#, E, G, G#, A#] => Not a 7-note collection

#6 Song (Conflict)
Bottom: Kan [C, D#, G, A#] => Cmin7
Top: Qian [A#, D, F#, A#] => A#???
7-note set: [C, D, D#, F#, G, A#] => Not a 7-note collection

#7 Shi (The Army)
Bottom: Kan [C, D#, G, A#] => Cmin7
Top: Kun [A#, C#, E, G] => A#dim7
7-note set: [C, C#, D#, E, G, A#] => Not a 7-note collection

#8 Bi (Holding Together)
Bottom: Kun [C, D#, F#, A] => Cdim7
Top: Kan [A, C, E, G] => Amin7
7-note set: [C, D#, E, F#, G, A] => Not a 7-note collection

#9 Xiao Chu (The Taming Power of the Small)
Bottom: Qian [C, E, G#, C] => C???
Top: Xun [C, D#, G, B] => Cmin(maj7)
7-note set: [C, D#, E, G, G#, B] => Not a 7-note collection

#10 Lu (Treading)
Bottom: Dui [C, E, G#, B] => Caugmaj7
Top: Qian [B, D#, G, B] => B???
7-note set: [C, D#, E, G, G#, B] => Not a 7-note collection

#11 Tai (Peace)
Bottom: Qian [C, E, G#, C] => C???
Top: Kun [C, D#, F#, A] => Cdim7
7-note set: [C, D#, E, F#, G#, A] => Not a 7-note collection

#12 Pi (Standstill)
Bottom: Kun [C, D#, F#, A] => Cdim7
Top: Qian [A, C#, F, A] => A???
7-note set: [C, C#, D#, F, F#, A] => Not a 7-note collection

#13 Tong Ren (Fellowship with Men)
Bottom: Li [C, E, G, B] => Cmaj7
Top: Qian [B, D#, G, B] => B???
7-note set: [C, D#, E, G, B] => Not a 7-note collection

#14 Da You (Great Possession)
Bottom: Qian [C, E, G#, C] => C???
Top: Li [C, E, G, B] => Cmaj7
7-note set: [C, E, G, G#, B] => Not a 7-note collection

#15 Qian (Modesty)
Bottom: Gen [C, D#, F#, A#] => Cm7b5
Top: Kun [A#, C#, E, G] => A#dim7
7-note set: [C, C#, D#, E, F#, G, A#] => Unrecognized 7-note scale

#16 Yu (Enthusiasm)
Bottom: Kun [C, D#, F#, A] => Cdim7
Top: Zhen [A, C#, E, G] => Adom7
7-note set: [C, C#, D#, E, F#, G, A] => Unrecognized 7-note scale

#17 Sui (Following)
Bottom: Zhen [C, E, G, A#] => Cdom7
Top: Dui [A#, D, F#, A] => A#augmaj7
7-note set: [C, D, E, F#, G, A, A#] => Unrecognized 7-note scale

#19 Lin (Approach)
Bottom: Dui [C, E, G#, B] => Caugmaj7
Top: Kun [B, D, F, G#] => Bdim7
7-note set: [C, D, E, F, G#, B] => Not a 7-note collection

#20 Guan (Contemplation)
Bottom: Kun [C, D#, F#, A] => Cdim7
Top: Xun [A, C, E, G#] => Amin(maj7)
7-note set: [C, D#, E, F#, G#, A] => Not a 7-note collection

#23 Bo (Splitting Apart)
Bottom: Kun [C, D#, F#, A] => Cdim7
Top: Gen [A, C, D#, G] => Am7b5
7-note set: [C, D#, F#, G, A] => Not a 7-note collection

#24 Fu (Return)
Bottom: Zhen [C, E, G, A#] => Cdom7
Top: Kun [A#, C#, E, G] => A#dim7
7-note set: [C, C#, E, G, A#] => Not a 7-note collection

#25 Wu Wang (Innocence)
Bottom: Zhen [C, E, G, A#] => Cdom7
Top: Qian [A#, D, F#, A#] => A#???
7-note set: [C, D, E, F#, G, A#] => Not a 7-note collection

#26 Da Chu (Taming Power of the Great)
Bottom: Qian [C, E, G#, C] => C???
Top: Gen [C, D#, F#, A#] => Cm7b5
7-note set: [C, D#, E, F#, G#, A#] => Not a 7-note collection

#27 Yi (Nourishing)
Bottom: Zhen [C, E, G, A#] => Cdom7
Top: Gen [A#, C#, E, G#] => A#m7b5
7-note set: [C, C#, E, G, G#, A#] => Not a 7-note collection

#28 Da Guo (Preponderance of the Great)
Bottom: Xun [C, D#, G, B] => Cmin(maj7)
Top: Dui [B, D#, G, A#] => Baugmaj7
7-note set: [C, D#, G, A#, B] => Not a 7-note collection

#30 Li (The Clinging (Fire))
Bottom: Li [C, E, G, B] => Cmaj7
Top: Li [B, D#, F#, A#] => Bmaj7
7-note set: [C, D#, E, F#, G, A#, B] => Unrecognized 7-note scale

#31 Xian (Influence)
Bottom: Gen [C, D#, F#, A#] => Cm7b5
Top: Dui [A#, D, F#, A] => A#augmaj7
7-note set: [C, D, D#, F#, A, A#] => Not a 7-note collection

#32 Heng (Duration)
Bottom: Xun [C, D#, G, B] => Cmin(maj7)
Top: Zhen [B, D#, F#, A] => Bdom7
7-note set: [C, D#, F#, G, A, B] => Not a 7-note collection

#33 Dun (Retreat)
Bottom: Gen [C, D#, F#, A#] => Cm7b5
Top: Qian [A#, D, F#, A#] => A#???
7-note set: [C, D, D#, F#, A#] => Not a 7-note collection

#34 Da Zhuang (Great Power)
Bottom: Qian [C, E, G#, C] => C???
Top: Zhen [C, E, G, A#] => Cdom7
7-note set: [C, E, G, G#, A#] => Not a 7-note collection

#35 Jin (Progress)
Bottom: Kun [C, D#, F#, A] => Cdim7
Top: Li [A, C#, E, G#] => Amaj7
7-note set: [C, C#, D#, E, F#, G#, A] => Unrecognized 7-note scale

#36 Ming Yi (Darkening of the Light)
Bottom: Li [C, E, G, B] => Cmaj7
Top: Kun [B, D, F, G#] => Bdim7
7-note set: [C, D, E, F, G, G#, B] => Unrecognized 7-note scale

#37 Jia Ren (The Family)
Bottom: Xun [C, D#, G, B] => Cmin(maj7)
Top: Li [B, D#, F#, A#] => Bmaj7
7-note set: [C, D#, F#, G, A#, B] => Not a 7-note collection

#38 Kui (Opposition)
Bottom: Li [C, E, G, B] => Cmaj7
Top: Dui [B, D#, G, A#] => Baugmaj7
7-note set: [C, D#, E, G, A#, B] => Not a 7-note collection

#41 Sun (Decrease)
Bottom: Dui [C, E, G#, B] => Caugmaj7
Top: Gen [B, D, F, A] => Bm7b5
7-note set: [C, D, E, F, G#, A, B] => Unrecognized 7-note scale

#42 Yi (Increase)
Bottom: Dui [C, E, G#, B] => Caugmaj7
Top: Xun [B, D, F#, A#] => Bmin(maj7)
7-note set: [C, D, E, F#, G#, A#, B] => Unrecognized 7-note scale

#43 Guai (Break-through)
Bottom: Qian [C, E, G#, C] => C???
Top: Dui [C, E, G#, B] => Caugmaj7
7-note set: [C, E, G#, B] => Not a 7-note collection

#44 Gou (Coming to Meet)
Bottom: Dui [C, E, G#, B] => Caugmaj7
Top: Qian [B, D#, G, B] => B???
7-note set: [C, D#, E, G, G#, B] => Not a 7-note collection

#45 Cui (Gathering Together)
Bottom: Kun [C, D#, F#, A] => Cdim7
Top: Dui [A, C#, F, G#] => Aaugmaj7
7-note set: [C, C#, D#, F, F#, G#, A] => Unrecognized 7-note scale

#47 Kun (Oppression (Exhaustion))
Bottom: Dui [C, E, G#, B] => Caugmaj7
Top: Kan [B, D, F#, A] => Bmin7
7-note set: [C, D, E, F#, G#, A, B] => Unrecognized 7-note scale

#48 Jing (The Well)
Bottom: Kan [C, D#, G, A#] => Cmin7
Top: Xun [A#, C#, F, A] => A#min(maj7)
7-note set: [C, C#, D#, F, G, A, A#] => Unrecognized 7-note scale

#49 Ge (Revolution (Molting))
Bottom: Li [C, E, G, B] => Cmaj7
Top: Dui [B, D#, G, A#] => Baugmaj7
7-note set: [C, D#, E, G, A#, B] => Not a 7-note collection

#50 Ding (The Cauldron)
Bottom: Xun [C, D#, G, B] => Cmin(maj7)
Top: Li [B, D#, F#, A#] => Bmaj7
7-note set: [C, D#, F#, G, A#, B] => Not a 7-note collection

#51 Zhen (The Arousing (Shock))
Bottom: Zhen [C, E, G, A#] => Cdom7
Top: Zhen [A#, D, F, G#] => A#dom7
7-note set: [C, D, E, F, G, G#, A#] => Unrecognized 7-note scale

#52 Gen (Keeping Still (Mountain))
Bottom: Gen [C, D#, F#, A#] => Cm7b5
Top: Gen [A#, C#, E, G#] => A#m7b5
7-note set: [C, C#, D#, E, F#, G#, A#] => Unrecognized 7-note scale

#53 Jian (Development (Gradual Progress))
Bottom: Gen [C, D#, F#, A#] => Cm7b5
Top: Xun [A#, C#, F, A] => A#min(maj7)
7-note set: [C, C#, D#, F, F#, A, A#] => Unrecognized 7-note scale

#54 Gui Mei (The Marrying Maiden)
Bottom: Dui [C, E, G#, B] => Caugmaj7
Top: Zhen [B, D#, F#, A] => Bdom7
7-note set: [C, D#, E, F#, G#, A, B] => Unrecognized 7-note scale

#55 Feng (Abundance (Fullness))
Bottom: Li [C, E, G, B] => Cmaj7
Top: Zhen [B, D#, F#, A] => Bdom7
7-note set: [C, D#, E, F#, G, A, B] => Unrecognized 7-note scale

#56 Lu (The Wanderer)
Bottom: Gen [C, D#, F#, A#] => Cm7b5
Top: Li [A#, D, F, A] => A#maj7
7-note set: [C, D, D#, F, F#, A, A#] => Unrecognized 7-note scale

#57 Xun (The Gentle (Wind))
Bottom: Xun [C, D#, G, B] => Cmin(maj7)
Top: Xun [B, D, F#, A#] => Bmin(maj7)
7-note set: [C, D, D#, F#, G, A#, B] => Unrecognized 7-note scale

#58 Dui (The Joyous (Lake))
Bottom: Dui [C, E, G#, B] => Caugmaj7
Top: Dui [B, D#, G, A#] => Baugmaj7
7-note set: [C, D#, E, G, G#, A#, B] => Unrecognized 7-note scale

#59 Huan (Dispersion)
Bottom: Kan [C, D#, G, A#] => Cmin7
Top: Xun [A#, C#, F, A] => A#min(maj7)
7-note set: [C, C#, D#, F, G, A, A#] => Unrecognized 7-note scale

#60 Jie (Limitation)
Bottom: Dui [C, E, G#, B] => Caugmaj7
Top: Kan [B, D, F#, A] => Bmin7
7-note set: [C, D, E, F#, G#, A, B] => Unrecognized 7-note scale

#61 Zhong Fu (Inner Truth)
Bottom: Dui [C, E, G#, B] => Caugmaj7
Top: Xun [B, D, F#, A#] => Bmin(maj7)
7-note set: [C, D, E, F#, G#, A#, B] => Unrecognized 7-note scale

#62 Xiao Guo (Preponderance of the Small)
Bottom: Gen [C, D#, F#, A#] => Cm7b5
Top: Zhen [A#, D, F, G#] => A#dom7
7-note set: [C, D, D#, F, F#, G#, A#] => Unrecognized 7-note scale


