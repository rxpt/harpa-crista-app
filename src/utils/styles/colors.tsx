import Color from 'color';

interface Colors {
  [key: string]: string;
}

const defaultColors = {
  primary: '#382bf0',
  secondary: '#5e43f3',
  tertiary: '#7a5af5',
  success: '#00d25b',
  warning: '#ff8c00',
  danger: '#ff3d71',
  white: '#ffffff',
  black: '#000000',
  surface: '#121212',
  surfaceVariant: '#1a1625',
  backdrop: '#000000',
};

const variantColors: Colors = Object.entries(defaultColors).reduce(
  (acc, [key, value]) => {
    const color = Color(value);
    const variants: Colors = {};

    for (let i = 0; i < 10; i++) {
      if (i < 5) {
        variants[`${key}${i}00`] = color.lighten(i / 10).hex();
      } else {
        variants[`${key}${i}00`] = color.darken((i - 5) / 10).hex();
      }
    }

    return {...acc, [key]: value, ...variants};
  },
  {},
);

const colors = variantColors as typeof variantColors & typeof defaultColors;

export {colors};
