const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules: {
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/modules': path.resolve(__dirname, 'src/modules'),
      '@/screens': path.resolve(__dirname, 'src/screens'),
      '@/store': path.resolve(__dirname, 'src/store'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
