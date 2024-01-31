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
    padding: 12,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: materialColors.blackTertiary,
    borderRadius: 10,
  },
  title: {
    fontSize: human.title3Object.fontSize,
    color: materialColors.whitePrimary,
  },
  subtitle: {
    ...human.subheadWhiteObject,
  },
  content: {
    padding: 20,
  },
  versus: {
    ...human.bodyWhiteObject,
    ...robotoWeights.light,
  },
  chorus: {
    fontStyle: 'italic',
    ...robotoWeights.bold,
  },
  bold: {
    ...robotoWeights.bold,
  },
});

export default styles;
