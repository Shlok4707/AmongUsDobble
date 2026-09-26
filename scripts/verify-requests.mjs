/**
 * Checks the source for each change that was asked for, so "is it actually in
 * there?" has an answer that does not depend on anyone's memory.
 *
 *   npm run test:requests
 */
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'

const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '')
const md5 = (p) => (existsSync(p) ? createHash('md5').update(readFileSync(p)).digest('hex') : 'MISSING')

let pass = 0, fail = 0
const check = (name, ok, detail = '') => {
  if (ok) { pass++; console.log(`PASS  ${name}`) }
  else { fail++; console.log(`FAIL  ${name}${detail ? ' — ' + detail : ''}`) }
}

const engine = read('src/game/engine.js')
const stage = read('src/components/Stage.jsx')
const home = read('src/pages/HomePage.jsx')
const join = read('src/pages/JoinCodePage.jsx')
const game = read('src/pages/GameBGPage.jsx')
const result = read('src/pages/ResultPage.jsx')
const card = read('src/components/DobbleCard.jsx')
const provider = read('src/game/GameProvider.jsx')
const transport = read('src/game/transport/index.js')
const relay = read('src/game/transport/relay.js')
const app = read('src/App.jsx')

console.log('— rounds —')
check('15 rounds', /TOTAL_ROUNDS = 15/.test(engine))

console.log('\n— latency —')
check('relay connection is pre-warmed', /prewarmRelay/.test(relay) && /prewarmRelay/.test(app))
check('code is only shown once a route really claimed it', /const winner = await firstClaim/.test(transport))
check('round seed is sent to the guest', /MSG\.SETUP/.test(provider) && /seed: game\.seed/.test(provider))
check('guest builds its own rounds from the seed', /buildRounds\(msg\.seed/.test(provider))
check('card layouts are stripped from STATE messages', /wireSnapshot/.test(engine) && /wireSnapshot\(game\)/.test(provider))
check('guest shows its own click feedback immediately', /kind: right \? 'correct' : 'wrong'/.test(provider))

console.log('\n— backgrounds fill the screen —')
check('Stage uses object-cover over the whole viewport', /object-cover/.test(stage) && /fixed inset-0/.test(stage))
for (const [n, f] of [['home', home], ['join', join], ['game', game], ['result', result]])
  check(`${n} page uses Stage`, /<Stage/.test(f))

console.log('\n— home page —')
check('says "15 rounds"', /\{TOTAL_ROUNDS\} rounds/.test(home))
check('says first to spot wins the round', /First to spot the matching symbol wins the round/.test(home))
check('says either card can be clicked', /left card or the right/.test(home))
check('shows a build stamp', /__APP_VERSION__/.test(home))

console.log('\n— new artwork —')
const expected = {
  'src/assets/screens/join-code.jpg': '71ad17f4717e9a1ba9065c698f22d02a',
  'src/assets/screens/winner.jpg': '8d0e55f931a9656bf7cce186bcd89150',
  'src/assets/screens/lost.jpg': '8a2d9bd9e78304f53ad14b5290999169',
}
for (const [p, want] of Object.entries(expected))
  check(`${p.split('/').pop()} is the supplied image`, md5(p) === want, md5(p))

console.log('\n— win / lose pages —')
check('score panel is anchored to the right', /inset-y-0 right-0/.test(result))
check('shows rounds won out of the total', /Rounds won/.test(result) && /\{totalRounds\}/.test(result))

console.log('\n— main game page —')
check('score boxes share one equal 3-column grid', /grid-cols-3/.test(game))
check('scoreboard row is centred', /justify-center/.test(game) && /w-\[min\(94vw,86cqmin\)\]/.test(game))
check('wrong click flashes red', /wrongGlow/.test(card) && /rgba\(255,45,45/.test(card))
check('round banner has its own band below the cards', /round banner/.test(game) && /h-\[13cqmin\] shrink-0/.test(game))

console.log('\n— points —')
check('points rule lives in the engine', /export function pointsFor/.test(engine))
check('result pages show points won', /Points won/.test(result) && /pointsFor\(myScore/.test(result))
check('points panel sits below the rounds panel', result.indexOf('Rounds won') < result.indexOf('Points won'))

console.log('\n— disconnect —')
check('is a dialog, not a toast', existsSync('src/components/NoticeModal.jsx') && /role="dialog"/.test(read('src/components/NoticeModal.jsx')))
check('dialog is wired into the app', /NoticeModal/.test(app))

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail === 0 ? 0 : 1)
