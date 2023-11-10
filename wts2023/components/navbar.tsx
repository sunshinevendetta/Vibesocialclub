import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const address = useAddress();
    return (
        <div className={styles.navbar}>
            <Link href="/" className={styles.navIcon}>
                <Image src={"/claim-icon.gif"} alt="" width={30} height={30}/>
                <p className={styles.navIconLabel}>Home</p>
            </Link>
            <Link href="/menu" className={styles.navIcon}>
                <Image src={"https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/passport/assets/images/logos/logo.svg"} alt="" width={30} height={30}/>
                <p className={styles.navIconLabel}>Menu</p>
            </Link>
            <Link href="/profile" className={styles.navIcon}>
                <Image src={"/profile-icon.png"} alt="" width={30} height={30}/>
                <p className={styles.navIconLabel}>Mi Perfil</p>
            </Link>
            <div className={styles.navIcon}>
            {address && (
                <ConnectWallet
                    btnTitle="Login"
                    detailsBtn={() => {
                        return (
                            <div>
                                <Image src={"/medal-icon.png"} alt="" width={30} height={30}/>
                                <p className={styles.navIconLabel}>Settings</p>
                            </div>
                        )
                    }}
                />
            )}
            </div>
        </div>
    )
}