import React, {useState} from 'react';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import {useBlogs} from './fetch/useBlogs';
import {colors} from '../../style/palette';
import {FlatList, Image, StyleSheet} from 'react-native';
import {IconButton} from '../../components/IconButton';
import {Spacer} from '../../components/Spacer';

export const BlogsScreen = () => {
  const [likedBlog, setLikedBlog] = useState(false);
  const {blogsList, loading, error} = useBlogs();
  return (
    <Screen preventScroll withTopInsets queryStatus={{loading, error}}>
      <FlatList
        data={blogsList}
        keyExtractor={item => String(item.id)}
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
                iconColor={colors.white}>
                <Text colorOffWhite onPress={async () => {}}>
                  Create
                </Text>
              </IconButton>
            </View>
          </View>
        )}
        renderItem={({item: blog}) => {
          return (
            <View paddingVerticalSmall paddingHorizontalMedium>
              <View style={styles.postContainer} backgroundColorWhite>
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
                      iconName={likedBlog ? 'heart-filled' : 'heart-empty'}
                      iconColor={!likedBlog ? colors.dark : colors.error}
                      paddingVerticalSmall
                      iconSize={20}
                      centerContent
                      style={styles.likePostButton}
                      iconLeft
                      onPress={() => setLikedBlog(!likedBlog)}
                    />
                    <Spacer small />
                    <IconButton
                      iconName={'comment'}
                      iconSize={20}
                      centerContent
                      paddingVerticalSmall
                      style={styles.commentPostButton}
                      iconLeft
                      onPress={() => setLikedBlog(!likedBlog)}>
                      <Text extraSmall>Comments: {blog.comments.length}</Text>
                    </IconButton>
                  </View>
                  <IconButton
                    iconName={'share'}
                    iconSize={20}
                    iconColor={!likedBlog ? colors.dark : colors.white}
                    centerContent
                    paddingVerticalSmall
                    style={styles.sharePostButton}
                    iconLeft
                    onPress={() => setLikedBlog(!likedBlog)}
                  />
                </View>
              </View>
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
