import { useState, useEffect } from 'react';
import { ConnectWallet, MediaRenderer, Web3Button, useAddress, useContract, useContractMetadata, useOwnedNFTs } from "@thirdweb-dev/react";
import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import Link from 'next/link';
import NFTCard from "../components/nft-card";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(NFT_CONTRACT_ADDRESS);
  const { data: contractMetadata } = useContractMetadata(contract);
  const { data: ownedNFTs } = useOwnedNFTs(contract, address);

  const [selectedClanTokenId, setSelectedClanTokenId] = useState<number | null>(null);
  const [clanSelected, setClanSelected] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);

  const clanNames = ['Clan HH', 'Clan Temple', 'Clan Newblood', 'Clan TRVE'];

  const selectClan = (tokenId: number) => {
    setSelectedClanTokenId(tokenId);
    setClanSelected(true);
    alert(`${clanNames[tokenId]} seleccionado, presiona Unirse a Clan para confirmar.`);
  };

  const claimNFT = async (contract: any, tokenId: number) => {
    const userConfirmation = window.confirm('Confirmar Clan? Recuerda que solo se puede elegir una sola vez');
    if (userConfirmation) {
      const unsubscribe = contract.events.addEventListener('TransferSingle', (event: any) => {
        if (event.status === 'completed') {
          setConfirmation(true);
          alert(`Felicidades! ${clanNames[tokenId]} te ha aceptado!`);
        }
        unsubscribe();
      });
      await contract.erc1155.claim(tokenId, 1);
    } else {
      setClanSelected(false);
      alert('Escoge clan!');
    }
  };

  useEffect(() => {
    if (clanSelected && selectedClanTokenId !== null) {
      alert(`${clanNames[selectedClanTokenId]} seleccionado, presiona Unirse a Clan para confirmar.`);
    }
  }, [clanSelected, selectedClanTokenId]);

  const clanImages = [
    '/clanhh.gif',
    '/clantemple.gif',
    '/clanblood.gif',
    '/clantrve.gif',
  ];
  const clanGradientClasses = [
    'gradientText0',
    'gradientText1',
    'gradientText2',
    'gradientText3',
  ];
  return (
    <div className={styles.container} style={{ backgroundImage: "url(/background.png)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      {address ? (
        <div className={styles.nftClaim}>
          <MediaRenderer src={contractMetadata?.image} width="auto" height="20%" style={{ borderRadius: "20px", maxWidth: "400px" }} />
          <h2>{contractMetadata?.name}</h2>
          {ownedNFTs && ownedNFTs.length > 0 ? (
            <>
              <p>Felicidades ya eres parte de {ownedNFTs[0].metadata.name}!</p>
              <Link href="/profile" passHref>
                <button className={styles.clanButtonAccess}>Descubre tu {ownedNFTs[0].metadata.name}</button>
              </Link>
            </>
          ) : (
            <div className={styles.gridContainer}>
            {clanImages.map((imageSrc, index) => (
              <div key={index} className={styles.cardClan} onClick={() => selectClan(index)}>
                <MediaRenderer src={imageSrc} className={styles.cardClanImage}  style={{ width: "100%", height: "100%", borderRadius: "20px", objectFit: "cover" }}/>
                <div className={`${styles.cardText} ${styles[clanGradientClasses[index]]}`}>
                  {selectedClanTokenId === index ? `Seleccionar ${clanNames[index]}` : clanNames[index]}
                </div>
              </div>
            ))}
          </div>
          )}
          {confirmation ? (
            <>
              <p>Felicidades ya eres parte de {ownedNFTs[0].metadata.name}!</p>
              <Link href="/profile" passHref>
                <button className={styles.clanButtonAccess}>Descubre tu {ownedNFTs[0].metadata.name}</button>
              </Link>
            </>
          ) : (
            clanSelected && selectedClanTokenId !== null && (
              <div className={styles.unirseButton}>
         <Web3Button 
  contractAddress={NFT_CONTRACT_ADDRESS} 
  action={(contract) => claimNFT(contract, selectedClanTokenId)}
>
  Unirse al {clanNames[selectedClanTokenId]}
</Web3Button>

              </div>
            )
          )}
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <ConnectWallet
            theme={"dark"}
            btnTitle={"conecta"}
            modalTitle={"ingresa tu mail, el boton Google puede ser inestable"}
            modalSize={"compact"}
            welcomeScreen={{
              subtitle: "inicia",
              img: {
                src: "https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/passport/assets/images/logos/logo.svg",
                width: 150,
                height: 150,
              },
            }}
            modalTitleIconUrl={
              "https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/passport/assets/images/preloader.gif"
            }
          />
        </div>
      )}
    </div>
  );
};

export default Home;
