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
    | 'map-outline'
    | 'weight'
    | 'weight-outline'
    | 'message'
    | 'message-outline'
    | 'profile'
    | 'statistics'
    | 'statistics-outline'
    | 'map-marker'
    | 'phone'
    | 'video-camera'
    | 'projection'
    | 'google'
    | 'apple'
    | 'user-add'
    | 'arrow-down'
    | 'arrow-up'
    | 'circle-plus'
    | 'close'
    | 'info-circle-filled'
    | 'info-circle-outline'
    | 'pause'
    | 'stop'
    | 'play'
    | 'chevron-right'
    | 'chevron-left'
    | 'blog';
}

export const Icon = ({name, color = colors.dark, size = 24}: IconProps) => {
  switch (name) {
    case 'user-add':
      return (
        <Svg viewBox="0 0 24 24" fill="none" height={size} width={size}>
          <Path
            d="M4 20v-1a5 5 0 0 1 5-5h3.75m4.785-.036V17.5m0 0v3.535m0-3.535h3.536m-3.536 0H14M15 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
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
    case 'map-outline':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <G
            stroke={color}
            strokeWidth={1.464}
            strokeLinecap="round"
            strokeLinejoin="round">
            <Path d="M3 19.382V5.721a1 1 0 0 1 .684-.949l4.684-1.561a2 2 0 0 1 1.264 0l4.736 1.578a2 2 0 0 0 1.264 0l4.052-1.35A1 1 0 0 1 21 4.387v12.995a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381ZM15 5v15.5M9 4v14" />
          </G>
        </Svg>
      );
    case 'weight':
      return (
        <Svg viewBox="0 0 512 512" width={size} height={size} fill={color}>
          <G id="SVGRepo_iconCarrier">
            <Path d="M141.698 141.549H79.077c-8.488 0-15.37 6.882-15.37 15.362V355.09c0 8.479 6.882 15.362 15.37 15.362h62.622c8.489 0 15.371-6.883 15.371-15.362V156.911c0-8.48-6.883-15.362-15.372-15.362zM32.374 189.734H12.803C5.736 189.734 0 195.47 0 202.537v106.925c0 7.068 5.736 12.803 12.803 12.803h19.571c7.067 0 12.803-5.736 12.803-12.803V202.537c0-7.067-5.736-12.803-12.803-12.803zM177.69 228.894h156.62v54.212H177.69zM432.922 141.549h-62.621c-8.488 0-15.371 6.882-15.371 15.362V355.09c0 8.479 6.882 15.362 15.371 15.362h62.621c8.488 0 15.371-6.883 15.371-15.362V156.911c0-8.48-6.882-15.362-15.371-15.362zM499.197 189.734h-19.57c-7.068 0-12.803 5.736-12.803 12.803v106.925c0 7.068 5.736 12.803 12.803 12.803h19.57c7.068 0 12.803-5.736 12.803-12.803V202.537c0-7.067-5.736-12.803-12.803-12.803z" />
          </G>
        </Svg>
      );
    case 'message':
      return (
        <Svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 1.815.485 3.52 1.331 4.988.173.3.202.664.057.977l-.854 1.837A1.5 1.5 0 0 0 3.862 22H12c5.523 0 10-4.477 10-10S17.523 2 12 2ZM8 13.3a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Zm8 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Zm-4 0a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z"
            fill={color}
          />
        </Svg>
      );
    case 'statistics':
      return (
        <Svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          color={colors.light}>
          <G id="SVGRepo_iconCarrier" stroke={color}>
            <Defs />
            <Path d="M2 20h20M5 20V8.2a.2.2 0 0 1 .2-.2h2.6a.2.2 0 0 1 .2.2V20M11 20V4.267c0-.148.09-.267.2-.267h2.6c.11 0 .2.12.2.267V20M17 20v-8.85c0-.083.09-.15.2-.15h2.6c.11 0 .2.067.2.15V20" />
          </G>
        </Svg>
      );
    case 'statistics-outline':
      return (
        <Svg viewBox="0 0 24 24" width={size} height={size} fill={'white'}>
          <G id="SVGRepo_iconCarrier">
            <Defs />
            <G id="ic-statistics-2" stroke={color} strokeWidth={1.4}>
              <Path d="M2 20h20M5 20V8.2a.2.2 0 0 1 .2-.2h2.6a.2.2 0 0 1 .2.2V20M11 20V4.27c0-.15.09-.27.2-.27h2.6c.11 0 .2.12.2.27V20M17 20v-8.85c0-.08.09-.15.2-.15h2.6c.11 0 .2.07.2.15V20" />
            </G>
          </G>
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
    case 'message-outline':
      return (
        <Svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
          <G stroke={color}>
            <Path
              d="M12 21a9 9 0 1 0-7.403-3.88c.105.15.126.345.048.512l-1.218 2.62a.5.5 0 0 0 .435.748H12Z"
              strokeWidth={2}
            />
            <Path
              d="M8 13.15a1.15 1.15 0 1 0 0-2.3 1.15 1.15 0 0 0 0 2.3ZM16 13.15a1.15 1.15 0 1 0 0-2.3 1.15 1.15 0 0 0 0 2.3ZM12 13.15a1.15 1.15 0 1 0 0-2.3 1.15 1.15 0 0 0 0 2.3Z"
              fill={color}
              strokeWidth={0.3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
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
    case 'arrow-down':
      return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
          <Path
            fill={color}
            fillRule="evenodd"
            d="m10 14 6-8H4l6 8Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'arrow-up':
      return (
        <Svg viewBox="0 0 20 20" width={size} height={size} fill="none">
          <Path
            fill={color}
            fillRule="evenodd"
            d="m10 6 6 8H4l6-8Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'checkmark':
      return (
        <Svg viewBox="0 0 16 16" width={size} height={size} fill="none">
          <Path
            fill={color}
            fillRule="evenodd"
            d="M5.91 10.496 3.707 8.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.493-.09l7-8a1 1 0 1 0-1.572-1.235L5.91 10.496Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'circle-plus':
      return (
        <Svg viewBox="0 0 16 16" width={size} height={size} fill="none">
          <Path
            fill={color}
            fillRule="evenodd"
            d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm0 2a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2H9v2a1 1 0 1 1-2 0V9H5a1 1 0 0 1 0-2h2V5a1 1 0 0 1 1-1Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'close':
      return (
        <Svg viewBox="0 0 20 20" width={size} height={size} fill="none">
          <Path
            fill={color}
            fillRule="evenodd"
            d="m11.414 10 4.293-4.293a.999.999 0 1 0-1.414-1.414L10 8.586 5.707 4.293a.999.999 0 1 0-1.414 1.414L8.586 10l-4.293 4.293a.999.999 0 1 0 1.414 1.414L10 11.414l4.293 4.293a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L11.414 10Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'info-circle-filled':
      return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
          <Path
            fill={color}
            fillRule="evenodd"
            d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 7a1 1 0 0 0-.993.883L9 10v4a1 1 0 0 0 1.993.117L11 14v-4a1 1 0 0 0-1-1Zm0-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'info-circle-outline':
      return (
        <Svg viewBox="0 0 20 20" width={size} height={size} fill="none">
          <Path
            fill={color}
            fillRule="evenodd"
            d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10Zm8.95-4a1 1 0 0 1 1-1h.1a1 1 0 0 1 1 1v.1a1 1 0 0 1-1 1h-.1a1 1 0 0 1-1-1V6ZM10 8a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'pause':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            fill={color}
            d="M15 5.5v13c0 .465 0 .697.038.89a2 2 0 0 0 1.571 1.572c.194.038.426.038.89.038.465 0 .698 0 .891-.038a2 2 0 0 0 1.572-1.572C20 19.2 20 18.97 20 18.512V5.488c0-.457 0-.687-.038-.878a2 2 0 0 0-1.572-1.572C18.197 3 17.965 3 17.5 3s-.697 0-.89.038a2 2 0 0 0-1.572 1.572C15 4.803 15 5.035 15 5.5ZM4 5.5v13c0 .465 0 .697.038.89a2 2 0 0 0 1.571 1.572c.194.038.426.038.89.038.465 0 .698 0 .891-.038a2 2 0 0 0 1.572-1.572C9 19.2 9 18.97 9 18.512V5.488c0-.457 0-.687-.038-.878A2 2 0 0 0 7.39 3.038C7.197 3 6.965 3 6.5 3s-.697 0-.89.038A2 2 0 0 0 4.037 4.61C4 4.803 4 5.035 4 5.5Z"
          />
          <Path
            fill={color}
            fillRule="evenodd"
            d="M6.416 2h.168c.38 0 .708 0 1.001.058a3 3 0 0 1 2.358 2.357c.058.291.057.616.057.99v13.19c0 .374 0 .7-.057.99a3 3 0 0 1-2.358 2.357c-.293.059-.62.058-1.002.058h-.167c-.381 0-.709 0-1.002-.058a3 3 0 0 1-2.356-2.357c-.059-.293-.058-.62-.058-1.001V5.416c0-.38 0-.708.058-1.001a3 3 0 0 1 2.356-2.357C5.707 1.999 6.035 2 6.416 2ZM6.5 4c-.513 0-.623.005-.696.02a1 1 0 0 0-.785.785C5.005 4.877 5 4.987 5 5.5v13c0 .513.005.623.02.695a1 1 0 0 0 .784.786c.073.014.183.019.696.019.512 0 .623-.005.695-.02a1 1 0 0 0 .786-.785c.014-.07.019-.179.019-.683V5.488c0-.504-.005-.612-.019-.683a1 1 0 0 0-.786-.786C7.123 4.005 7.013 4 6.5 4Zm10.916-2h.168c.38 0 .708 0 1.001.058a3 3 0 0 1 2.358 2.357c.058.291.057.616.057.99v13.19c0 .374 0 .7-.057.99a3 3 0 0 1-2.358 2.357c-.293.059-.62.058-1.002.058h-.167c-.381 0-.709 0-1.002-.058a3 3 0 0 1-2.356-2.357c-.059-.293-.058-.62-.058-1.001V5.416c0-.38 0-.708.058-1.001a3 3 0 0 1 2.356-2.357c.293-.059.621-.058 1.002-.058Zm.084 2c-.513 0-.623.005-.695.02a1 1 0 0 0-.786.785c-.014.072-.019.182-.019.695v13c0 .513.005.623.02.695a1 1 0 0 0 .785.786c.072.014.182.019.695.019.512 0 .623-.005.695-.02a1 1 0 0 0 .786-.785c.014-.07.019-.179.019-.683V5.488c0-.504-.005-.612-.019-.683a1 1 0 0 0-.786-.786C18.123 4.005 18.013 4 17.5 4Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'stop':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            fill={color}
            d="M19 15.8V8.197c0-1.118 0-1.678-.218-2.105a2 2 0 0 0-.874-.874C17.48 5 16.92 5 15.8 5H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C6.52 19 7.08 19 8.2 19h7.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874c.218-.427.218-.987.218-2.105V15.8Z"
          />
          <Path
            fill={color}
            fillRule="evenodd"
            d="M8.162 4h7.677c.527 0 .982 0 1.356.03.395.033.788.104 1.167.297a3 3 0 0 1 1.311 1.311c.193.378.264.771.297 1.166.03.374.03.828.03 1.354v7.684c0 .526 0 .98-.03 1.354-.033.395-.104.788-.297 1.166a3 3 0 0 1-1.311 1.311c-.378.193-.772.264-1.167.296-.375.031-.83.031-1.357.031H8.162c-.527 0-.982 0-1.357-.03-.395-.033-.789-.104-1.167-.297a3 3 0 0 1-1.311-1.311c-.193-.378-.264-.772-.296-1.167C4 16.82 4 16.365 4 15.838V8.162c0-.527 0-.981.03-1.356.033-.395.104-.789.297-1.167a3 3 0 0 1 1.31-1.311c.38-.193.773-.264 1.168-.296C7.18 4 7.635 4 8.162 4ZM6.968 6.024c-.272.022-.373.06-.422.085a1 1 0 0 0-.437.437c-.025.05-.063.15-.085.422C6 7.25 6 7.623 6 8.2v7.6c0 .576 0 .949.024 1.232.022.272.06.373.085.422a.999.999 0 0 0 .437.437c.05.025.15.063.422.085C7.25 18 7.624 18 8.2 18h7.6c.577 0 .949 0 1.232-.024.272-.022.372-.06.422-.085a1 1 0 0 0 .437-.437c.025-.05.063-.15.085-.42.023-.284.024-.655.024-1.23V8.196c0-.576 0-.947-.024-1.23-.022-.271-.06-.372-.085-.421a1 1 0 0 0-.437-.437c-.05-.025-.15-.063-.422-.085C16.75 6 16.377 6 15.8 6H8.2c-.576 0-.949 0-1.232.024Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'play':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            fill={color}
            d="M5 17.333V6.667c0-.88 0-1.32.185-1.58a1 1 0 0 1 .687-.412c.317-.04.704.166 1.478.579h.003l10 5.334c.859.459 1.289.688 1.43.993a1 1 0 0 1 0 .838c-.141.305-.571.534-1.43.993l-10 5.333-.003.002c-.774.413-1.162.619-1.478.578a1 1 0 0 1-.687-.412C5 18.653 5 18.213 5 17.333Z"
          />
          <Path
            fill={color}
            fillRule="evenodd"
            d="m7.784 4.352.037.02 10.04 5.354c.397.212.754.402 1.025.58.271.179.613.44.805.856a2 2 0 0 1 0 1.676c-.192.416-.534.677-.805.856-.271.178-.628.368-1.025.58L7.823 19.627l-.003.002-.036.02c-.356.19-.68.363-.957.479-.283.119-.659.244-1.083.189a2 2 0 0 1-1.374-.824c-.248-.35-.315-.74-.343-1.046C4 18.148 4 17.779 4 17.375V6.625c0-.404 0-.773.027-1.072.028-.306.095-.697.343-1.046a2 2 0 0 1 1.374-.824c.425-.055.8.07 1.083.19.276.116.602.29.957.479ZM6.022 5.704l-.003.032c-.018.196-.019.471-.019.93v10.667a11.836 11.836 0 0 0 .022.963 11.825 11.825 0 0 0 .857-.432l.003-.001 10-5.334a13.19 13.19 0 0 0 .939-.529 13.19 13.19 0 0 0-.939-.53l-10-5.333H6.88a11.798 11.798 0 0 0-.858-.433Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'chevron-right':
      return (
        <Svg width={size} height={size} fill="none" viewBox="0 0 16 16">
          <Path
            fill={color}
            fillRule="evenodd"
            d="M4.293 12.293a.999.999 0 1 0 1.414 1.414l5-5a.999.999 0 0 0 0-1.414l-5-5a.999.999 0 1 0-1.414 1.414L8.586 8l-4.293 4.293Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    case 'chevron-left':
      return (
        <Svg width={size} height={size} fill="none" viewBox="0 0 16 16">
          <Path
            fill={color}
            fillRule="evenodd"
            d="M10.707 12.293a.999.999 0 1 1-1.414 1.414l-5-5a.999.999 0 0 1 0-1.414l5-5a.999.999 0 1 1 1.414 1.414L6.414 8l4.293 4.293Z"
            clipRule="evenodd"
          />
        </Svg>
      );
    default:
      return <Text>Icon doesn't exist</Text>;
  }
};
