import {ImageZoom} from '@likashefqet/react-native-image-zoom';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import Modal from 'react-native-modal';
import {LoadingView} from './LoadingView';
import {TouchableOpacity} from './TouchableOpacity';

export const ImagePreview = ({
  image,
  isImagePreviewVisible,
  setIsImagePreviewVisible,
}: {
  image: {id: number; image: string};
  isImagePreviewVisible: boolean;
  setIsImagePreviewVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const windowWidth = useWindowDimensions().width;
  return (
    <Modal
      isVisible={isImagePreviewVisible}
      animationOut={'slideOutDown'}
      animationInTiming={400}
      animationOutTiming={400}>
      <TouchableOpacity
        onPress={() => setIsImagePreviewVisible(false)}
        flex
        centerContent>
        <ImageZoom
          uri={image.image}
          minScale={0.5}
          maxScale={3}
          renderLoader={() => <LoadingView />}
          style={{width: windowWidth}}
        />
      </TouchableOpacity>
    </Modal>
  );
};
