import {StyleSheet} from 'react-native';
import {colors} from './colors';
import fonts from './fonts';

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
    color: colors.primary100,
  },
  titleMedium: {
    ...fonts.robotoBold,
    color: colors.primary100,
    fontSize: 20,
  },
  titleSmall: {
    ...fonts.robotoBold,
    fontSize: 16,
    color: colors.primary100,
  },
  body: {
    ...fonts.robotoRegular,
    fontSize: 16,
    color: colors.primary100,
  },
  bodyMedium: {
    fontSize: 14,
    ...fonts.robotoRegular,
  },
  bodySmall: {
    ...fonts.robotoRegular,
    fontSize: 12,
    color: colors.primary100,
  },
  bodyTiny: {
    ...fonts.robotoRegular,
    fontSize: 10,
    color: colors.primary100,
  },
  textMuted: {
    ...fonts.robotoRegular,
    color: colors.primary800,
  },
  centered: {
    textAlign: 'center',
  },
});

export const shadows = StyleSheet.create({
  shadow: {
    shadowColor: colors.primary100,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
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
      backgroundColor: colors.primary100,
    },
    backgroundInverse: {
      backgroundColor: colors.primary300,
    },
    onBackground: {
      color: colors.primary300,
    },
    onBackgroundInverse: {
      color: colors.primary100,
    },
    header: {
      backgroundColor: colors.surfaceVariant100,
      ...padding(15),
      ...flex.flexRow,
      ...flex.alignCenter,
      ...flex.justifyBetween,
      ...elevation.elevation4,
    },
    headerButton: {
      ...flex.alignCenter,
      ...flex.justifyCenter,
      ...borders.rounded,
    },
    menu: {
      ...padding(15),
      ...flex.flex1,
    },
    menuTitle: {
      ...text.title,
    },
    menuSubtitle: {
      ...text.body,
    },
    menuButton: {
      ...padding(10),
      ...flex.alignCenter,
      ...flex.justifyCenter,
      ...borders.rounded,
    },
    menuButtonText: {
      ...text.titleSmall,
    },
    menuButtonIcon: {
      ...padding(10),
      color: colors.primary100,
    },
  }),
  anthem: StyleSheet.create({
    container: {
      ...padding(15),
      ...gap(10),
      ...flex.flex1,
    },
    containerHighlight: {
      backgroundColor: colors.primary900,
    },
    containerOdd: {
      backgroundColor: colors.surface100,
    },
    containerEven: {
      backgroundColor: colors.surfaceVariant100,
    },
    number: {
      letterSpacing: 20,
      ...fonts.robotoBold,
    },
    lyrics: {
      ...fonts.robotoRegular,
    },
    chorus: {
      ...fonts.robotoItalic,
      padding: 30,
    },
    author: {
      ...text.bodySmall,
      ...fonts.robotoThinItalic,
      color: colors.white,
      padding: 15,
    },
    highlight: {
      color: colors.primary100,
    },
  }),
};
