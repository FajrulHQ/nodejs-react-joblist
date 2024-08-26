import type { ThemeConfig } from 'antd';

export const color_theme = {
  primary: '#417EBE',
  secondary: '#4C972E'
}

export const theme: ThemeConfig = {
  token: {
    fontSize: 13,
    colorPrimary: color_theme.primary,
  },
  components: {
    Modal: {
      titleFontSize: 16
    }
  }
};