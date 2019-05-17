export default ({
  palette: {
    primary: {
      light: '#486581',
      main: '#334E68',
      dark: '#243B53',
    },
    secondary: {
      light: '#9FB3C8',
      main: '#829AB1',
      dark: '#627D98',
    },
    tertiary: {
      light: '#F0F4F8',
      main: '#D9E2EC',
      dark: '#BCCCDC',
    },
    dark: '#243B53', // Need to figure out the order of this stuff. For now, going to leave it here.
    middark: '#486581', // Ditto.
  },
  typography: {
    useNextVariants: true,
    subtitle1: {
      fontFamily: 'Source Sans Pro',
      fontWeight: '500',
      fontSize: '14pt',
    },
    button: {
      fontFamily: 'Source Sans Pro',
      textTransform: 'capitalize',
    },
  },
});
