import styles from './Header.module.css'
import { Link } from 'react-router-dom'

function Header(){
   return(
      <header className={styles.header}>
         <div className={styles.content_menu}>
            <h1>Netfrix</h1>
            <ul className={styles.menuList}>
               <li>Filmes</li>
               <li>Filmes</li>
               <li>Filmes</li>
            </ul>
         </div>
      </header>
   )
}

export default Header