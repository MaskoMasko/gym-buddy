import {useState, useEffect} from 'react';
import Config from 'react-native-config';
import {Socket, io} from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!Config.BASE_URL) {
      throw Error(
        '.env file missing or BASE_URL property missing in .env file.',
      );
    }
    const newSocket = io(Config.BASE_URL);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return socket;
};
