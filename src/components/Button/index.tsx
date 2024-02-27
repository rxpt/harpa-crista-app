import React from 'react';
import {Pressable, ViewStyle, StyleSheet} from 'react-native';
import Animated, {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Icon, {IconPackageType} from '../Icon';
import {theme} from '../../utils/styles';

type Props = {
  onPress?: () => void;
  doubleTap?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  iconStyle?: ViewStyle;
  iconPackage?: IconPackageType;
  children?: React.ReactNode;
};

const Button = ({
  onPress,
  doubleTap,
  onLongPress,
  disabled,
  style,
  icon,
  iconSize = 24,
  iconColor = theme.text,
  iconStyle,
  iconPackage,
  children,
}: Props) => {
  const [pressed, setPressed] = React.useState(false);
  const [lastTap, setLastTap] = React.useState(0);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    opacity.value = withTiming(pressed || disabled ? 0.25 : 1);
  }, [disabled, opacity, pressed]);

  const handlePressIn = () => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      doubleTap && doubleTap();
    } else {
      setLastTap(now);
    }

    setPressed(true);
  };

  const handlePressOut = () => {
    setPressed(false);
  };

  const onlyIcon = !!icon && !children;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      height: onlyIcon ? iconSize + 16 : 'auto',
      width: onlyIcon ? iconSize + 16 : 'auto',
      borderRadius: onlyIcon ? iconSize / 2 + 8 : 8,
    };
  });

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View style={[animatedStyle, styles.button, style]}>
        {icon && (
          <Icon
            name={icon}
            size={iconSize}
            color={iconColor}
            style={iconStyle}
            from={iconPackage}
          />
        )}
        {children}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 8,
  },
});

export default Button;
