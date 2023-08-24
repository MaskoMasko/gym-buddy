import React, {useState} from 'react';
import {View} from '../../components/View';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {TextInput} from '../../components/TextInput';
import {Button} from '../../components/Button';
import {Spacer} from '../../components/Spacer';
import {useBlogs} from './fetch/useBlogs';
import useAuth from '../../hooks/useAuth';
import dayjs from 'dayjs';

export const CreatePostScreen = () => {
  const {createBlog, loading, error} = useBlogs();
  const {loggedUser} = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  return (
    <Screen withBottomInsets queryStatus={{loading, error}}>
      <View paddingMedium>
        <Text>Title: </Text>
        <TextInput
          placeholder="Enter Title"
          label={'title'}
          onChangeText={setTitle}
        />
        <Spacer small />
        <Text>Content: </Text>
        <TextInput
          placeholder="Enter Content"
          label={'content'}
          onChangeText={setContent}
        />
        <Spacer small />
        <Text>Add Photos:</Text>
        <Button onPress={() => {}} light>
          Access Gallery
        </Button>
        <Spacer extraSmall />
        <Button onPress={() => {}} light>
          Take a Photo
        </Button>
        <Spacer small />
        <Text>Description:</Text>
        <TextInput placeholder="Enter Description" label={'description'} />
      </View>
      <View paddingHorizontalMedium flex>
        <Button
          onPress={async () => {
            await createBlog({
              title,
              content,
              authorId: loggedUser?.id,
              createdAt: dayjs().toISOString(),
              updatedAt: dayjs().toISOString(),
            } as any);
          }}>
          Crete Post
        </Button>
      </View>
    </Screen>
  );
};
