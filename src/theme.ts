import { theme, ThemeConfig } from 'antd';

const baseTypographyConfig: any = {
  fontSizeHeading1: 32,
  fontSizeHeading2: 28,
  fontSizeHeading3: 24,
  fontSizeHeading4: 20,
  fontSizeHeading5: 16
};

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  components: {
    Button: {
      defaultActiveBorderColor: 'rgb(0,90,236)',
      defaultActiveColor: 'rgb(116,125,140)',
      colorPrimaryTextActive: 'rgb(144,174,222)',
      defaultBg: 'rgb(207,66,66)',
      dangerShadow: 'none',
      primaryShadow: 'none',
      defaultShadow: 'none'
    }
  },
  token: {
    colorPrimary: '#91c788',
    colorInfo: '#91c788'
  }
};
