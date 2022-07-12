const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y/register',
    '@storybook/addon-controls',
    '@storybook/addon-viewport/register',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  typescript: {
    check: false, // 선택적으로 fork-ts-checker-webpack-plugin 실행
    checkOptions: {}, // 선택적으로 fork-ts-checker-webpack-plugin 실행
    reactDocgen: 'react-docgen-typescript', // 실행할 반응 docgen 프로세서: "react-docgen-typescript", "react-docgen",false
    reactDocgenTypescriptOptions: {
      // react-docgen-typescript가 활성화된 경우 react-docgen-typescript-plugin에 전달할 옵션입니다.
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    // node_mules폴더와 styles 폴더 안의 모듈을 인식할 수 있게 함
    config.resolve.modules = [
      path.resolve(__dirname, '..'),
      'node_modules',
      'styles',
    ];

    // 절대 경로 설정
    config.resolve.alias = {
      ...config.resolve.alias,
      '@src': path.resolve(__dirname, '../src'),
    };

    return config;
  },
};
