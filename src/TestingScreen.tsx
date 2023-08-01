import React from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import {View} from './components/View';
import {Text} from './components/Text';

export const TestingScreen = () => {
  const fetchData = async () => {
    console.log('was here');
    try {
      const response = await axios.post(
        'http://192.168.10.151:8000/api/auth/login',
        {
          pin: '2222',
        },
        {
          insecureHTTPParser: true,
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text>Something is here</Text>
    </View>
  );
};
