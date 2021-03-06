import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { ethers, providers } from "ethers";
import "dotenv/config";

type Args = {
  tokenAddress: string | undefined;
  baseURI: string | undefined;
  mintTo: string[] | undefined;
  signerPrivateKey: string | undefined;
  signerMnemonic: string | undefined;
  ropstenUrl: string | undefined;
  infuraApiKey: string | undefined;
};

/**
 * Args should be imported into any script to provide helper functionality for providing arguments in a clear and concise manor.
 * Sensible defaults can be provided through environment variables.
 *
 * run any script with args imported with the --help flag to print out helpful documentation. Eg:
 *  $ yarn ts-node --files scripts/deployNFT.ts --help
 * Options:
      --help                      Show help                            [boolean]
      --version                   Show version number                  [boolean]
      --token-address, --ta       The address of the token contract     [string]
      --baseURI, --buri           The NFT contract Base URI             [string]
      --mint-to, --mt             Address to mint tokens to              [array]
      --signer-private-key, --pk  Private key of the signer - default can be
                                  defined by the PRIVATE_KEY environment
                                  variable                              [string]
  -m, --signer-mnemonic           Mnemonic of the signer - default can be
                                  defined by the MNEMONIC environment variable
                                                                        [string]
      --ropsten-url, --rurl       The ropsten URL - default can be defined by
                                  the ROPSTEN_URL environment variable
                                                                        [string]
      --infura-api-key, --ikey    Infura API key - default can be defined by the
                                  INFURA_API_KEY environment variable   [string]
 */

export const args = yargs(hideBin(process.argv))
  .option("token-address", {
    alias: "ta",
    default: process.env.TOKEN_ADDRESS,
    type: "string",
    description: "The address of the token contract",
  })
  .option("baseURI", {
    alias: "buri",
    type: "string",
    description: "The NFT contract Base URI",
  })
  .option("mint-to", {
    alias: "mt",
    array: true,
    type: "string",
    description: "Address to mint tokens to",
  })
  .option("signer-private-key", {
    alias: "pk",
    default: process.env.PRIVATE_KEY,
    type: "string",
    description:
      "Private key of the signer - default can be defined by the PRIVATE_KEY environment variable",
  })
  .option("signer-mnemonic", {
    alias: "m",
    default: process.env.MNEMONIC,
    type: "string",
    description:
      "Mnemonic of the signer - default can be defined by the MNEMONIC environment variable",
  })
  .option("ropsten-url", {
    alias: "rurl",
    default: process.env.ROPSTEN_URL,
    type: "string",
    description:
      "The ropsten URL - default can be defined by the ROPSTEN_URL environment variable",
  })
  .option("infura-api-key", {
    alias: "ikey",
    default: process.env.INFURA_API_KEY,
    type: "string",
    description:
      "Infura API key - default can be defined by the INFURA_API_KEY environment variable",
  })
  .parse() as Args;

/**
 * gets the configured wallet from the provided environment
 */
export function getWallet(): ethers.Wallet {
  if (args.signerMnemonic) {
    return ethers.Wallet.fromMnemonic(args.signerMnemonic);
  }
  if (args.signerPrivateKey) {
    return new ethers.Wallet(args.signerPrivateKey);
  }
  throw new Error(
    "MNEMONIC or PRIVATE_KEY environment variable must be set to initialize wallet"
  );
}

/**
 * gets the configured wallet from the provided environment
 */
export function getRopstenProvider(): providers.BaseProvider {
  if (args.ropstenUrl) {
    return new ethers.providers.JsonRpcProvider(args.ropstenUrl);
  }
  if (args.infuraApiKey) {
    return new ethers.providers.InfuraProvider("ropsten", args.infuraApiKey);
  }
  return ethers.providers.getDefaultProvider("ropsten");
}
