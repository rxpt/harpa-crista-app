import {StyleSheet} from 'react-native';
import {MD3DarkTheme} from 'react-native-paper';

const padding = 20;

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
  },
  dark: true,
  mode: 'adaptive',
};

export const colors = theme.colors;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: padding,
    gap: 5,
  },
  number: {
    width: 50,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    padding: padding,
  },
  verse: {
    padding: padding,
    color: theme.colors.secondary,
  },
  verseEven: {
    color: theme.colors.onSecondaryContainer,
    backgroundColor: theme.colors.secondaryContainer,
  },
  chorus: {
    fontStyle: 'italic',
    fontWeight: '900',
    paddingHorizontal: padding * 2,
    paddingVertical: padding,
    backgroundColor: theme.colors.primaryContainer,
  },
  author: {
    fontSize: theme.fonts.bodySmall.fontSize,
    fontStyle: 'italic',
    textAlign: 'right',
    padding: padding,
  },
  backToTop: {
    position: 'absolute',
    bottom: padding,
    right: padding,
    padding: padding / 2,
    borderRadius: padding / 2,
    backgroundColor: theme.colors.onSecondaryContainer,
    color: theme.colors.secondaryContainer,
  },
  bold: {
    fontWeight: '900',
  },
  boldItalic: {
    fontWeight: '900',
    fontStyle: 'italic',
  },
  centered: {
    textAlign: 'center',
  },
  stretched: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignStretch: {
    alignItems: 'stretch',
  },
  alignBaseline: {
    alignItems: 'baseline',
  },
  alignContentCenter: {
    alignContent: 'center',
  },
  alignContentEnd: {
    alignContent: 'flex-end',
  },
  alignContentStart: {
    alignContent: 'flex-start',
  },
  alignContentStretch: {
    alignContent: 'stretch',
  },
  alignContentBetween: {
    alignContent: 'space-between',
  },
  alignContentAround: {
    alignContent: 'space-around',
  },
  gap: {
    gap: 5,
  },
  padding: {
    padding: padding,
  },
  paddingVertical: {
    paddingVertical: padding,
  },
  paddingHorizontal: {
    paddingHorizontal: padding,
  },
  paddingTop: {
    paddingTop: padding,
  },
  paddingBottom: {
    paddingBottom: padding,
  },
  paddingLeft: {
    paddingLeft: padding,
  },
  paddingRight: {
    paddingRight: padding,
  },
  margin: {
    margin: padding,
  },
  marginVertical: {
    marginVertical: padding,
  },
  marginHorizontal: {
    marginHorizontal: padding,
  },
  marginTop: {
    marginTop: padding,
  },
  marginBottom: {
    marginBottom: padding,
  },
  marginLeft: {
    marginLeft: padding,
  },
  marginRight: {
    marginRight: padding,
  },
  border: {
    borderWidth: 1,
    borderColor: theme.colors.backdrop,
  },
  primary: {
    color: theme.colors.primary,
  },
  secondary: {
    color: theme.colors.secondary,
  },
  primaryContainer: {
    backgroundColor: theme.colors.primaryContainer,
  },
  secondaryContainer: {
    backgroundColor: theme.colors.secondaryContainer,
  },
  onPrimaryContainer: {
    color: theme.colors.onPrimaryContainer,
  },
  onSecondaryContainer: {
    color: theme.colors.onSecondaryContainer,
  },
  boxShadow: {
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
  },
  start: {
    left: 0,
  },
  end: {
    right: 0,
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: 0,
  },
});
