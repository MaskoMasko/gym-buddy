import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {FlatList, Image} from 'react-native';
import {Button} from '../../components/Button';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TextInput} from '../../components/TextInput';
import {View} from '../../components/View';
import useAuth from '../../hooks/useAuth';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import {colors} from '../../style/palette';
import {useComments} from './fetch/useComments';
import {usePost} from './fetch/usePost';
import {IconButton} from '../../components/IconButton';
import {useLikes} from './fetch/useLikes';

const defaultImage = require('../../assets/images/default-profile-img.png');

export const PostDetailsScreen = () => {
  const {loggedUser} = useAuth();
  const navigation = useNavigation();
  const params =
    useRoute<RootStackNavigationProps<'PostDetailsScreen'>['route']>().params;
  const {queryData: post, loading, error} = usePost({postId: params.post.id});
  const [commentText, setCommentText] = useState('');

  useLayoutEffect(() => {
    if (params) {
      navigation.setOptions({title: params.post.title});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {createComment} = useComments({postId: post.id});
  const {createLike, deleteLike} = useLikes();
  const didUserLike = post.likes?.find(
    like => like.user?.id === loggedUser?.id,
  );

  return (
    <Screen withBottomInsets preventScroll queryStatus={{loading, error}}>
      <View paddingMedium>
        <FlatList
          data={post.comments}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <>
                <View
                  flexDirectionRow
                  justifyContentSpaceBetween
                  alignItemsCenter>
                  <Text>{post.content}</Text>
                  <View paddingHorizontalExtraSmall>
                    <IconButton
                      iconName={didUserLike ? 'heart-filled' : 'heart-empty'}
                      iconColor={!didUserLike ? colors.dark : colors.error}
                      paddingVerticalSmall
                      iconSize={20}
                      centerContent
                      style={styles.likePostButton}
                      iconLeft
                      onPress={async () => {
                        if (!loggedUser) {
                          return;
                        }
                        if (didUserLike) {
                          return await deleteLike({
                            postId: post.id,
                            userId: loggedUser.id,
                          });
                        }
                        return await createLike({
                          postId: post.id,
                          userId: loggedUser.id,
                        });
                      }}
                    />
                  </View>
                </View>
                <Spacer small />
                <View flex centerContent>
                  <Image
                    source={{uri: post.media![0].url}}
                    height={500}
                    style={{aspectRatio: 1}}
                  />
                </View>
                <Spacer small />
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Numquam corporis optio quos eos nemo dicta quisquam
                  repellendus ea obcaecati necessitatibus.
                </Text>
                <Spacer />
                <Text large>Comments</Text>
                <Spacer small />
              </>
            );
          }}
          renderItem={({item: comment}) => {
            return (
              <View>
                <View flexDirectionRow alignItemsCenter>
                  <Image source={defaultImage} style={styles.imageDimensions} />
                  <Spacer extraSmall />
                  <Text weightLight>@{comment.author?.name}</Text>
                </View>
                <Text small>{comment.content}</Text>
                <Spacer small />
              </View>
            );
          }}
          ListFooterComponent={() => (
            //text input height cause its positioned absolute
            <View style={{paddingBottom: 50}} />
          )}
        />
      </View>
      <View
        flexDirectionRow
        paddingSmall
        paddingHorizontalMedium
        backgroundColorWhite
        style={{position: 'absolute', bottom: 10}}>
        <View flex>
          <TextInput
            label={'Add comment...'}
            value={commentText}
            onChangeText={setCommentText}
          />
        </View>
        <View paddingVerticalSmall>
          <Button
            onPress={async () => {
              if (!loggedUser) {
                return;
              }
              await createComment({
                authorId: loggedUser.id,
                content: commentText,
              });
            }}>
            Send
          </Button>
        </View>
      </View>
    </Screen>
  );
};

const styles = {
  imageDimensions: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.darkGray,
  },
  likePostButton: {
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    width: 40,
    borderWidth: 1,
    borderColor: colors.disabled,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
};
