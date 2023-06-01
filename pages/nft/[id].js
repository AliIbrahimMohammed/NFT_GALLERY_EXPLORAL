import { ThirdwebNftMedia, useContract, useContractEvents, useNFT } from "@thirdweb-dev/react";
import { useRouter, router } from "next/router";
import { NFT_CONTRACT_ADDRESS } from "../../const/addresses";
import styles from "../../styles/Home.module.css";
import { Card, Box } from "@chakra-ui/react";

const NFTDetailPage = () =>{
    const { id } = useRouter().query;
    const { contract } = useContract(NFT_CONTRACT_ADDRESS);
    const { data: nft, isLoading: isLoadingNFT } = useNFT(contract, id);
    const { data: events, isLoading: isLoadingEvents } = useContractEvents(
        contract,
        "Transfer",
        {
            queryFilter: {
                filters: {
                    tokenId: id,
                },
                order: "desc",
            }
        }
    );
    return (
        <div className={styles.container}>
            <Card alignItems={"center"}>
                <h1>NFT Detail Page</h1>
                    <button onClick={()=> router.back()}>Back</button>
                <div className={styles.NFTCard}>
                    <h2>{nft?.metadata.name}</h2>
                    {!isLoadingNFT &&(
                        <ThirdwebNftMedia
                            metadata={nft.metadata}
                            width="250px"
                            height="250px"
                        />
                    )}
                </div>
                <div>
                    <h2>Traits:</h2>
                    {nft?.metadata.attributes.map((attribute, index ) => (
                        <div key={index}>
                            <strange>{attribute.trait_type}</strange>: {attribute.value}
                        </div>    
                    ))}
                </div>
                <h2>History:</h2>
                {!isLoadingEvents && (
                    <div>
                        {events.map((event, index)=> (
                            <div key={index}>
                                <strong>From : </strong>  {event.data.from}  <strong>To : </strong>  {event.data.to}
                            </div>    
                        ))}
                    </div>
                )}
            </Card>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
};

export default NFTDetailPage;