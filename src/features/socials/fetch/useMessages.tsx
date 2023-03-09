import {create} from 'zustand';
import useAuth, {Message} from '../../../hooks/useAuth';
import {useEffect} from 'react';

const _messagesStore = create<{
  messagesList: Message[];
  setMessagesList: (newMessagesList: Message[]) => void;
}>(set => ({
  messagesList: [],
  setMessagesList: newMessagesList =>
    set(() => ({messagesList: newMessagesList})),
}));

export const useMessages = (roomId: number) => {
  const messagesStore = _messagesStore(state => state);
  const {loggedUser} = useAuth();
  if (!loggedUser) {
    throw Error('User has to be logged in to continue!');
  }

  useEffect(() => {
    const messages = loggedUser.chatRooms.find(
      room => roomId === room.id,
    )?.messages;
    if (!messages) {
      return;
    }
    messagesStore.setMessagesList(messages);
    //leave it like this for now
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedUser]);

  return {
    store: messagesStore,
  };
};
