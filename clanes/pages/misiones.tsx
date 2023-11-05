import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { CONTRACT_ADDRESSES } from "../consts/addresses";
import NFTCard from "../components/nft-card";

export default function Misiones() {
    const address = useAddress();

    // Use the Misiones contract address
    const {
        contract
    } = useContract(CONTRACT_ADDRESSES.Misiones);

    const {
        data: ownedMisiones,
        isLoading: ownedMisionesLoading
    } = useOwnedNFTs(contract, address);

    return (
        <div className={styles.container}>
            <h1>Misiones</h1>
            {ownedMisionesLoading ? (
                <p>Loading...</p>
            ) : (
                ownedMisiones && ownedMisiones.length > 0 ? (
                    ownedMisiones.map((portal) => {
                        return (
                            <NFTCard
                                key={portal.metadata.id}
                                nft={portal}
                                quantity={parseInt(portal.quantityOwned!)}
                            />
                        )
                    })
                ) : (
                    <p>Sin Misiones todavia</p>
                )
            )}
        </div>
    )
};
