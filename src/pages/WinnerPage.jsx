import ResultPage from './ResultPage.jsx'
import bg from '../assets/screens/winner.jpg'

/** Winner Page — final score out of 15 and a way back to the Home Page. */
export default function WinnerPage() {
  return <ResultPage outcome="win" bg={bg} tone="win" buttonTone="green" />
}
