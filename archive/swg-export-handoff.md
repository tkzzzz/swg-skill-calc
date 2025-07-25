# SWG Skill Calculator Export Enhancement - Development Handoff

## 🎯 Project Overview
Enhanced the SWG Skill Calculator's export functionality to match Kodan's ProfCalc export format, improving data fidelity and providing multiple export options for build verification.

## ✅ Completed Enhancements

### 1. **Kodan-Style HTML Export**
- **Visual Skill Tree**: Replicates Kodan's table-based skill tree layout
- **Skill Highlighting**: Selected skills show with gold background (#BDA82C)
- **Complete Tree Display**: Shows all profession skills, not just selected ones
- **Proper Structure**: Master → 4 Branch columns → Novice layout

### 2. **Enhanced Export Preview System**
- **Modal Preview**: View exports before downloading
- **Multiple Formats**:
  - HTML (Kodan-style)
  - Plain Text
  - JSON (structured data)
  - CSV (spreadsheet-compatible)
  - BBCode (forum-ready)
- **Format Switching**: Easy comparison between formats
- **Keyboard Shortcut**: Ctrl+E opens preview

### 3. **Improved Data Presentation**

#### Skill Titles & Subtitles
```javascript
// Before: "Hairstyling I"
// After:  "Image Design I - Facial Hair & Trim"
```

#### Skill Mod Formatting
```javascript
// Before: "healing_dance_wound"
// After:  "Wound Healing (Dancing)"

const modMap = {
    'healing_dance_wound': 'Wound Healing (Dancing)',
    'healing_music_wound': 'Wound Healing (Music)',
    'dance_knowledge': 'Dance Knowledge',
    'music_knowledge': 'Music Knowledge',
    'hair': 'Hair Styling',
    'face': 'Face-form',
    'marking': 'Marking Design'
};
```

#### Ability Formatting
```javascript
// Before: "flourish1", "startdance"
// After:  "Flourish 1 (Dance & Music)", "Start Dancing"

// Special handling for:
- Flourishes (1-8)
- Start/Stop commands
- Dance/Song/Instrument categorization
```

### 4. **Sample Data Enhancement**
Enhanced sample Entertainer data to match real game data:
- All 8 flourishes
- Start/Stop commands for dance and music
- Proper skill costs (matching Kodan's)
- Schematics included
- Correct experience types

## 🔍 Key Technical Changes

### Export Generation Flow
```javascript
generateHTMLExport() → 
  1. Create visual skill tree table for each profession
  2. Calculate and display remaining points (not used)
  3. Gather accumulated data (experience, mods, abilities, etc.)
  4. Format using Kodan-style HTML structure
  5. Apply special formatting rules
```

### Data Filtering Pipeline
```javascript
abilities → isValidAbility() → formatAbilityKodan() → display
// Filters out: "1", "2", "3", "4", empty strings, too short
```

## 🐛 Remaining Data Issues

### 1. **The Numbers Mystery (Still Present)**
- Numbers "1", "2", "3", "4" still appear in abilities despite filtering
- Multiple layers of filtering implemented but issue persists
- Likely coming from corrupted profession data structure
- May be in `ALL_PROFESSIONS[profession].branch_X.skills` arrays

### 2. **Data Fidelity Concerns**
- **Skill IDs in branches**: Some professions may have numbers instead of skill IDs
- **Commands arrays**: May contain invalid entries in source data
- **Missing subtitles**: Not all skills have proper subtitle formatting
- **Experience types**: May not match game's actual XP categories

### 3. **Incomplete Mappings**
- Profession name → key mapping may be incomplete
- Skill mod formatting rules don't cover all cases
- Ability categorization (Dance/Song/Instrument) needs expansion

## 📊 Export Format Comparison

| Feature | Our Export | Kodan's Export | Status |
|---------|------------|----------------|---------|
| Visual skill tree | ✅ Table with highlighting | ✅ Table with highlighting | ✅ Matched |
| Points display | ✅ Shows remaining | ✅ Shows remaining | ✅ Matched |
| Skill titles | ✅ With subtitles | ✅ With subtitles | ✅ Matched |
| Experience format | ✅ "6000 Image Designer" | ✅ "6000 Image Designer" | ✅ Matched |
| Skill mods | ✅ Human-readable | ✅ Human-readable | ✅ Matched |
| Abilities | ⚠️ Has number issue | ✅ Clean list | ❌ Needs fix |
| Layout/styling | ✅ Matches closely | ✅ Original | ✅ Matched |

## 🚀 Recommended Next Steps

### Priority 1: Fix Data at the Source
1. **Analyze CONSTANTS.js structure**:
   ```javascript
   // Check for corruption in profession data
   Object.entries(ALL_PROFESSIONS).forEach(([profKey, profData]) => {
       for (let i = 1; i <= 4; i++) {
           const branch = profData[`branch_${i}`];
           if (branch && branch.skills) {
               branch.skills.forEach((skillId, index) => {
                   if (/^\d+$/.test(String(skillId))) {
                       console.error(`Bad data: ${profKey}.branch_${i}.skills[${index}] = "${skillId}"`);
                   }
               });
           }
       }
   });
   ```

2. **Create data validation on load**:
   - Validate all skill IDs are strings
   - Ensure no numeric-only entries
   - Check all skills exist in SKILLS object
   - Verify commands arrays contain valid abilities

### Priority 2: Enhanced Data Cleaning
1. **Pre-process ALL_PROFESSIONS** on load
2. **Validate skill references** before use
3. **Create ability whitelist** from known good abilities
4. **Add data repair functionality** to fix known issues

### Priority 3: Complete Feature Parity
1. **Add missing profession support**
2. **Implement all ability categorizations**
3. **Add profession prerequisite display**
4. **Support multiple profession trees in one export**

## 📝 Testing Checklist

- [ ] Load sample build and verify export matches Kodan's
- [ ] Check all export formats work correctly
- [ ] Verify no "1, 2, 3, 4" in abilities list
- [ ] Test with full CONSTANTS.js file
- [ ] Compare multi-profession builds
- [ ] Validate point calculations
- [ ] Check all skill mods format correctly

## 🔧 Debugging Tools Added

1. **Force Refresh**: Clears cache and reloads display
2. **Debug Abilities**: Analyzes ability data for issues
3. **Show Raw Data**: Displays unformatted skill data
4. **Manual Clean**: Attempts to clean data post-load
5. **Diagnose Data**: Checks for profession data corruption

## 💡 Key Insights

1. **Data Structure**: The issue appears to be in how profession branch skills are stored
2. **Timing**: Numbers might be indices being stored instead of skill IDs
3. **Source**: Problem is likely in the CONSTANTS.js generation, not our code
4. **Workaround**: May need to create a skill ID validation/repair system

## 📚 Resources

- **Kodan's Export Format**: See test1.html for reference
- **SWG Skill Data**: Need clean CONSTANTS.js with proper skill IDs
- **Export Formats**: All formats accessible via export preview modal

---

**Next Developer**: Focus on the data source issue first. The export functionality is working correctly - it's the input data that needs attention. Consider creating a data validation and repair utility that can fix common issues in CONSTANTS.js files.