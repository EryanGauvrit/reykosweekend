import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { initEdgeStoreClient } from '@edgestore/server/core';

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket({
        maxSize: 1024 * 1024 * 10, // 10MB
        accept: ['image/jpeg', 'image/png'], // wildcard also works: ['image/*']
    }),
});

export const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
});

export const backendClient = initEdgeStoreClient({
    router: edgeStoreRouter,
});
