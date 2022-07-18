import type { IPFSHTTPClient } from 'ipfs-http-client';
import { create } from 'ipfs-http-client';
import toBuffer from 'it-to-buffer';

export class IpfsClient {
    private client: IPFSHTTPClient;
    private cache: { [key: string]: Buffer } = {};

    constructor(host: string, port: number, protocol: string) {
        this.client = create({ host, port, protocol });
    }

    async getContent(uri: string): Promise<Buffer> {
        console.log(`getContent(${uri}) called`);
        if (uri in this.cache) {
            console.log(`getContent(${uri}) returning from cache`);
            return this.cache[uri];
        }
        const buffer = await toBuffer(this.client.cat(uri));
        console.log(`getContent(${uri}) fetched from ipfs`);
        this.cache[uri] = Buffer.from(buffer.buffer);
        return this.cache[uri];
    }

    async listContent(uris: string[]): Promise<Buffer[]> {
        return Promise.all(uris.map((u) => this.getContent(u)));
    }
}
