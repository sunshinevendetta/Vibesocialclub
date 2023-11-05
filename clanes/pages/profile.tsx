import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import NFTCard from "../components/nft-card";
import Link from 'next/link';
import { CONTRACT_ADDRESSES } from "../consts/addresses";

// Define a type for the structure of the metadata in your NFTs
type Metadata = {
  id: string;
  // Add other properties that your NFT metadata may contain
};

// Define a type for your NFT object
type NFT = {
  metadata: Metadata;
  quantityOwned: string | null;
};

// Define the props for your Section component
interface SectionProps {
  title: string;
  contractAddress: string;
  address: string;
}

// Define the props for your renderNFTSection function
interface RenderNFTSectionProps {
  ownedNFTs: NFT[] | undefined;
  ownedNFTsLoading: boolean;
}

export default function NFTs() {
  const address = useAddress();

  return (
    address ? (
      <div>
        {Object.entries(CONTRACT_ADDRESSES).map(([section, contractAddress]) => (
          <Section
            key={section}
            title={section}
            contractAddress={contractAddress}
            address={address}
          />
        ))}
      </div>
    ) : (
      <div className={styles.container}>
        <p className={styles.pText}>Please log in</p>
        <button className={styles.buttonHome}>
          <Link href="/">
            Conecta
          </Link>
        </button>
      </div>
    )
  );
}

function Section({ title, contractAddress, address }: SectionProps) {
  const { contract } = useContract(contractAddress);
  const { data: ownedNFTs, isLoading: ownedNFTsLoading } = useOwnedNFTs(contract, address);

  return (
    <div className={styles.container}>
      <h1><Link href={`/${title.toLowerCase().replace(/\s+/g, '')}`}>{title}</Link></h1>
      {renderNFTSection({ ownedNFTs, ownedNFTsLoading })}
    </div>
  );
}

function renderNFTSection({ ownedNFTs, ownedNFTsLoading }: RenderNFTSectionProps) {
  return ownedNFTsLoading ? (
    <p>Cargando...</p>
  ) : (
    ownedNFTs && ownedNFTs.length > 0 ? (
      ownedNFTs.map((nft) => (
        <NFTCard
          key={nft.metadata.id}
          nft={nft}
          quantity={parseInt(nft.quantityOwned ?? '0')}
        />
      ))
    ) : (
      <p>Sin medallas, visita más escenarios y realiza más actividades para incrementar tus medallas, puntos y premios</p>
    )
  );
}
