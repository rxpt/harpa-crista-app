import React from 'react';
import {Text as RNText, TextProps, TextStyle, StyleProp} from 'react-native';
import {styles} from '../../utils/styles';

interface Props extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

class Text extends React.Component<Props> {
  render() {
    const {style, ...otherProps} = this.props;
    return <RNText {...otherProps} style={[styles.app.onBackground, style]} />;
  }
}

export default Text;
