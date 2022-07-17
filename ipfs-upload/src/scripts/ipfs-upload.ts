import { create } from "ipfs-http-client";
import fsp from "fs/promises";
import path from "path";
import itAll from "it-all";

type IpfsContent = {
  path: string;
  content: Buffer;
};


const client = create({
  host: "localhost",
  port: 5001,
  protocol: "http",
});

async function getIpfsUploadContents(dir: string): Promise<IpfsContent[]> {
  const files = await fsp.readdir(dir);
  console.log(`files in directory '${dir}': ${files}`);
  const ipfsContentList = await Promise.all(
    files.map(async (fileName) => {
      const content = await fsp.readFile(path.join(dir, fileName));
      return {
        content,
        path: fileName,
      };
    })
  );
  return ipfsContentList;
}

async function main() {
  const imageDir = "./images";
  const outputDir = "./out";

  const ipfsImagesContent = await getIpfsUploadContents(imageDir);
  const imageUploadResults = await itAll(
    client.addAll(ipfsImagesContent, { wrapWithDirectory: true })
  );

  console.log("images uploaded to IPFS");
  console.log(imageUploadResults);

  await fsp.writeFile(
    `${outputDir}/images-ipfs-cids.json`,
    JSON.stringify(
      imageUploadResults.map((r) => ({ ...r, cid: r.cid.toString() })),
      null,
      2
    )
  );

  // last result is parent directory.
  const lastIndex = imageUploadResults.length - 1;
  const ipfsImageDirCID = imageUploadResults[lastIndex].cid.toString();
  const imageUploadResultsTrimmed = imageUploadResults.slice(0, lastIndex);

  console.log(`IPFS image directory CID: ${ipfsImageDirCID}`);
  const metadata = imageUploadResultsTrimmed.map((result) => ({
    name: result.path.replace(".png", ""),
    image: `/ipfs/${ipfsImageDirCID}/${result.path}`,
  }));

  console.log("uploading metadata");
  console.log(metadata);

  await fsp.writeFile(
    `${outputDir}/metadata.json`,
    JSON.stringify(metadata, null, 2)
  );

  const ipfsMetadataContent = metadata.map((m, i) => ({
    path: `${i + 1}.json`,
    content: JSON.stringify(m),
  }));

  const metadataUploadResults = await itAll(
    client.addAll(ipfsMetadataContent, { wrapWithDirectory: true })
  );

  console.log("metadata uploaded to IPFS");
  console.log(metadataUploadResults);

  await fsp.writeFile(
    `${outputDir}/metadata-ipfs-cids.json`,
    JSON.stringify(
      metadataUploadResults.map((r) => ({ ...r, cid: r.cid.toString() })),
      null,
      2
    )
  );

  const lastN = metadataUploadResults.length - 1;
  const ipfsMetadataDirCID = metadataUploadResults[lastN].cid.toString();
  console.log(`IPFS metadata directory CID: ${ipfsMetadataDirCID}`);

  const metadataUploadResultsTrimmed = metadataUploadResults.slice(0, lastN);
  const tokenURIs = metadataUploadResultsTrimmed.map(
    (r) => `/ipfs/${ipfsMetadataDirCID}/${r.path}`
  );
  await fsp.writeFile(
    `${outputDir}/token-uris.json`,
    JSON.stringify(tokenURIs, null, 2)
  );
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
