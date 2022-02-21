import http from 'http';
import express from 'express';
import cors from 'cors';
import {Server, LobbyRoom} from 'colyseus';
// import {monitor} from '@colyseus/monitor';
// import socialRoutes from '@colyseus/social/express';

import {ChatRoom} from './src/ChatRoom';

const port = Number(process.env.PORT || 2567);
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
  server,
});
gameServer.define('lobbyroom', LobbyRoom);
// register your room handlers
gameServer.define('chatroom', ChatRoom).enableRealtimeListing();

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/authentication/)
 * - also uncomment the import statement
 */
// app.use('/', socialRoutes);

// register colyseus monitor AFTER registering your room handlers
// app.use('/colyseus', monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${ port }`);
