import { RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

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

  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      /* For dev mode use style-loader, because it injects CSS into the DOM
      using multiple and works faster */
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: /\.module\.\w+$/i,
            // in devmode make explicit scss module name for easier debugging
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
          },
        },
      },

      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  // A chain is executed in reverse order: typescriptLoader -> sassLoader -> ...
  return [imgLoader, svgLoader, sassLoader, babelLoader, typescriptLoader];
}
