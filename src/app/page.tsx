
import Link from 'next/link';
import styles from './global.css';
export default function Home() {
  return (
    <div>
      <div>
        
      </div>
      <body className={styles.body}>
        <h1>Benvenuto nella Home</h1>
        <Link href="/admin">Vai alla pagina Admin</Link>
      </body>
    
  </div>
  )
}
