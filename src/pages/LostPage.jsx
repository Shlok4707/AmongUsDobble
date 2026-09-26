import ResultPage from './ResultPage.jsx'
import bg from '../assets/screens/lost.jpg'

/** Lost Page — final score out of 15 and a way back to the Home Page. */
export default function LostPage() {
  return <ResultPage outcome="lose" bg={bg} tone="lose" buttonTone="slate" />
}
