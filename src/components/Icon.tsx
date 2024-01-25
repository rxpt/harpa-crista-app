import React, {Component} from 'react';
import {TextStyle, ColorValue} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export type IconPackageType =
  | 'antDesign'
  | 'entypo'
  | 'evilIcons'
  | 'feather'
  | 'fontAwesome'
  | 'fontAwesome5'
  | 'fontAwesome6'
  | 'fontisto'
  | 'foundation'
  | 'ionicons'
  | 'materialCommunity'
  | 'materialIcons'
  | 'octicons'
  | 'zocial'
  | 'simpleLineIcons';

type IconProps = {
  name: string;
  size?: number;
  color?: ColorValue;
  style?: TextStyle;
  from?: IconPackageType;
};

const ICON_PACKAGES: Record<IconPackageType, any> = {
  antDesign: AntDesign,
  entypo: Entypo,
  evilIcons: EvilIcons,
  feather: Feather,
  fontAwesome: FontAwesome,
  fontAwesome5: FontAwesome5,
  fontAwesome6: FontAwesome6,
  fontisto: Fontisto,
  foundation: Foundation,
  ionicons: Ionicons,
  materialCommunity: MaterialCommunity,
  materialIcons: MaterialIcons,
  octicons: Octicons,
  zocial: Zocial,
  simpleLineIcons: SimpleLineIcons,
};

class Icon extends Component<IconProps> {
  render() {
    const {from = 'materialCommunity', ...iconProps} = this.props;
    const IconComponent = ICON_PACKAGES[from];
    return <IconComponent {...iconProps} />;
  }
}

export default Icon;
