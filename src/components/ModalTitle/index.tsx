import React from 'react';
import {View} from 'react-native';
import Text from '../Text';
import Button from '../Button';
import {flex, styles} from '../../utils/styles';
import {useNavigationHooks} from '../../store/hooks';

interface ModalTitleProps {
  title?: string;
  subtitle?: string;
  goBack?: boolean;
}

const ModalTitle = ({title, subtitle, goBack = false}: ModalTitleProps) => {
  const {closeModal, getState} = useNavigationHooks();
  const [canGoBack, setCanGoBack] = React.useState(false);

  React.useEffect(() => {
    setCanGoBack(getState().modals.history.length > 1 && goBack);
  }, [getState, goBack]);

  if (!title && !subtitle) {
    return null;
  }

  return (
    <View>
      <View style={[flex.flexRow, flex.alignCenter, flex.justifyBetween]}>
        {title && <Text style={styles.app.modalTitle}>{title}</Text>}
        {canGoBack && <Button icon="arrow-left" onPress={closeModal} />}
      </View>
      {subtitle && <Text style={styles.app.modalSubtitle}>{subtitle}</Text>}
    </View>
  );
};

export default ModalTitle;
