import ResultPage from './ResultPage.jsx'
import bg from '../assets/screens/winner.jpg'

/**
 * Draw Page — "If the scores are equal: handle as Draw/Tie".
 * Not one of the seven named screens; it reuses the end-of-game backdrop with
 * its own wording.
 */
export default function DrawPage() {
  return <ResultPage outcome="draw" bg={bg} tone="draw" buttonTone="amber" caption="It's a draw" />
}
