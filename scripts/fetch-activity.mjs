// Fetches LeetCode submissions for the last year, problems solved and contest rating,
// and writes them to data/activity.json for the portfolio's LeetCode heatmap.
// Runs in GitHub Actions (see .github/workflows/update-activity.yml).
// If LeetCode can't be reached, the previous data is kept.

import { readFile, writeFile, mkdir } from 'node:fs/promises';

const LEETCODE_USER = 'maIEphSvuk';
const OUT = new URL('../data/activity.json', import.meta.url);

async function fetchJson(url, options = {}, label = url) {
  const res = await fetch(url, { ...options, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error(`${label}: HTTP ${res.status}`);
  return res.json();
}

// ---------- LeetCode ----------
async function fetchLeetCode() {
  const query = `query($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal { acSubmissionNum { difficulty count } }
      userCalendar { streak totalActiveDays submissionCalendar }
    }
    userContestRanking(username: $username) { rating attendedContestsCount topPercentage }
  }`;
  const json = await fetchJson('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: `https://leetcode.com/u/${LEETCODE_USER}/`,
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
    },
    body: JSON.stringify({ query, variables: { username: LEETCODE_USER } }),
  }, 'LeetCode GraphQL');
  const user = json.data?.matchedUser;
  if (!user) throw new Error('LeetCode: user not found or request blocked');

  const solved = {};
  for (const s of user.submitStatsGlobal.acSubmissionNum) solved[s.difficulty.toLowerCase()] = s.count;

  // submissionCalendar is a JSON string: { "<unix seconds, UTC midnight>": count }
  const raw = JSON.parse(user.userCalendar?.submissionCalendar || '{}');
  const days = {};
  let submissions = 0;
  const cutoff = Date.now() - 366 * 24 * 3600 * 1000;
  for (const [ts, count] of Object.entries(raw)) {
    const ms = Number(ts) * 1000;
    if (ms < cutoff || !count) continue;
    const date = new Date(ms).toISOString().slice(0, 10);
    days[date] = (days[date] || 0) + count;
    submissions += count;
  }

  const contest = json.data.userContestRanking;
  return {
    solved: { all: solved.all ?? 0, easy: solved.easy ?? 0, medium: solved.medium ?? 0, hard: solved.hard ?? 0 },
    rating: contest?.rating ? Math.round(contest.rating) : null,
    contests: contest?.attendedContestsCount ?? null,
    topPercentage: contest?.topPercentage ?? null,
    submissions,
    days,
  };
}

// ---------- Main ----------
let previous = {};
try { previous = JSON.parse(await readFile(OUT, 'utf8')); } catch { /* first run */ }

let leetcode;
try {
  leetcode = { ...(await fetchLeetCode()), user: LEETCODE_USER };
} catch (e) {
  console.error('LeetCode failed:', e.message);
  if (!previous.leetcode) process.exit(1);
  console.log('Keeping the previous data.');
  process.exit(0);
}

// Only bump the timestamp when the data actually changed, to avoid empty commits.
const changed = JSON.stringify(leetcode) !== JSON.stringify(previous.leetcode);
const out = { updated: changed ? new Date().toISOString() : previous.updated, leetcode };

await mkdir(new URL('../data/', import.meta.url), { recursive: true });
await writeFile(OUT, JSON.stringify(out) + '\n');
console.log(changed ? 'activity.json updated' : 'no changes',
  `| ${leetcode.solved.all} solved, ${leetcode.submissions} submissions this year`);
