import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";
import NFTCard from "../components/nft-card";
import Link from 'next/link';

export default function NFTs() {
    const address = useAddress();
    const { contract } = useContract(NFT_CONTRACT_ADDRESS);
    const { data: ownedNFTs, isLoading: ownedNFTsLoading } = useOwnedNFTs(contract, address);

    return (
        <div>
            {address ? (
                <>
                    <div className={styles.menu}>
                    <button className={styles.nftButton}> <Link href="/inst">Instrucciones</Link></button>
                    <button className={styles.nftButton}><Link href="https://vibesocial.club/hhstore.html">Tienda</Link></button>
                    <button className={styles.nftButton}><Link href="/profile">Mi Perfil</Link></button>
                    <button className={styles.nftButton}><Link href="/medallas">Medallas</Link></button>
                    <button className={styles.nftButton}><Link href="/portales">Portales</Link></button>
                    <button className={styles.nftButton}><Link href="/misiones">Misiones</Link></button>
                    <button className={styles.nftButton}><Link href="https://vibesocial.club">Vibe Social Club Home</Link></button>
                    
                    
                </div>
                </>
            ) : (
                <div className={styles.container}>
                   <p className={styles.pText}>Please log in</p>
                    <button className={styles.buttonHome}> <Link href="/">
                     Conecta
                </Link></button>

                </div>
            )}
        </div>
    );
}
