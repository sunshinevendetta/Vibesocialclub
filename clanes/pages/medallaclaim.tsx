import { ConnectWallet, MediaRenderer, Web3Button, useAddress, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESSES } from "../consts/addresses";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import Link from 'next/link';

const Home: NextPage = () => {
  const address = useAddress();
  const medallasContractAddress = CONTRACT_ADDRESSES.Medallas;
  const { contract } = useContract(medallasContractAddress);
  const { data: contractMetadata } = useContractMetadata(contract);

  return (
    <div className={styles.container}
           style={{ backgroundImage: "url(/background.png)", backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
    >
      {address ? (
        <div className={styles.nftClaim}>
          <MediaRenderer
            src={contractMetadata?.image}
            width="auto"
            height="20%"
            style={{
              borderRadius: "20px",
              maxWidth: "400px",
            }}
          />
          <h1>{contractMetadata?.name}</h1>
          <p>{contractMetadata?.description}</p> {hgell}
          <Web3Button
            contractAddress={medallasContractAddress}
            action={(contract) => contract.erc1155.claim(0, 1)} // Update with the correct token ID and quantity if necessary
            onSuccess={() => alert("Medalla reclamada con éxito")}
          >
            Reclamar Medalla
          </Web3Button>
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <ConnectWallet
            theme={"dark"}
            btnTitle={"Conecta"}
            modalTitle={"Conectate para reclamar tu Medalla"}
            modalSize={"compact"}
            welcomeScreen={{
              subtitle: "Inicia sesión",
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
          {/* If you have a page for users to choose or view different medals, link it here */}
        </div>
      )}
    </div>
  );
};

export default Home;
