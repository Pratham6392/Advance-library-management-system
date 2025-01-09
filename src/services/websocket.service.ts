import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

let io: SocketIOServer;

export const websocketService = {
  initialize(server: HttpServer) {
    io = new SocketIOServer(server);

    io.use((socket, next) => {
      if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token as string, JWT_SECRET, (err, decoded) => {
          if (err) return next(new Error('Authentication error'));
          socket.data.user = decoded;
          next();
        });
      } else {
        next(new Error('Authentication error'));
      }
    }).on('connection', (socket) => {
      console.log('New client connected');
      socket.join(`user_${socket.data.user.id}`);

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    console.log('WebSocket server initialized');
  },

  sendNotificationToUser(userId: number, notification: any) {
    io.to(`user_${userId}`).emit('notification', notification);
  },

  sendNotificationToAll(notification: any) {
    io.emit('notification', notification);
  }
};

