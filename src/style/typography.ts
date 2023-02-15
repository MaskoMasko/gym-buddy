const fontSizes = {
  extraSmall: 20,
  small: 22,
  medium: 24,
  large: 26,
  extraLarge: 30,
} as const;

const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

const fontColors = {
  //light
  white: '#FFFFFF',
  offWhite: '#F5F5F5',
  lightGray: '#D3D3D3',
  beige: '#F5F5DC',
  //dark
  black: '#000000',
  darkGray: '#444444',
  navyBlue: '#1A1A2E',
  //accent
  blue: '#2196F3',
  green: '#4CAF50',
  red: '#F44336',
  yellow: '#FFEB3B',
  disabled: '#C7C7C7',
} as const;

const fontFamily = {
  kanit: {
    light: 'Kanit-Light',
    regular: 'Kanit-Regular',
    medium: 'Kanit-Medium',
    semibold: 'Kanit-SemiBold',
    bold: 'Kanit-Bold',
  },
};

export {fontSizes, fontWeights, fontColors, fontFamily};
