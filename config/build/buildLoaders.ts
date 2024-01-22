import { RuleSetRule } from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';

export function buildLoaders({ isDev }: BuildOptions): RuleSetRule[] {
  // svgr - to use svg as React component
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };

  const imgLoader = {
    test: /\.(png|jpg|jpeg|gif|webp)$/i,
    type: 'asset/resource',
  };

  const babelLoader = {
    test: /\.(js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  };

  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const sassLoader = buildCssLoader(isDev);

  // A chain is executed in reverse order: typescriptLoader -> sassLoader -> ...
  return [imgLoader, svgLoader, sassLoader, babelLoader, typescriptLoader];
}
