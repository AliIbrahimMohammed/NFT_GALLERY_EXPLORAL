import { useConnect, useContract, useNFT, useNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NFT_CONTRACT_ADDRESS } from "../const/addresses";
import { NFTCard } from "../components/NFTCard";
import { Card, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const count = 25;
  const [Page,setPage] = useState(1);
  const {contract} = useContract(NFT_CONTRACT_ADDRESS);
  const {data: nfts, isLoading: isLoadingNFTs} = useNFTs(
    contract,
    {
      count: count,
      start: (Page - 1) * count,
    }
  )

  return (
    <div className={styles.container}>
      <br></br>
      <br></br>
      <br></br>
      <div className={styles.heroBodyContainer}>
            <div className={styles.heroBody}>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroTitleGradient}>
                  Build with me your NFTs Gallery
                </span>
                <br />
                faster than ever.
              </h1>
              <p className={styles.heroSubtitle}>
                This is my DApp (NFT Gallery) for  your amazing, 
                strange and completely new NFT pieces,
                 either your pictures,your music or your videos, I am building decentralized applications on different EVM networks.
                 I am <b>Ali Ibrahim Mohammed</b>, who built it and I work as a <b>Freelance Blockchain Developer.</b>            
                 <Link
                  className={styles.link}
                  href="https://github.com/AliIbrahimMohammed"
                  target="_blank"
                >
                  <b> My GitHub </b>
                </Link>
                  or
                <Link
                  className={styles.link}
                  href="https://www.linkedin.com/in/ali-ibrahim-mohammed-a18389239/"
                  target="_blank"
                >
                  <b> My Linkedin</b>
                </Link>
              </p>
            </div>
              <div className={styles.NFTGrid}>
                {! isLoadingNFTs && (
                  nfts.map((nft, index) =>(
                    <NFTCard key={index} nft={nft} />
                  ))
                )}
              </div>  
      </div>
      <div className={styles.pagnation}>
        <button onClick={()=> setPage(Page - 1)} disabled={Page === 1}>Previous</button>
        <input 
          type="number"
          value={Page}
          onChange={(e)=> setPage(parseInt(e.target.value))}
        />
        <button onClick={()=> setPage(Page + 1)}>Next</button>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
