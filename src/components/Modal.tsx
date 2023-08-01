import React from 'react';
import {Modal as RNModal, ModalProps as RNModalProps} from 'react-native';
import {Backdrop} from './Backdrop';

interface ModalCustomProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose?: () => void;
  backdropColor?: string;
}
type ModalProps = ModalCustomProps & RNModalProps;

export const Modal = ({
  children,
  isVisible,
  onClose,
  backdropColor,
  ...props
}: ModalProps) => {
  function handleOnModalClose() {
    if (onClose) {
      onClose();
    }
  }
  return (
    <RNModal {...props} visible={isVisible} transparent>
      <Backdrop
        onPress={handleOnModalClose}
        style={{backgroundColor: backdropColor}}>
        {children}
      </Backdrop>
    </RNModal>
  );
};
