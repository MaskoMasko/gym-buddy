import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import {Alert} from '../components/Alert';
import {Modal} from '../components/Modal';

export type AlertContextProps = (
  title: string,
  message: string,
  buttons?: {
    text: string;
    onPress: () => void;
    style?: 'cancel' | 'success' | 'destructive';
  }[],
) => void;
export type AlertButtonsType = Parameters<AlertContextProps>[2];
export const AlertContext = createContext<undefined | AlertContextProps>(
  undefined,
);
export const AlertContextProvider = ({children}: {children: ReactNode}) => {
  const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  const [alertButtons, setAlertButtons] = useState<AlertButtonsType>([
    {
      text: 'Continue',
      onPress: () => setIsAlertModalVisible(false),
      style: 'success',
    },
  ]);
  const [alertContent, setAlertContent] = useState<{
    title: string;
    message: string;
  }>({title: '', message: ''});

  const alert = useCallback(
    (title: string, message: string, buttons: AlertButtonsType) => {
      setIsAlertModalVisible(true);
      setAlertContent({title, message});
      if (buttons) {
        setAlertButtons(buttons);
      }
    },
    [],
  );

  return (
    <AlertContext.Provider value={alert}>
      {children}
      <Modal isVisible={isAlertModalVisible}>
        <Alert
          onClose={() => setIsAlertModalVisible(false)}
          buttons={alertButtons}
          {...alertContent}
        />
      </Modal>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const alertContext = useContext<undefined | AlertContextProps>(AlertContext);
  if (!alertContext) {
    throw new Error('useAlert called without Provider');
  }
  return alertContext;
};
