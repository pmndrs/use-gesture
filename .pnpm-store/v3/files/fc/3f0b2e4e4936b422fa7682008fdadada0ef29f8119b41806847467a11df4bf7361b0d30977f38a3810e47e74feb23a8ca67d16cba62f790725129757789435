<div align="center">
  <br />

![GraphQLOverWebSocket](https://user-images.githubusercontent.com/25294569/94527042-172dba00-023f-11eb-944b-88c0bd58a8d2.gif)

  <h6>Coherent, zero-dependency, lazy, simple, <a href="PROTOCOL.md">GraphQL over WebSocket Protocol</a> compliant server and client.</h6>

[![Continuous integration](https://github.com/enisdenjo/graphql-ws/workflows/Continuous%20integration/badge.svg)](https://github.com/enisdenjo/graphql-ws/actions?query=workflow%3A%22Continuous+integration%22) [![graphql-ws](https://img.shields.io/npm/v/graphql-ws.svg?label=graphql-ws&logo=npm)](https://www.npmjs.com/package/graphql-ws)

  <br />
</div>

## Getting started

#### Install

```shell
$ yarn add graphql-ws
```

#### Create a GraphQL schema

```ts
import { buildSchema } from 'graphql';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
  type Subscription {
    greetings: String
  }
`);

// The roots provide resolvers for each GraphQL operation
const roots = {
  query: {
    hello: () => 'Hello World!',
  },
  subscription: {
    greetings: async function* sayHiIn5Languages() {
      for (const hi of ['Hi', 'Bonjour', 'Hola', 'Ciao', 'Zdravo']) {
        yield { greetings: hi };
      }
    },
  },
};
```

#### Start the server

##### With [ws](https://github.com/websockets/ws)

```ts
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';

const server = new ws.Server({
  port: 4000,
  path: '/graphql',
});

useServer(
  // from the previous step
  { schema, roots },
  server,
);

console.log('Listening to port 4000');
```

##### With [uWebSockets.js](https://github.com/uNetworking/uWebSockets.js)

```ts
import uWS from 'uWebSockets.js'; // yarn add uWebSockets.js@uNetworking/uWebSockets.js#<tag>
import { makeBehavior } from 'graphql-ws/lib/use/uWebSockets';

uWS
  .App()
  .ws(
    '/graphql',
    makeBehavior(
      // from the previous step
      { schema, roots },
    ),
  )
  .listen(4000, (listenSocket) => {
    if (listenSocket) {
      console.log('Listening to port 4000');
    }
  });
```

##### With [fastify-websocket](https://github.com/fastify/fastify-websocket)

```ts
import Fastify from 'fastify'; // yarn add fastify
import fastifyWebsocket from 'fastify-websocket'; // yarn add fastify-websocket
import { makeHandler } from 'graphql-ws/lib/use/fastify-websocket';

const fastify = Fastify();
fastify.register(fastifyWebsocket);

fastify.get(
  '/graphql',
  { websocket: true },
  makeHandler(
    // from the previous step
    { schema, roots },
  ),
);

fastify.listen(4000, (err) => {
  if (err) {
    fastify.log.error(err);
    return process.exit(1);
  }
  console.log('Listening to port 4000');
});
```

#### Use the client

```ts
import { createClient } from 'graphql-ws';

const client = createClient({
  url: 'ws://welcomer.com:4000/graphql',
});

// query
(async () => {
  const result = await new Promise((resolve, reject) => {
    let result;
    client.subscribe(
      {
        query: '{ hello }',
      },
      {
        next: (data) => (result = data),
        error: reject,
        complete: () => resolve(result),
      },
    );
  });

  expect(result).toEqual({ hello: 'Hello World!' });
})();

// subscription
(async () => {
  const onNext = () => {
    /* handle incoming values */
  };

  let unsubscribe = () => {
    /* complete the subscription */
  };

  await new Promise((resolve, reject) => {
    unsubscribe = client.subscribe(
      {
        query: 'subscription { greetings }',
      },
      {
        next: onNext,
        error: reject,
        complete: resolve,
      },
    );
  });

  expect(onNext).toBeCalledTimes(5); // we say "Hi" in 5 languages
})();
```

## Recipes

<details id="promise">
<summary><a href="#promise">🔗</a> Client usage with Promise</summary>

```ts
import { createClient, SubscribePayload } from 'graphql-ws';

const client = createClient({
  url: 'ws://hey.there:4000/graphql',
});

async function execute<T>(payload: SubscribePayload) {
  return new Promise<T>((resolve, reject) => {
    let result: T;
    client.subscribe<T>(payload, {
      next: (data) => (result = data),
      error: reject,
      complete: () => resolve(result),
    });
  });
}

// use
(async () => {
  try {
    const result = await execute({
      query: '{ hello }',
    });
    // complete
    // next = result = { data: { hello: 'Hello World!' } }
  } catch (err) {
    // error
  }
})();
```

</details>

<details id="async-iterator">
<summary><a href="#async-iterator">🔗</a> Client usage with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator">AsyncIterator</a></summary>

```ts
import { createClient, SubscribePayload } from 'graphql-ws';

const client = createClient({
  url: 'ws://iterators.ftw:4000/graphql',
});

function subscribe<T>(payload: SubscribePayload): AsyncIterableIterator<T> {
  let deferred: {
    resolve: (done: boolean) => void;
    reject: (err: unknown) => void;
  } | null = null;
  const pending: T[] = [];
  let throwMe: unknown = null,
    done = false;
  const dispose = client.subscribe<T>(payload, {
    next: (data) => {
      pending.push(data);
      deferred?.resolve(false);
    },
    error: (err) => {
      throwMe = err;
      deferred?.reject(throwMe);
    },
    complete: () => {
      done = true;
      deferred?.resolve(true);
    },
  });
  return {
    [Symbol.asyncIterator]() {
      return this;
    },
    async next() {
      if (done) return { done: true, value: undefined };
      if (throwMe) throw throwMe;
      if (pending.length) return { value: pending.shift()! };
      return (await new Promise<boolean>(
        (resolve, reject) => (deferred = { resolve, reject }),
      ))
        ? { done: true, value: undefined }
        : { value: pending.shift()! };
    },
    async return() {
      dispose();
      return { done: true, value: undefined };
    },
  };
}

(async () => {
  const subscription = subscribe({
    query: 'subscription { greetings }',
  });
  // subscription.return() to dispose

  for await (const result of subscription) {
    // next = result = { data: { greetings: 5x } }
  }
  // complete
})();
```

</details>

<details id="observable">
<summary><a href="#observable">🔗</a> Client usage with <a href="https://github.com/tc39/proposal-observable">Observable</a></summary>

```ts
import { Observable } from 'relay-runtime';
// or
import { Observable } from '@apollo/client/core';
// or
import { Observable } from 'rxjs';
// or
import Observable from 'zen-observable';
// or any other lib which implements Observables as per the ECMAScript proposal: https://github.com/tc39/proposal-observable

const client = createClient({
  url: 'ws://graphql.loves:4000/observables',
});

function toObservable(operation) {
  return new Observable((observer) =>
    client.subscribe(operation, {
      next: (data) => observer.next(data),
      error: (err) => observer.error(err),
      complete: () => observer.complete(),
    }),
  );
}

const observable = toObservable({ query: `subscription { ping }` });

const subscription = observable.subscribe({
  next: (data) => {
    expect(data).toBe({ data: { ping: 'pong' } });
  },
});

// ⏱

subscription.unsubscribe();
```

</details>

<details id="relay">
<summary><a href="#relay">🔗</a> Client usage with <a href="https://relay.dev">Relay</a></summary>

```ts
import { GraphQLError } from 'graphql';
import {
  Network,
  Observable,
  RequestParameters,
  Variables,
} from 'relay-runtime';
import { createClient } from 'graphql-ws';

const subscriptionsClient = createClient({
  url: 'ws://i.love:4000/graphql',
  connectionParams: () => {
    const session = getSession();
    if (!session) {
      return {};
    }
    return {
      Authorization: `Bearer ${session.token}`,
    };
  },
});

// yes, both fetch AND subscribe handled in one implementation
function fetchOrSubscribe(operation: RequestParameters, variables: Variables) {
  return Observable.create((sink) => {
    if (!operation.text) {
      return sink.error(new Error('Operation text cannot be empty'));
    }
    return subscriptionsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      {
        ...sink,
        error: (err) => {
          if (err instanceof Error) {
            return sink.error(err);
          }

          if (err instanceof CloseEvent) {
            return sink.error(
              // reason will be available on clean closes
              new Error(
                `Socket closed with event ${err.code} ${err.reason || ''}`,
              ),
            );
          }

          return sink.error(
            new Error(
              (err as GraphQLError[]).map(({ message }) => message).join(', '),
            ),
          );
        },
      },
    );
  });
}

export const network = Network.create(fetchOrSubscribe, fetchOrSubscribe);
```

</details>

<details id="urql">
<summary><a href="#urql">🔗</a> Client usage with <a href="https://formidable.com/open-source/urql/">urql</a></summary>

```ts
import { createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { createClient as createWSClient } from 'graphql-ws';

const wsClient = createWSClient({
  url: 'ws://its.urql:4000/graphql',
});

const client = createClient({
  url: '/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return {
          subscribe: (sink) => {
            const dispose = wsClient.subscribe(operation, sink);
            return {
              unsubscribe: dispose,
            };
          },
        };
      },
    }),
  ],
});
```

</details>

<details id="apollo-client">
<summary><a href="#apollo-client">🔗</a> Client usage with <a href="https://www.apollographql.com">Apollo</a></summary>

```typescript
import {
  ApolloLink,
  Operation,
  FetchResult,
  Observable,
} from '@apollo/client/core';
import { print, GraphQLError } from 'graphql';
import { createClient, ClientOptions, Client } from 'graphql-ws';

class WebSocketLink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (err instanceof Error) {
              return sink.error(err);
            }

            if (err instanceof CloseEvent) {
              return sink.error(
                // reason will be available on clean closes
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ''}`,
                ),
              );
            }

            return sink.error(
              new Error(
                (err as GraphQLError[])
                  .map(({ message }) => message)
                  .join(', '),
              ),
            );
          },
        },
      );
    });
  }
}

const link = new WebSocketLink({
  url: 'ws://where.is:4000/graphql',
  connectionParams: () => {
    const session = getSession();
    if (!session) {
      return {};
    }
    return {
      Authorization: `Bearer ${session.token}`,
    };
  },
});
```

</details>

<details id="retry-strategy">
<summary><a href="#retry-strategy">🔗</a> Client usage with custom retry timeout strategy</summary>

```typescript
import { createClient } from 'graphql-ws';
import { waitForHealthy } from './my-servers';

const url = 'ws://i.want.retry:4000/control/graphql';

const client = createClient({
  url,
  retryWait: async function waitForServerHealthyBeforeRetry() {
    // if you have a server healthcheck, you can wait for it to become
    // healthy before retrying after an abrupt disconnect (most commonly a restart)
    await waitForHealthy(url);

    // after the server becomes ready, wait for a second + random 1-4s timeout
    // (avoid DDoSing yourself) and try connecting again
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 3000),
    );
  },
});
```

</details>

<details id="graceful-restart">
<summary><a href="#graceful-restart">🔗</a> Client usage with graceful restart</summary>

```typescript
import { createClient, Client, ClientOptions } from 'graphql-ws';
import { giveMeAFreshToken } from './token-giver';

interface RestartableClient extends Client {
  restart(): void;
}

function createRestartableClient(options: ClientOptions): RestartableClient {
  let restartRequested = false;
  let restart = () => {
    restartRequested = true;
  };

  const client = createClient({
    ...options,
    on: {
      ...options.on,
      connected: (socket) => {
        options.on?.connected?.(socket);

        restart = () => {
          if (socket.readyState === WebSocket.OPEN) {
            // if the socket is still open for the restart, do the restart
            socket.close(4205, 'Client Restart');
          } else {
            // otherwise the socket might've closed, indicate that you want
            // a restart on the next connected event
            restartRequested = true;
          }
        };

        // just in case you were eager to restart
        if (restartRequested) {
          restartRequested = false;
          restart();
        }
      },
    },
  });

  return {
    ...client,
    restart: () => restart(),
  };
}

const client = createRestartableClient({
  url: 'ws://graceful.restart:4000/is/a/non-fatal/close-code',
  connectionParams: async () => {
    const token = await giveMeAFreshToken();
    return { token };
  },
});

// all subscriptions from `client.subscribe` will resubscribe after `client.restart`
```

</details>

<details id="browser">
<summary><a href="#browser">🔗</a> Client usage in browser</summary>

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>GraphQL over WebSocket</title>
    <script
      type="text/javascript"
      src="https://unpkg.com/graphql-ws/umd/graphql-ws.min.js"
    ></script>
  </head>
  <body>
    <script type="text/javascript">
      const client = graphqlWs.createClient({
        url: 'ws://umdfor.the:4000/win/graphql',
      });

      // consider other recipes for usage inspiration
    </script>
  </body>
</html>
```

</details>

<details id="node-client">
<summary><a href="#node-client">🔗</a> Client usage in Node</summary>

```ts
const ws = require('ws'); // yarn add ws
const Crypto = require('crypto');
const { createClient } = require('graphql-ws');

const client = createClient({
  url: 'ws://no.browser:4000/graphql',
  webSocketImpl: ws,
  /**
   * Generates a v4 UUID to be used as the ID.
   * Reference: https://gist.github.com/jed/982883
   */
  generateID: () =>
    ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (Crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16),
    ),
});

// consider other recipes for usage inspiration
```

</details>

<details id="ws">
<summary><a href="#ws">🔗</a> Server usage with <a href="https://github.com/websockets/ws">ws</a></summary>

```ts
// minimal version of `import { useServer } from 'graphql-ws/lib/use/ws';`

import ws from 'ws'; // yarn add ws
import { makeServer } from 'graphql-ws';
import { schema } from './my-graphql-schema';

// make
const server = makeServer({ schema });

// create websocket server
const wsServer = new ws.Server({
  port: 4000,
  path: '/graphql',
});

// implement
wsServer.on('connection', (socket, request) => {
  // a new socket opened, let graphql-ws take over
  const closed = server.opened(
    {
      protocol: socket.protocol, // will be validated
      send: (data) =>
        new Promise((resolve, reject) => {
          socket.send(data, (err) => (err ? reject(err) : resolve()));
        }), // control your data flow by timing the promise resolve
      close: (code, reason) => socket.close(code, reason), // there are protocol standard closures
      onMessage: (cb) =>
        socket.on('message', async (event) => {
          try {
            // wait for the the operation to complete
            // - if init message, waits for connect
            // - if query/mutation, waits for result
            // - if subscription, waits for complete
            await cb(event.toString());
          } catch (err) {
            // all errors that could be thrown during the
            // execution of operations will be caught here
            socket.close(1011, err.message);
          }
        }),
    },
    // pass values to the `extra` field in the context
    { socket, request },
  );

  // notify server that the socket closed
  socket.once('close', (code, reason) => closed(code, reason));
});
```

</details>

<details id="ws-auth-handling">
<summary><a href="#ws-auth-handling">🔗</a> Server usage with <a href="https://github.com/websockets/ws">ws</a> and custom auth handling</summary>

```ts
// check extended implementation at `{ useServer } from 'graphql-ws/lib/use/ws'`

import http from 'http';
import ws from 'ws'; // yarn add ws
import { makeServer } from 'graphql-ws';
import { schema } from './my-graphql-schema';
import { validate } from './my-auth';

// extra in the context
interface Extra {
  readonly request: http.IncomingMessage;
}

// your custom auth
class Forbidden extends Error {}
function handleAuth(request: http.IncomingMessage) {
  // do your auth on every subscription connect
  const good = validate(request.headers['authorization']);
  // or const { iDontApprove } = session(request.cookies);
  if (!good) {
    // throw a custom error to be handled
    throw new Forbidden(':(');
  }
}

// make graphql server
const gqlServer = makeServer<Extra>({
  schema,
  onConnect: async (ctx) => {
    // do your auth on every connect
    await handleAuth(ctx.extra.request);
  },
  onSubscribe: async (ctx) => {
    // or maybe on every subscribe
    await handleAuth(ctx.extra.request);
  },
  onNext: async (ctx) => {
    // haha why not on every result emission?
    await handleAuth(ctx.extra.request);
  },
});

// create websocket server
const wsServer = new ws.Server({
  port: 4000,
  path: '/graphql',
});

// implement
wsServer.on('connection', (socket, request) => {
  // you may even reject the connection without ever reaching the lib
  // return socket.close(4403, 'Forbidden');

  // pass the connection to graphql-ws
  const closed = gqlServer.opened(
    {
      protocol: socket.protocol, // will be validated
      send: (data) =>
        new Promise((resolve, reject) => {
          // control your data flow by timing the promise resolve
          socket.send(data, (err) => (err ? reject(err) : resolve()));
        }),
      close: (code, reason) => socket.close(code, reason), // for standard closures
      onMessage: (cb) => {
        socket.on('message', async (event) => {
          try {
            // wait for the the operation to complete
            // - if init message, waits for connect
            // - if query/mutation, waits for result
            // - if subscription, waits for complete
            await cb(event.toString());
          } catch (err) {
            // all errors that could be thrown during the
            // execution of operations will be caught here
            if (err instanceof Forbidden) {
              // your magic
            } else {
              socket.close(1011, err.message);
            }
          }
        });
      },
    },
    // pass request to the extra
    { request },
  );

  // notify server that the socket closed
  socket.once('close', (code, reason) => closed(code, reason));
});
```

</details>

<details id="express">
<summary><a href="#express">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server usage with <a href="https://github.com/graphql/express-graphql">Express GraphQL</a></summary>

```typescript
import ws from 'ws'; // yarn add ws
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './my-graphql-schema';

// create express and middleware
const app = express();
app.use('/graphql', graphqlHTTP({ schema }));

const server = app.listen(4000, () => {
  // create and use the websocket server
  const wsServer = new ws.Server({
    server,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);
});
```

</details>

<details id="apollo-server-express">
<summary><a href="#apollo-server-express">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server usage with <a href="https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-express">Apollo Server Express</a></summary>

```typescript
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './my-graphql-schema';

// create express
const app = express();

// create apollo server
const apolloServer = new ApolloServer({ schema });

// apply middleware
apolloServer.applyMiddleware({ app });

const server = app.listen(4000, () => {
  // create and use the websocket server
  const wsServer = new ws.Server({
    server,
    path: '/graphql',
  });

  useServer({ schema }, wsServer);
});
```

</details>

<details id="ws-backwards-compat">
<summary><a href="#ws-backwards-compat">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server usage with <a href="https://github.com/apollographql/subscriptions-transport-ws">subscriptions-transport-ws</a> backwards compatibility</summary>

```ts
import https from 'https';
import ws from 'ws'; // yarn add ws
import { execute, subscribe } from 'graphql';
import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { SubscriptionServer, GRAPHQL_WS } from 'subscriptions-transport-ws';
import { schema } from './my-graphql-schema';

// graphql-ws
const graphqlWs = new ws.Server({ noServer: true });
useServer({ schema }, graphqlWs);

// subscriptions-transport-ws
const subTransWs = new ws.Server({ noServer: true });
SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  subTransWs,
);

// create https server
const server = https.createServer(function weServeSocketsOnly(_, res) {
  res.writeHead(404);
  res.end();
});

// listen for upgrades and delegate requests according to the WS subprotocol
server.on('upgrade', (req, socket, head) => {
  // extract websocket subprotocol from header
  const protocol = req.headers['sec-websocket-protocol'];
  const protocols = Array.isArray(protocol)
    ? protocol
    : protocol?.split(',').map((p) => p.trim());

  // decide which websocket server to use
  const wss =
    protocols?.includes(GRAPHQL_WS) && // subscriptions-transport-ws subprotocol
    !protocols.includes(GRAPHQL_TRANSPORT_WS_PROTOCOL) // graphql-ws subprotocol
      ? subTransWs
      : // graphql-ws will welcome its own subprotocol and
        // gracefully reject invalid ones. if the client supports
        // both transports, graphql-ws will prevail
        graphqlWs;
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});
```

</details>

<details id="logging">
<summary><a href="#logging">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server usage with console logging</summary>

```typescript
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './my-graphql-schema';

const wsServer = new ws.Server({
  port: 4000,
  path: '/graphql',
});

useServer(
  {
    schema,
    onConnect: (ctx) => {
      console.log('Connect', ctx);
    },
    onSubscribe: (ctx, msg) => {
      console.log('Subscribe', { ctx, msg });
    },
    onNext: (ctx, msg, args, result) => {
      console.debug('Next', { ctx, msg, args, result });
    },
    onError: (ctx, msg, errors) => {
      console.error('Error', { ctx, msg, errors });
    },
    onComplete: (ctx, msg) => {
      console.log('Complete', { ctx, msg });
    },
  },
  wsServer,
);
```

</details>

<details id="multi-ws">
<summary><a href="#multi-ws">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server usage on a multi WebSocket server</summary>

```typescript
import https from 'https';
import ws from 'ws'; // yarn add ws
import url from 'url';
import { createClient } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './my-graphql-schema';

const server = https.createServer(function weServeSocketsOnly(_, res) {
  res.writeHead(404);
  res.end();
});

/**
 * Two websocket servers on different paths:
 * - `/wave` sends out waves
 * - `/graphql` serves graphql
 */
const waveWS = new ws.Server({ noServer: true });
const graphqlWS = new ws.Server({ noServer: true });

// delegate upgrade requests to relevant destinations
server.on('upgrade', (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/wave') {
    return waveWS.handleUpgrade(request, socket, head, (client) => {
      waveWS.emit('connection', client, request);
    });
  }

  if (pathname === '/graphql') {
    return graphqlWS.handleUpgrade(request, socket, head, (client) => {
      graphqlWS.emit('connection', client, request);
    });
  }

  return socket.destroy();
});

// wave on connect
waveWS.on('connection', (socket) => {
  socket.send('🌊');
});

// serve graphql
useServer({ schema }, graphqlWS);

server.listen(4000);
```

</details>

<details id="context">
<summary><a href="#context">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server usage with custom context value</summary>

```typescript
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema, roots, getDynamicContext } from './my-graphql';

const wsServer = new ws.Server({
  port: 4000,
  path: '/graphql',
});

useServer(
  {
    context: (ctx, msg, args) => {
      return getDynamicContext(ctx, msg, args);
    }, // or static context by supplying the value direcly
    schema,
    roots,
  },
  wsServer,
);
```

</details>

<details id="dynamic-schema">
<summary><a href="#dynamic-schema">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server usage with dynamic schema</summary>

```typescript
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema, checkIsAdmin, getDebugSchema } from './my-graphql';

const wsServer = new ws.Server({
  port: 4000,
  path: '/graphql',
});

useServer(
  {
    schema: async (ctx, msg, executionArgsWithoutSchema) => {
      // will be called on every subscribe request
      // allowing you to dynamically supply the schema
      // using the depending on the provided arguments.
      // throwing an error here closes the socket with
      // the `Error` message in the close event reason
      const isAdmin = await checkIsAdmin(ctx.request);
      if (isAdmin) return getDebugSchema(ctx, msg, executionArgsWithoutSchema);
      return schema;
    },
  },
  wsServer,
);
```

</details>

<details id="custom-validation">
<summary><a href="#custom-validation">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server usage with custom validation</summary>

```typescript
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import { validate } from 'graphql';
import { schema, myValidationRules } from './my-graphql';

const wsServer = new ws.Server({
  port: 4000,
  path: '/graphql',
});

useServer(
  {
    validate: (schema, document) =>
      validate(schema, document, myValidationRules),
  },
  wsServer,
);
```

</details>

<details id="custom-exec">
<summary><a href="#custom-exec">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server usage with custom execution arguments</summary>

```typescript
import { parse, validate } from 'graphql';
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema, myValidationRules } from './my-graphql';

const wsServer = new ws.Server({
  port: 4000,
  path: '/graphql',
});

useServer(
  {
    onSubscribe: (ctx, msg) => {
      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
      };

      // dont forget to validate when returning custom execution args!
      const errors = validate(args.schema, args.document, myValidationRules);
      if (errors.length > 0) {
        return errors; // return `GraphQLError[]` to send `ErrorMessage` and stop subscription
      }

      return args;
    },
  },
  wsServer,
);
```

</details>

<details id="only-subscriptions">
<summary><a href="#only-subscriptions">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server usage accepting only subscription operations</summary>

```typescript
import { parse, validate, getOperationAST, GraphQLError } from 'graphql';
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './my-graphql';

const wsServer = new ws.Server({
  port: 4000,
  path: '/graphql',
});

useServer(
  {
    onSubscribe: (_ctx, msg) => {
      // construct the execution arguments
      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
      };

      const operationAST = getOperationAST(args.document, args.operationName);
      if (!operationAST) {
        // returning `GraphQLError[]` sends an `ErrorMessage` and stops the subscription
        return [new GraphQLError('Unable to identify operation')];
      }

      // handle mutation and query requests
      if (operationAST.operation !== 'subscription') {
        // returning `GraphQLError[]` sends an `ErrorMessage` and stops the subscription
        return [new GraphQLError('Only subscription operations are supported')];

        // or if you want to be strict and terminate the connection on illegal operations
        throw new Error('Only subscription operations are supported');
      }

      // dont forget to validate
      const errors = validate(args.schema, args.document);
      if (errors.length > 0) {
        // returning `GraphQLError[]` sends an `ErrorMessage` and stops the subscription
        return errors;
      }

      // ready execution arguments
      return args;
    },
  },
  wsServer,
);
```

</details>

<details id="persisted">
<summary><a href="#persisted">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server and client usage with persisted queries</summary>

```typescript
// 🛸 server

import { parse } from 'graphql';
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './my-graphql-schema';

// a unique GraphQL execution ID used for representing
// a query in the persisted queries store. when subscribing
// you should use the `SubscriptionPayload.query` to transmit the id
type QueryID = string;

const queriesStore: Record<QueryID, ExecutionArgs> = {
  iWantTheGreetings: {
    schema, // you may even provide different schemas in the queries store
    document: parse('subscription Greetings { greetings }'),
  },
};

const wsServer = new ws.Server({
  port: 4000,
  path: '/graphql',
});

useServer(
  {
    onSubscribe: (_ctx, msg) => {
      const query = queriesStore[msg.payload.query];
      if (!query) {
        // for extra security you only allow the queries from the store
        throw new Error('404: Query Not Found');
      }
      return {
        ...query,
        variableValues: msg.payload.variables, // use the variables from the client
      };
    },
  },
  wsServer,
);
```

```typescript
// 📺 client

import { createClient } from 'graphql-ws';

const client = createClient({
  url: 'ws://persisted.graphql:4000/queries',
});

(async () => {
  const onNext = () => {
    /**/
  };

  await new Promise((resolve, reject) => {
    client.subscribe(
      {
        query: 'iWantTheGreetings',
      },
      {
        next: onNext,
        error: reject,
        complete: resolve,
      },
    );
  });

  expect(onNext).toBeCalledTimes(5); // greetings in 5 languages
})();
```

</details>

<details id="ping-from-client">
<summary><a href="#ping-from-client">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server and client with client to server pings and latency</summary>

```typescript
// 🛸 server

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './my-graphql-schema';

// a custom graphql schema that holds just the ping query.
// used exclusively when the client sends a ping to the server.
// if you want to send/receive more details, simply adjust the pinger schema.
const pinger = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      ping: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: () => 'pong',
      },
    },
  }),
});

const wsServer = new WebSocket.Server({
  port: 4000,
  path: '/graphql',
});

useServer(
  {
    schema: (_ctx, msg) => {
      if (msg.payload.query === '{ ping }') return pinger;
      return schema;
    },
  },
  wsServer,
);
```

```typescript
// 📺 client

import { createClient } from 'graphql-ws';

let connection: WebSocket | undefined;
const client = createClient({
  url: 'ws://client.can:4000/send-pings/too',
  on: {
    connected: (socket) => (connection = socket as WebSocket),
    closed: () => (connection = undefined),
  },
});

async function ping() {
  // record the ping sent at moment for calculating latency
  const pinged = Date.now();

  // if the client went offline or the server is unresponsive
  // close the active WebSocket connection as soon as the pong
  // wait timeout expires and have the client silently reconnect.
  // there is no need to dispose of the subscription since it
  // will eventually settle because either:
  // - the client reconnected and a new pong is received
  // - the retry attempts were exceeded and the close is reported
  // because if this, the latency accounts for retry waits too.
  // if you do not want this, simply dispose of the ping subscription
  // as soon as the pong timeout is exceeded
  const pongTimeout = setTimeout(
    () => connection?.close(4408, 'Pong Timeout'),
    2000, // expect a pong within 2 seconds of the ping
  );

  // wait for the pong. the promise is guaranteed to settle
  await new Promise<void>((resolve, reject) => {
    client.subscribe<{ data: { ping: string } }>(
      { query: '{ ping }' },
      {
        next: () => {
          /* not interested in the pong */
        },
        error: reject,
        complete: resolve,
      },
    );
    // whatever happens to the promise, clear the pong timeout
  }).finally(() => clearTimeout(pongTimeout));

  // record when pong has been received
  const ponged = Date.now();

  // how long it took for the pong to arrive after sending the ping
  return ponged - pinged;
}

// keep pinging until a fatal problem occurs
(async () => {
  for (;;) {
    const latency = await ping();

    // or send to your favourite logger - the user
    console.info('GraphQL WebSocket connection latency', latency);

    // ping every 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
})();
```

</details>

<details id="auth-token">
<summary><a href="#auth-token">🔗</a> <a href="https://github.com/websockets/ws">ws</a> server and client auth usage with token expiration, validation and refresh</summary>

```typescript
// 🛸 server

import ws from 'ws'; // yarn add ws
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './my-graphql-schema';
import { isTokenValid } from './my-auth';

const wsServer = new WebSocket.Server({
  port: 4000,
  path: '/graphql',
});

useServer(
  {
    schema,
    onConnect: async (ctx) => {
      // do your auth check on every connect
      if (!(await isTokenValid(ctx.connectionParams?.token)))
        // returning false from the onConnect callback will close with `4403: Forbidden`;
        // therefore, being synonymous to ctx.extra.socket.close(4403, 'Forbidden');
        return false;
    },
    onSubscribe: async (ctx) => {
      // or maybe on every subscribe
      if (!(await isTokenValid(ctx.connectionParams?.token)))
        return ctx.extra.socket.close(4403, 'Forbidden');
    },
    onNext: async (ctx) => {
      // why not on every result emission? lol
      if (!(await isTokenValid(ctx.connectionParams?.token)))
        return ctx.extra.socket.close(4403, 'Forbidden');
    },
  },
  wsServer,
);
```

```typescript
// 📺 client

import { createClient } from 'graphql-ws';
import {
  getCurrentToken,
  getCurrentTokenExpiresIn,
  refreshCurrentToken,
} from './my-auth';

// non-fatal WebSocket connection close events will cause the
// client to automatically reconnect. the retries are silent, meaning
// that the client will not error out unless the retry attempts have been
// exceeded or the close event was fatal (read more about the fatal
// close events in the documentation). additionally, all active subscriptions
// will automatically resubscribe upon successful reconnect. this behaviour
// can be leveraged to implement a secure and sound way of authentication;
// handling server-side validation, expiry indication and timely token refreshes

// indicates that the server closed the connection because of
// an auth problem. it indicates that the token should refresh
let shouldRefreshToken = false,
  // the socket close timeout due to token expiry
  tokenExpiryTimeout = null;

const client = createClient({
  url: 'ws://server-validates.auth:4000/graphql',
  connectionParams: async () => {
    if (shouldRefreshToken) {
      // refresh the token because it is no longer valid
      await refreshCurrentToken();
      // and reset the flag to avoid refreshing too many times
      shouldRefreshToken = false;
    }
    return { token: getCurrentToken() };
  },
  on: {
    connected: (socket) => {
      // clear timeout on every connect for debouncing the expiry
      clearTimeout(tokenExpiryTimeout);

      // set a token expiry timeout for closing the socket
      // with an `4403: Forbidden` close event indicating
      // that the token expired. the `closed` event listner below
      // will set the token refresh flag to true
      tokenExpiryTimeout = setTimeout(() => {
        if (socket.readyState === WebSocket.OPEN)
          socket.close(4403, 'Unauthorized');
      }, getCurrentTokenExpiresIn());
    },
    closed: (event) => {
      // if closed with the `4403: Forbidden` close event
      // the client or the server is communicating that the token
      // is no longer valid and should be therefore refreshed
      if (event.code === 4403) shouldRefreshToken = true;
    },
  },
});
```

</details>

## [Documentation](docs/)

Check the [docs folder](docs/) out for [TypeDoc](https://typedoc.org) generated documentation.

## [How does it work?](PROTOCOL.md)

Read about the exact transport intricacies used by the library in the [GraphQL over WebSocket Protocol document](PROTOCOL.md).

## [Want to help?](CONTRIBUTING.md)

File a bug, contribute with code, or improve documentation? Read up on our guidelines for [contributing](CONTRIBUTING.md) and drive development with `yarn test --watch` away!

## Disclaimer

This library and the [GraphQL over WebSocket Protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) are **not** cross-compatible with the legacy [`subscriptions-transport-ws`](https://github.com/apollographql/subscriptions-transport-ws) and its [accompanying Protocol](https://github.com/apollographql/subscriptions-transport-ws/blob/master/PROTOCOL.md).

You must use `graphql-ws` coherently and implement the [GraphQL over WebSocket Protocol](https://github.com/enisdenjo/graphql-ws/blob/master/PROTOCOL.md) on both sides, server and the client.
