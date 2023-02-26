import React from 'react';
import {Spacer} from '../../components/Spacer';
import {Screen} from '../../components/Screen';
import {Text} from '../../components/Text';
import {View} from '../../components/View';
import {Image, StyleSheet} from 'react-native';
import {Icon, IconProps} from '../../svg/icons/Icon';

//TODO: rework this shit
export const ProfileScreen = () => {
  const optionsData = [
    {
      text: 'Call',
      iconName: 'phone',
    },
    {
      text: 'Message',
      iconName: 'message',
    },
    {
      text: 'Video Call',
      iconName: 'video-camera',
    },
  ];
  return (
    <Screen>
      <View
        backgroundColorLight
        centerContent
        marginLarge
        style={{height: '30%'}}>
        <View backgroundColorWhite marginExtraLarge style={{borderRadius: 50}}>
          <Image
            source={require('../../assets/images/default-profile-img.png')}
            style={{width: 50, height: 50}}
          />
        </View>
        <View marginMedium>
          <Text extraLarge colorLightGray>
            Massimo Persic
          </Text>
        </View>
      </View>
      <View marginVerticalExtraLarge marginHorizontalLarge>
        <Text large weightBold>
          About me
        </Text>
        <Text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi
          dolores magni aliquid perferendis praesentium vel et harum veniam
          facilis eos?
        </Text>
        <Spacer />
        <Text large weightBold>
          My location
        </Text>
        <Spacer extraSmall />
        <View flexDirectionRow>
          <Icon name="map-marker" />
          <Spacer extraSmall />
          <Text>Ur mom, istocna Istra, Hrvatska</Text>
        </View>
        <Spacer small />
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Spacer />
        <Text large weightBold>
          Options
        </Text>
        <View
          flexDirectionRow
          justifyContentSpaceAround
          marginVerticalExtraLarge>
          {optionsData.map(item => {
            return (
              <View centerContent flex key={item.text}>
                <Icon name={item.iconName as IconProps['name']} size={30} />
                <Spacer extraSmall />
                <Text>{item.text}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </Screen>
  );
};
