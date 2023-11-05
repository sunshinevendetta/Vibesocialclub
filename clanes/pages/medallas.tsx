import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { CONTRACT_ADDRESSES } from "../consts/addresses";
import NFTCard from "../components/nft-card";

export default function Medallas() {
    const address = useAddress();

    // Use the Medallas contract address
    const {
        contract
    } = useContract(CONTRACT_ADDRESSES.Medallas);

    const {
        data: ownedMedallas,
        isLoading: ownedMedallasLoading
    } = useOwnedNFTs(contract, address);

    return (
        <div className={styles.container}>
            <h1>Medallas</h1>
            {ownedMedallasLoading ? (
                <p>Loading...</p>
            ) : (
                ownedMedallas && ownedMedallas.length > 0 ? (
                    ownedMedallas.map((portal) => {
                        return (
                            <NFTCard
                                key={portal.metadata.id}
                                nft={portal}
                                quantity={parseInt(portal.quantityOwned!)}
                            />
                        )
                    })
                ) : (
                    <p>Sin Medallas todavia</p>
                )
            )}
        </div>
    )
};
