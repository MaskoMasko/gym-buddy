import {http} from '../../../service/http/http';
import useAuth from '../../../hooks/useAuth';
import {useMutation} from 'react-query';
// import {client} from '../../../service/react-query/queryClient';

export const useSendMessage = () => {
  const {loggedUser} = useAuth();
  const _sendMessage = async ({
    roomId,
    message,
  }: {
    roomId: number;
    message: string;
  }) => {
    const response = await http.post('/messages', {
      text: message,
      senderId: loggedUser?.id,
      chatRoomId: roomId,
    });
    return response.data;
  };
  const {
    mutateAsync: sendMessage,
    isLoading,
    isError,
  } = useMutation(['sent-message'], _sendMessage, {
    // async onSuccess() {
    //   await client.invalidateQueries(['user']);
    // },
  });

  return {
    sendMessage,
    loading: isLoading,
    error: isError,
  };
};
