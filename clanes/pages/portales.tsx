import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { CONTRACT_ADDRESSES } from "../consts/addresses";
import NFTCard from "../components/nft-card";

export default function Portales() {
    const address = useAddress();

    // Use the Portales contract address
    const {
        contract
    } = useContract(CONTRACT_ADDRESSES.Portales);

    const {
        data: ownedPortales,
        isLoading: ownedPortalesLoading
    } = useOwnedNFTs(contract, address);

    return (
        <div className={styles.container}>
            <h1>Portales</h1>
            {ownedPortalesLoading ? (
                <p>Loading...</p>
            ) : (
                ownedPortales && ownedPortales.length > 0 ? (
                    ownedPortales.map((portal) => {
                        return (
                            <NFTCard
                                key={portal.metadata.id}
                                nft={portal}
                                quantity={parseInt(portal.quantityOwned!)}
                            />
                        )
                    })
                ) : (
                    <p>Sin portales todavia</p>
                )
            )}
        </div>
    )
};
