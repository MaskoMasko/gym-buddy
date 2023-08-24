import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, Image, Share, StyleSheet} from 'react-native';
import {IconButton} from '../../components/IconButton';
import {Screen} from '../../components/Screen';
import {Spacer} from '../../components/Spacer';
import {Text} from '../../components/Text';
import {TouchableOpacity} from '../../components/TouchableOpacity';
import {View} from '../../components/View';
import useAuth from '../../hooks/useAuth';
import {RootStackNavigationProps} from '../../navigation/RouterTypes';
import {colors} from '../../style/palette';
import {useBlogs} from './fetch/useBlogs';
import {useLikes} from './fetch/useLikes';

export const BlogsScreen = () => {
  const {loggedUser} = useAuth();
  const {blogsList, loading, error} = useBlogs();
  const [isPressInShare, setIsPressInShare] = useState(false);
  const navigation =
    useNavigation<RootStackNavigationProps<'RootBottomTab'>['navigation']>();
  const {createLike, deleteLike} = useLikes();

  return (
    <Screen preventScroll withTopInsets queryStatus={{loading, error}}>
      <FlatList
        data={blogsList}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View
            flexDirectionRow
            justifyContentSpaceBetween
            paddingHorizontalMedium
            paddingVerticalSmall>
            <Text extraLarge>Fitness News</Text>
            <View flexDirectionRow style={styles.createBlogButton}>
              <IconButton
                iconRight
                iconName="circle-plus"
                iconColor={colors.white}
                onPress={() => navigation.navigate('CreatePostScreen')}>
                <Text colorOffWhite>Create</Text>
              </IconButton>
            </View>
          </View>
        )}
        renderItem={({item: blog}) => {
          const didUserLike = blog.likes.find(
            like => like.user?.id === loggedUser?.id,
          );
          return (
            <View paddingVerticalSmall paddingHorizontalMedium>
              <TouchableOpacity
                style={styles.postContainer}
                backgroundColorWhite
                onPress={() =>
                  navigation.navigate('PostDetailsScreen', {post: blog})
                }
                activeOpacity={0.7}>
                <Text large>{blog.title}</Text>
                <Text weightLight>{blog.content}</Text>
                <Spacer extraSmall />
                <View>
                  <Image
                    source={{uri: blog.media![0].url}}
                    style={{
                      height: 350,
                    }}
                  />
                  <Spacer extraSmall />
                  <Text extraSmall weightLight>
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor nesciunt fuga magnam, fugiat earum itaque voluptate
                    assumenda quisquam nulla quam?'
                  </Text>
                </View>
                <Spacer extraSmall />
                <View
                  paddingVerticalSmall
                  flexDirectionRow
                  justifyContentSpaceBetween>
                  <View flexDirectionRow>
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
                            postId: blog.id,
                            userId: loggedUser.id,
                          });
                        }
                        return await createLike({
                          postId: blog.id,
                          userId: loggedUser.id,
                        });
                      }}>
                      <Text extraSmall>Likes: {blog.likes.length}</Text>
                    </IconButton>
                    <Spacer small />
                    <IconButton
                      iconName={'comment'}
                      iconSize={20}
                      centerContent
                      paddingVerticalSmall
                      style={styles.commentPostButton}
                      iconLeft
                      onPress={() => {}}>
                      <Text extraSmall>Comments: {blog.comments.length}</Text>
                    </IconButton>
                  </View>
                  <IconButton
                    iconName={'share'}
                    iconSize={20}
                    iconColor={isPressInShare ? colors.dark : colors.white}
                    centerContent
                    paddingVerticalSmall
                    style={styles.sharePostButton}
                    iconLeft
                    onPressIn={() => {
                      setIsPressInShare(true);
                      Share.share({
                        message: 'Share with something idk...',
                        url: 'www.google.com',
                        title: 'Share with',
                      });
                    }}
                    onPressOut={() => setIsPressInShare(false)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  createBlogButton: {
    borderRadius: 20,
    backgroundColor: colors.darkGray,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: colors.dark,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  likePostButton: {
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
    // width: 40,
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
  commentPostButton: {
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
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
  sharePostButton: {
    width: 40,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
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
});
