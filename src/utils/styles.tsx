import {StyleSheet} from 'react-native';
import {materialColors, robotoWeights, human} from 'react-native-typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.blackPrimary,
  },
  backToTop: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: materialColors.blackTertiary,
    padding: 20,
    borderRadius: 10,
  },
  item: {
    padding: 8,
    backgroundColor: materialColors.blackTertiary,
  },
  title: {
    fontSize: human.title3Object.fontSize,
    color: materialColors.whitePrimary,
  },
  subtitle: {
    ...human.subheadWhiteObject,
  },
  content: {
    padding: 10,
    paddingTop: 5,
    gap: 5,
  },
  verse: {
    ...human.bodyWhiteObject,
    ...robotoWeights.light,
    padding: 20,
  },
  verseEven: {
    backgroundColor: materialColors.blackTertiary,
  },
  chorus: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    padding: 40,
  },
  bold: {
    fontWeight: 'bold',
  },
  author: {
    color: materialColors.whitePrimary,
    fontSize: human.footnoteObject.fontSize,
    fontStyle: 'italic',
    textAlign: 'right',
    padding: 20,
  },
});

export default styles;
