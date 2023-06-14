/// <reference lib="webworker" />

import { expose } from 'comlink';

import {
  BuildResultProxyInterface,
  ServiceWorkerMessageType,
  ServiceWorkerInterface
} from '@webmate/core';

declare const self: ServiceWorkerGlobalScope;

const BUILD_URL_SCOPE = '/preview/build';

/* A map of sessionID to BuildResultInterface. */
const buildResults = new Map<string, BuildResultProxyInterface>();

/**
 * Exposed interface for the service worker.
 */
const serviceWorkerInstance: ServiceWorkerInterface = {
  setBuildResult(result: BuildResultProxyInterface, sessionID: string) {
    buildResults.set(sessionID, result);
  }
};

const parseScopedUrl = (url: string) => {
  const scope = self.registration.scope + BUILD_URL_SCOPE;
  // URLs in scope will be of the form: {scope}{sessionId}/{filePath}
  // scope is always a full URL prefix, including a trailing slash
  const sessionId = url.substring(scope.length);
  if (!sessionId) {
    console.warn('Invalid URL for build result', url);
  }
  return { sessionId };
};

const onFetch = async (event: FetchEvent) => {
  const url = event.request.url;

  // scope = current host + BUILD_URL_SCOPE
  const scope = `${self.location.origin}${BUILD_URL_SCOPE}`;

  if (url.startsWith(scope)) {
    const { sessionId } = parseScopedUrl(url);
    if (sessionId) {
      event.respondWith(getBuild(event, sessionId));
    }
  }
};

const getBuild = async (event: FetchEvent, sessionId: string) => {
  const buildResult = buildResults.get(sessionId);

  console.log({ buildResults });

  if (buildResult) {
    const result = await buildResult.getBuildResult('test.html');
    console.log({ result });
    if (result) {
      const content = result.content;
      // check if the content have html, head tags
      if (content && !content.includes('<html')) {
        console.log('wrap in html tags');
        // if not wrap it in html tags
        result.content = `<!DOCTYPE html><html><head>
        <style>${result.styles}</style>
        </head><body>${content}</body></html>`;
      }
      return new Response(result.content, {
        headers: {
          'content-type': 'text/html'
        }
      });
    }
  }

  return fetch(event.request);
};

const onActivate = (event: ExtendableEvent) => {
  console.log('activate');
  // Make sure active clients use this service worker instance without being
  // reloaded.
  event.waitUntil(self.clients.claim());
};

const onConnect = () => {
  //const port = event.ports[0];
  console.log('onConnect');
};

const onMessage = (e: ExtendableMessageEvent) => {
  // Receive a handshake message from a page and setup Comlink.
  if (e.data.initComlink === ServiceWorkerMessageType.ESTABLISH_HANDSHAKE) {
    (e.data.port as MessagePort).postMessage({
      initComlink: ServiceWorkerMessageType.HANDSHAKE_RECEIVED
    });
    expose(serviceWorkerInstance, e.data.port);
  }
};

const onInstall = (event: ExtendableEvent) => {
  console.log('install');
  event.waitUntil(self.skipWaiting());
};

self.addEventListener('onconnect', onConnect);
self.addEventListener('fetch', onFetch);
self.addEventListener('message', onMessage);
self.addEventListener('activate', onActivate);
self.addEventListener('install', onInstall);
