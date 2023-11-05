import React from 'react';
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import NFTCard from "../components/nft-card";
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import styles from "../styles/Home.module.css";
import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(NFT_CONTRACT_ADDRESS);
  
  // Call the useOwnedNFTs hook unconditionally
  const { data: ownedNFTs, isLoading } = useOwnedNFTs(contract, address ?? "");

  const router = useRouter();

  const redirectToMenu = () => {
    router.push('/menu');
  };
  return (
    <div className={styles.containerInst}>
      <div className={styles.instructionContainer}>
        <h1>Instrucciones para unirte a un clan</h1>
        <div className={styles.cardClan2}>
          <img src="/iniciar.png" alt="Iniciar sesión" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Iniciar sesión en la plataforma utilizando tu correo electrónico.</p>
        </div>
        <div className={styles.cardClan2}>
          <img src="/mail.png" alt="Conectar mail" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Conectar tu correo electrónico para recibir notificaciones y códigos de acceso.</p>
        </div>
        <div className={styles.cardClan2}>
          <img src="/verificar.png" alt="Verificar código" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Revisa tu bandeja de entrada para el código de verificación y escríbelo en la plataforma.</p>
        </div>
        <div className={styles.cardClan2}>
          <img src="/elegir.png" alt="Elegir clan" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Explora los diferentes clanes y elige el que más resuene contigo. Recuerda que solo puedes pertenecer a un clan y no es posible cambiarlo una vez seleccionado.</p>
        </div>
        <div className={styles.cardClan2}>
          <img src="/secreta.png" alt="Página secreta" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Una vez seleccionado, serás redirigido a una página secreta exclusiva de tu clan.</p>
        </div>
        {address && (
      <div className={styles.connectedMenu}>
        {/* ... */}
        <div className={styles.nftCard}>
          {!isLoading && ownedNFTs && ownedNFTs.length > 0 ? (
            ownedNFTs.map((nft) => (
              <NFTCard
                key={nft.metadata.id}
                nft={nft}
                // Ensure quantity is a number, using || to provide a default value of 0 if it's undefined
                quantity={parseInt(nft.quantityOwned || '0')}
              />
            ))
          ) : (
            <p>Todavía no eres parte de un clan o estamos cargando tu información.</p>
          )}
        </div>
      </div> )}

        <h1>Como obtener una medalla</h1>
        <div className={styles.cardClan2}>
          <img src="/stage.png" alt="Ir a stage" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Acude a ver cualquier banda en cualquier stage durante el festival y mantente atento a los códigos QR que aparecerán.</p>
        </div>
        <div className={styles.cardClan2}>
          <img src="/screenqr.png" alt="Esperar QR" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Cuando aparezca un código QR, escanéalo con tu dispositivo móvil.</p>
        </div>
        <div className={styles.cardClan2}>
          <img src="/escanear-qr.png" alt="Escanear QR" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Después de escanear, recibirás la opción para reclamar tu medalla digital.</p>
        </div>
        <div className={styles.cardClan2}>
          <img src="/obtener-medalla.png" alt="Obtener medalla" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Comparte una foto o video del momento para ganar puntos y recompensas adicionales.</p>
        </div>
        <div className={styles.connectedMenu}>
        <p className={styles.connectedMenuText}>Entra aqui para saber como obtener:</p>
          <button className={styles.connectedMenuButton} onClick={redirectToMenu}>Medallas</button>

        </div>

        <h1>Como obtener un portal</h1>
        <div className={styles.cardClan2}>
          <img src="/portal.png" alt="Abrir portal" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Da clic en el portal que quieres abrir y entra al espacio de realidad aumentada (AR).</p>
        </div>
        <div className={styles.cardClan2}>
          <img src="/explorar-ar.png" alt="Explorar AR" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Explora el espacio AR y descubre todos sus secretos y elementos interactivos.</p>
        </div>
        <div className={styles.cardClan2}>
          <img src="/experiencia.png" alt="Compartir experiencia" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Toma fotos o graba videos de tu experiencia y compártelos con la comunidad.</p>
        </div>
        <div className={styles.connectedMenu}>
        <p className={styles.connectedMenuText}>Entra aqui para saber como obtener:</p>
          <button className={styles.connectedMenuButton} onClick={redirectToMenu}>Portales</button>

        </div>

        <h1>Como obtener una misión</h1>
        <div className={styles.cardClan2}>
          <img src="/misiones.png" alt="Misiones" className={styles.cardClanImage2} />
          <p className={styles.cardClanText2}>Disponibles por tiempo limitado. 
            Cada misión tiene instrucciones y recompensas.</p>
        </div>
        <div className={styles.cardClan2}>

          
        </div>
      </div>

      
      {address && (
        <div className={styles.connectedMenu}>
          <p className={styles.connectedMenuText}>Bienvenido, ya estás conectado. Aquí tienes algunas acciones que puedes realizar a continuación:</p>
          <button className={styles.connectedMenuButton} onClick={redirectToMenu}>Ir al menú</button>
          {(!isLoading && (!ownedNFTs || ownedNFTs.length === 0)) && (
            <div className={styles.cardClan2}>
              <p>Todavía no eres parte de un clan o estamos cargando tu información.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Home;