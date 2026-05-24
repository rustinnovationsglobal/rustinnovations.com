#!/usr/bin/env node
/**
 * Fix script for admin dashboard recurring parse error.
 *
 * The bug: a stray </section> appears before the Quotes Card at ~line 1008,
 * leaving it outside the JSX tree. SWC then fails with "Unexpected token div"
 * at the main return statement (line 582).
 *
 * Run from project root:
 *   node fix-dashboard.js
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, 'src/app/admin/dashboard/page.tsx');

if (!fs.existsSync(FILE)) {
  console.error('File not found:', FILE);
  console.error('Run this script from your project root directory.');
  process.exit(1);
}

const content = fs.readFileSync(FILE, 'utf8');
const lines = content.split('\n');

// Count section tags
const opens  = lines.filter(l => l.includes('<section')).length;
const closes = lines.filter(l => l.includes('</section>')).length;

if (opens === closes) {
  console.log(`✅ No fix needed — <section> tags are already balanced (${opens} open, ${closes} close).`);
  process.exit(0);
}

console.log(`⚠️  Found ${opens} <section> open(s) and ${closes} </section> close(s). Fixing...`);

// Strategy: keep only the LAST </section> before the outer </div></div> close —
// remove any </section> that is immediately followed by a <Card (the Quotes card).
const fixed = content.replace(
  /[ \t]*<\/section>\r?\n([ \t]*<Card\b)/g,
  '$1'
);

if (fixed === content) {
  console.error('❌ Could not auto-fix: pattern not matched. Please check the file manually.');
  process.exit(1);
}

// Verify the fix
const fixedLines = fixed.split('\n');
const fixedOpens  = fixedLines.filter(l => l.includes('<section')).length;
const fixedCloses = fixedLines.filter(l => l.includes('</section>')).length;

if (fixedOpens !== fixedCloses) {
  console.error(`❌ Fix attempt left tags unbalanced (${fixedOpens} open, ${fixedCloses} close). Aborting.`);
  process.exit(1);
}

// Write backup then save
fs.writeFileSync(FILE + '.bak', content, 'utf8');
fs.writeFileSync(FILE, fixed, 'utf8');

console.log(`✅ Fixed! <section> tags now balanced (${fixedOpens}/${fixedCloses}).`);
console.log(`   Backup saved to: ${FILE}.bak`);