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
