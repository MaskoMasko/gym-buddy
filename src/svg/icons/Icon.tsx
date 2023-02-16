import React from 'react';
import {colors} from '../../style/palette';
import Svg, {Defs, G, Path, Rect} from 'react-native-svg';
import {Text} from '../../components/Text';

export interface IconProps {
  size?: number;
  color?: string;
  name:
    | 'back-arrow'
    | 'checkbox-filled'
    | 'checkmark'
    | 'map'
    | 'weight'
    | 'message'
    | 'message-2'
    | 'profile'
    | 'statistics'
    | 'map-marker'
    | 'phone'
    | 'video-camera'
    | 'projection'
    | 'google'
    | 'apple'
    | 'blog';
}

export const Icon = ({name, color = colors.dark, size = 24}: IconProps) => {
  switch (name) {
    case 'back-arrow':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m10.79 4.387-.083-.094a1 1 0 0 0-1.32-.083l-.094.083-7 7-.042.044-.055.068-.071.11-.054.114-.035.105-.03.148L2 12l.003.075.017.126.03.111.044.111.052.098.074.104.073.082 7 7a1 1 0 0 0 1.497-1.32l-.083-.094L5.416 13H21a1 1 0 1 0 0-2H5.414l5.293-5.293a1 1 0 0 0 .083-1.32l-.083-.094.083.094Z"
            fill={color}
          />
        </Svg>
      );
    case 'checkbox-filled':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect width={size} height={size} rx={4} fill={color} />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m9.91 14.496-2.203-2.203a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.493-.09l7-8a1 1 0 1 0-1.572-1.235L9.91 14.496Z"
            fill="#fff"
          />
        </Svg>
      );
    case 'map':
      return (
        <Svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill={color}
          strokeWidth={0}>
          <Path
            d="m19.985 28.05 7.033-3.214V3.95l-7.033 3.213V28.05zm-7.97-3.214 6.98 2.893V6.842l-6.98-2.892v20.886zM3.981 7.163V28.05l7.043-2.892V4.271L3.981 7.163z"
            stroke="none"
          />
        </Svg>
      );
    case 'weight':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 32" fill={color}>
          <Path d="M30.206 14.272h-.11v-.938c0-.895-.726-1.621-1.621-1.621h-.467v-1.305c0-.895-.727-1.621-1.621-1.621h-2.713a1.62 1.62 0 0 0-1.619 1.621v3.864H9.937v-3.864c0-.895-.727-1.621-1.621-1.621H5.603c-.894 0-1.62.726-1.62 1.621v1.305h-.47c-.894 0-1.62.726-1.62 1.621v.938H1.68c-.926 0-1.68.744-1.68 1.672 0 .927.754 1.671 1.68 1.671h.213v.938a1.62 1.62 0 0 0 1.62 1.621h.47v1.305c0 .895.726 1.621 1.62 1.621h2.713c.894 0 1.621-.727 1.621-1.621v-3.863h12.118v3.863a1.62 1.62 0 0 0 1.619 1.621h2.713c.896 0 1.621-.727 1.621-1.621v-1.305h.467a1.62 1.62 0 0 0 1.621-1.621v-.938h.109c.928 0 1.682-.744 1.682-1.671 0-.928-.752-1.672-1.681-1.672z" />
        </Svg>
      );
    case 'message':
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size}>
          <G fill="none" fillRule="evenodd">
            <Path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
            <Path
              d="M2 6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7.333L4 21.5c-.824.618-2 .03-2-1V6Zm5 3a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2H8Z"
              fill={color}
            />
          </G>
        </Svg>
      );
    case 'statistics':
      return (
        <Svg height={size} width={size} viewBox="0 0 294 294" fill={color}>
          <Path d="M279 250H15c-8.284 0-15 6.716-15 15s6.716 15 15 15h264c8.284 0 15-6.716 15-15s-6.716-15-15-15zM30.5 228h47a9.5 9.5 0 0 0 9.5-9.5v-130a9.5 9.5 0 0 0-9.5-9.5h-47a9.5 9.5 0 0 0-9.5 9.5v130a9.5 9.5 0 0 0 9.5 9.5zM123.5 228h47a9.5 9.5 0 0 0 9.5-9.5v-195a9.5 9.5 0 0 0-9.5-9.5h-47a9.5 9.5 0 0 0-9.5 9.5v195a9.5 9.5 0 0 0 9.5 9.5zM216.5 228h47a9.5 9.5 0 0 0 9.5-9.5v-105a9.5 9.5 0 0 0-9.5-9.5h-47a9.5 9.5 0 0 0-9.5 9.5v105a9.5 9.5 0 0 0 9.5 9.5z" />
        </Svg>
      );
    case 'profile':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <G fillRule="evenodd" clipRule="evenodd" fill={color}>
            <Path d="M6.75 6.5a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0ZM4.25 18.571a5.321 5.321 0 0 1 5.321-5.321h4.858a5.321 5.321 0 0 1 5.321 5.321 4.179 4.179 0 0 1-4.179 4.179H8.43a4.179 4.179 0 0 1-4.179-4.179Z" />
          </G>
        </Svg>
      );
    case 'map-marker':
      return (
        <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 2c2.754 0 5 2.378 5 5.328 0 1.716-1.487 3.88-4.685 6.425L8 14c-3.416-2.652-5-4.901-5-6.672C3 4.378 5.246 2 8 2Zm0 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
            fill={color}
          />
        </Svg>
      );
    case 'phone':
      return (
        <Svg viewBox="0 0 12 12" width={size} height={size} fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.062 5H4a1 1 0 0 0 1-1V2a2 2 0 0 0-2-2H1a1 1 0 0 0-1 1c0 5.768 5.232 11 11 11a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2H8a1 1 0 0 0-1 1v.938a10 10 0 0 1-3.764-3.633L3.062 5Z"
            fill={color}
          />
        </Svg>
      );
    case 'message-2':
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size} fill="none">
          <Path
            d="M7 8.5h5M7 12h8m-5.316 6H16.2c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 15.72 21 14.88 21 13.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 3 17.88 3 16.2 3H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 5.28 3 6.12 3 7.8v12.535c0 .533 0 .8.11.937a.5.5 0 0 0 .39.188c.176 0 .384-.167.8-.5l2.385-1.908c.488-.39.731-.585 1.002-.724.241-.122.497-.212.762-.267C8.748 18 9.06 18 9.684 18Z"
            stroke={color}
            strokeWidth={1.008}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'video-camera':
      return (
        <Svg viewBox="0 0 256 256" width={size} height={size} fill={color}>
          <Path d="M176 92v96a16.018 16.018 0 0 1-16 16H48a40.046 40.046 0 0 1-40-40V68a16.018 16.018 0 0 1 16-16h112a40.046 40.046 0 0 1 40 40Zm68.016-18.919a8.003 8.003 0 0 0-7.985-.027l-40 22.857a8 8 0 0 0-4.031 6.946v50.286a8 8 0 0 0 4.031 6.946l40 22.857A8 8 0 0 0 248 176V80a7.998 7.998 0 0 0-3.984-6.919Z" />
        </Svg>
      );
    case 'projection':
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
          <G id="SVGRepo_iconCarrier">
            <Defs />
            <G id="Card">
              <Path d="M3 19h8v1a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2v-1h8V7h1V2H2v5h1Zm16-2H5V7h14ZM4 4h16v1H4Z" />
              <Path d="M10 9.23v5.45l4.72-2.73L10 9.23z" />
            </G>
          </G>
        </Svg>
      );
    case 'blog':
      return (
        <Svg width={size} height={size} viewBox="0 0 512 512">
          <Path
            d="M469.333 85.333v341.334H42.667V85.333h426.666Zm-64 213.334h-128v32h128v-32Zm0-64h-128v32h128v-32Zm-170.666-64h-128v96h128v-96Zm170.666 0h-128v32h128v-32Z"
            fill={color}
            fillRule="evenodd"
          />
        </Svg>
      );
    case 'google':
      return (
        <Svg width={size} height={size} fill="none" viewBox="0 0 20 21">
          <Path
            d="M18.17 8.62h-.67v-.035H10v3.333h4.709a4.998 4.998 0 0 1-9.71-1.667 5 5 0 0 1 5-5c1.275 0 2.434.481 3.317 1.267l2.357-2.358A8.295 8.295 0 0 0 10 1.918a8.334 8.334 0 1 0 8.172 6.701Z"
            fill="#FFC107"
          />
          <Path
            d="M2.627 6.373 5.365 8.38a4.998 4.998 0 0 1 4.634-3.129c1.275 0 2.435.481 3.317 1.267l2.358-2.358a8.295 8.295 0 0 0-5.675-2.242 8.329 8.329 0 0 0-7.372 4.455Z"
            fill="#FF3D00"
          />
          <Path
            d="M10 18.586a8.294 8.294 0 0 0 5.588-2.164l-2.58-2.182a4.962 4.962 0 0 1-3.007 1.012 4.998 4.998 0 0 1-4.701-3.31l-2.718 2.093a8.327 8.327 0 0 0 7.419 4.55Z"
            fill="#4CAF50"
          />
          <Path
            d="M18.171 8.62H17.5v-.034H10v3.333h4.71a5.017 5.017 0 0 1-1.703 2.322v-.001l2.58 2.182c-.182.166 2.746-2.003 2.746-6.17 0-.558-.057-1.104-.162-1.631Z"
            fill="#1976D2"
          />
        </Svg>
      );
    case 'apple':
      return (
        <Svg
          fill={color}
          viewBox="0 0 24 24"
          width={size}
          height={size}
          stroke={color}>
          <Path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83ZM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11Z" />
        </Svg>
      );
    default:
      return <Text>Icon doesn't exist</Text>;
  }
};
