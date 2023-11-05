import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Header() {
    return(
        <div className={styles.header}>
            <Image src={"https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/passport/assets/images/preloader.gif"} alt="" height={48} width={48}/>
            <p>Vibe Social Club x Hell And Heaven // Clan Selection</p>
        </div>
    )
};