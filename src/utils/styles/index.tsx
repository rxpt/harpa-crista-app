import {StyleSheet} from 'react-native';
import colors from './colors.json';
import fonts from './fonts';
import Color from 'color';

export const theme = colors.darkTheme;

export const flex = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  flex4: {
    flex: 4,
  },
  flex5: {
    flex: 5,
  },
  flex6: {
    flex: 6,
  },
  flex7: {
    flex: 7,
  },
  flex8: {
    flex: 8,
  },
  flex9: {
    flex: 9,
  },
  flex10: {
    flex: 10,
  },
  flex11: {
    flex: 11,
  },
  flex12: {
    flex: 12,
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStretch: {
    alignItems: 'stretch',
  },
  alignBaseline: {
    alignItems: 'baseline',
  },
  alignContentStart: {
    alignContent: 'flex-start',
  },
  alignContentEnd: {
    alignContent: 'flex-end',
  },
  alignContentCenter: {
    alignContent: 'center',
  },
  alignContentStretch: {
    alignContent: 'stretch',
  },
  alignContentSpaceBetween: {
    alignContent: 'space-between',
  },
  alignContentSpaceAround: {
    alignContent: 'space-around',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },
});

export const gap = (value: number) => {
  return {
    gap: value,
  };
};

export const padding = (
  value: number,
  type?: 'vertical' | 'horizontal' | 'left' | 'right' | 'top' | 'bottom',
) => {
  switch (type) {
    case 'vertical':
      return {
        paddingVertical: value,
      };
    case 'horizontal':
      return {
        paddingHorizontal: value,
      };
    case 'left':
      return {
        paddingLeft: value,
      };
    case 'right':
      return {
        paddingRight: value,
      };
    case 'top':
      return {
        paddingTop: value,
      };
    case 'bottom':
      return {
        paddingBottom: value,
      };
    default:
      return {
        padding: value,
      };
  }
};

export const margin = (
  value: number,
  type?: 'vertical' | 'horizontal' | 'left' | 'right' | 'top' | 'bottom',
) => {
  switch (type) {
    case 'vertical':
      return {
        marginVertical: value,
      };
    case 'horizontal':
      return {
        marginHorizontal: value,
      };
    case 'left':
      return {
        marginLeft: value,
      };
    case 'right':
      return {
        marginRight: value,
      };
    case 'top':
      return {
        marginTop: value,
      };
    case 'bottom':
      return {
        marginBottom: value,
      };
    default:
      return {
        margin: value,
      };
  }
};

export const text = StyleSheet.create({
  title: {
    ...fonts.robotoBold,
    fontSize: 24,
    color: theme.text,
  },
  titleMedium: {
    ...fonts.robotoBold,
    color: theme.text,
    fontSize: 20,
  },
  titleSmall: {
    ...fonts.robotoBold,
    fontSize: 16,
    color: theme.text,
  },
  body: {
    ...fonts.robotoRegular,
    fontSize: 16,
    color: theme.text,
  },
  bodyMedium: {
    fontSize: 14,
    ...fonts.robotoRegular,
  },
  bodySmall: {
    ...fonts.robotoRegular,
    fontSize: 12,
    color: theme.text,
  },
  bodyTiny: {
    ...fonts.robotoRegular,
    fontSize: 10,
    color: theme.text,
  },
  textMuted: {
    ...fonts.robotoRegular,
    color: theme.text,
  },
  centered: {
    textAlign: 'center',
  },
});

export const borders = StyleSheet.create({
  rounded: {
    borderRadius: 8,
  },
  roundedSmall: {
    borderRadius: 4,
  },
  roundedLarge: {
    borderRadius: 16,
  },
  roundedFull: {
    borderRadius: 999,
  },
  border: {
    borderWidth: 1,
  },
  border2: {
    borderWidth: 2,
  },
  border4: {
    borderWidth: 4,
  },
  border8: {
    borderWidth: 8,
  },
  borderT: {
    borderTopWidth: 1,
  },
  borderB: {
    borderBottomWidth: 1,
  },
  borderL: {
    borderLeftWidth: 1,
  },
  borderR: {
    borderRightWidth: 1,
  },
  borderT2: {
    borderTopWidth: 2,
  },
  borderB2: {
    borderBottomWidth: 2,
  },
  borderL2: {
    borderLeftWidth: 2,
  },
  borderR2: {
    borderRightWidth: 2,
  },
  borderT4: {
    borderTopWidth: 4,
  },
  borderB4: {
    borderBottomWidth: 4,
  },
  borderL4: {
    borderLeftWidth: 4,
  },
  borderR4: {
    borderRightWidth: 4,
  },
  borderT8: {
    borderTopWidth: 8,
  },
  borderB8: {
    borderBottomWidth: 8,
  },
  borderL8: {
    borderLeftWidth: 8,
  },
  borderR8: {
    borderRightWidth: 8,
  },
});

export const elevation = StyleSheet.create({
  elevation1: {
    elevation: 1,
  },
  elevation2: {
    elevation: 2,
  },
  elevation3: {
    elevation: 3,
  },
  elevation4: {
    elevation: 4,
  },
  elevation5: {
    elevation: 5,
  },
  elevation6: {
    elevation: 6,
  },
  elevation7: {
    elevation: 7,
  },
  elevation8: {
    elevation: 8,
  },
  elevation9: {
    elevation: 9,
  },
  elevation10: {
    elevation: 10,
  },
});

export const styles = {
  app: StyleSheet.create({
    background: {
      backgroundColor: theme.background,
    },
    onBackground: {
      color: theme.text,
    },
    surface: {
      backgroundColor: theme.surface,
    },
    onSurface: {
      color: theme.text,
    },
    shadow: {
      shadowColor: theme.divider,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    text: {
      color: theme.text,
    },
    textMuted: {
      color: Color(theme.text).alpha(0.5).string(),
    },
    modalBackground: {
      backgroundColor: theme.surface,
    },
    modalIndicator: {
      backgroundColor: theme.text,
    },
    modalContent: {
      padding: 15,
      paddingTop: 0,
    },
    modalTitle: {
      ...text.title,
    },
    modalSubtitle: {
      ...text.body,
      color: Color(theme.text).alpha(0.5).string(),
    },
    modalBackButton: {
      padding: 10,
      color: theme.text,
    },
    searchBar: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: theme.surface,
      paddingHorizontal: 10,
      marginVertical: 10,
      elevation: 4,
    },
    searchInput: {
      padding: 10,
      color: theme.text,
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.surface,
      elevation: 4,
      padding: 15,
    },
    headerButton: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    menu: {
      flex: 1,
      padding: 15,
    },
    menuButton: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    menuButtonText: {
      ...text.titleSmall,
    },
    menuButtonIcon: {
      padding: 10,
      color: theme.text,
    },
  }),
  anthem: StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      padding: 15,
    },
    containerHighlight: {
      backgroundColor: theme.accent,
    },
    containerOdd: {
      backgroundColor: theme.background,
    },
    containerEven: {
      backgroundColor: theme.surface,
    },
    number: {
      letterSpacing: 20,
      ...fonts.robotoBold,
      color: Color(theme.text).alpha(0.5).string(),
    },
    title: {
      ...text.title,
    },
    subtitle: {
      ...text.titleSmall,
      color: Color(theme.text).alpha(0.5).string(),
    },
    lyrics: {
      ...fonts.robotoRegular,
    },
    chorus: {
      ...fonts.robotoBoldItalic,
      padding: 30,
    },
    author: {
      ...text.bodySmall,
      ...fonts.robotoThinItalic,
      padding: 15,
    },
    highlight: {
      ...fonts.robotoBlackItalic,
    },
  }),
};
