require("dotenv").config();
const { ThirdwebSDK, NATIVE_TOKEN_ADDRESS } = require("@thirdweb-dev/sdk");
const ethers = require("ethers");

// This is a utility function to set claim conditions for a range of token IDs
async function setClaimConditions(contract, startTokenId, endTokenId) {
  for (let tokenId = startTokenId; tokenId <= endTokenId; tokenId++) {
    console.log(`Setting claim conditions for token ID: ${tokenId}`);

    // Define the claim conditions here
    const claimConditions = [{
      startTime: new Date(),
      price: 0, // Price set to 0 for free claiming
      maxQuantity: "1", // Set to 1 for testing
      quantityLimitPerTransaction: "1",
      currency: NATIVE_TOKEN_ADDRESS, // Make sure this is the correct native token address
    }];
    

    try {
      // Ensure that the contract has the setClaimConditions method
      const tx = await contract.claimConditions.set(tokenId.toString(), claimConditions, false);
      console.log(`Claim conditions set for token ID ${tokenId}:`, tx);
    } catch (error) {
      console.error(`Failed to set claim conditions for token ID ${tokenId}:`, error);
    }
  }
}

// Main function to execute the script
async function main() {
  if (!process.env.PRIVATE_KEY || !process.env.THIRDWEB_API_KEY || !process.env.CONTRACT_ADDRESS || !process.env.RPC_URL) {
    console.error("One or more environment variables are not defined. Check your .env file.");
    return;
  }

  // Initialize the SDK with your private key and custom RPC URL
  const customRpcProvider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.PRIVATE_KEY,
      customRpcProvider
    ),
    {
      apiKey: process.env.THIRDWEB_API_KEY
    }
  );

  // Ensure you get the correct contract instance with the right methods
  try {
    const contract = await sdk.getEditionDrop(process.env.CONTRACT_ADDRESS);
    // Set claim conditions for token IDs 0 to 73
    await setClaimConditions(contract, 0, 73);
  } catch (error) {
    console.error("Error executing the script:", error);
  }
}

main().catch((error) => {
  console.error("Unhandled error in main:", error);
});

