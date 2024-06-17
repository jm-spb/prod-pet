import webpack, { DefinePlugin } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
  // set storybook config to work with absolute paths (redefine webpack config)
  const paths: BuildPaths = {
    build: '',
    entry: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };
  /*
    fix storybook error when resolve entities from src
    Суть проблемы:
    В сторибуке мы правим путь до src папки, чтобы сторибук правильно смог все зарезолвить.
    Но добавляем мы этот новый "пофикшеный" путь в конец массива, и получается:
    modules: [options.paths.src, 'node_modules', 'путь до src относительно сторибука'],
    Т.е. сначала мы ищем папку entities по неправильным путям (первый элемент массива), 
    потом идём в node_modules и там ищем эту папку. 
    Когда мы её находим, получаем ошибку: нет такого файла (например Counter.ts) 
    и до правильного пути не доходим.
    Решение:
    Добавить элемент в начало массива
    storybook/webpack.config.ts --> config.resolve.modules.unshift(paths.src);
  */
  config.resolve?.modules?.unshift(paths.src);

  config.resolve?.extensions?.push('.ts', '.tsx');
  // set css loader
  config.module?.rules?.push(buildCssLoader(true));

  /* set svgr
   1) find storybook default svg loader in rules and exclude it
   2) add svgr to storybook webpack config
  */
  if (config.module?.rules) {
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.map((rule) => {
      if (rule && rule !== '...' && /svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }

      return rule;
    });
  }

  config.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });

  // set global variable __IS_DEV__
  config.plugins?.push(new DefinePlugin({ __IS_DEV__: true }));

  return config;
};
