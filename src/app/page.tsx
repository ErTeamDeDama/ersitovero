
import Link from 'next/link';
import './gloabal.css';
export default function Home() {
  return (
    <div>
      <div className='navbar'>
        <h1>Benvenuto nella Home</h1>
        <Link href="/admin">Vai alla pagina Admin</Link>
      </div>
        
  </div>
  )
}
