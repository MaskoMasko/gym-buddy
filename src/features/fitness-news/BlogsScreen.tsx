import axios from 'axios';
import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import {sizes} from '../../style/componentConstants';
import {ScreenNoScroll} from '../../components/ScreenNoScroll';

export const BlogsScreen = () => {
  const {data, isLoading, isError, isIdle} = useQuery('blogs', async () => {
    const res = await axios.get('http://localhost:4000/blogs');
    return res.data;
  });
  if (isIdle || isLoading) {
    return <Text>Loading...</Text>;
  }
  if (isError) {
    return <Text>Error...</Text>;
  }
  return (
    <ScreenNoScroll>
      <ScrollView>
        {data.data.map((item: any) => {
          return (
            <View
              key={item.id}
              style={{
                margin: sizes.large,
              }}
              centerContent>
              <Image source={{uri: item.image}} style={styles.image} />
              <Text>{item.title}</Text>
            </View>
          );
        })}
      </ScrollView>
    </ScreenNoScroll>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '95%',
    height: 200,
    margin: sizes.medium,
  },
});
