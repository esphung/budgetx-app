module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          screens: './src/screens',
          navigators: './src/navigators',
          components: './src/components',
          controllers: './src/controllers',
          models: './src/models',
          styles: './src/styles',
          data: './src/data',
          src: './src',
          colors: './colors',
        },
      },
    ],
  ],
}