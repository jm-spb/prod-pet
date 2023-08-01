import { RuleSetRule } from 'webpack';

export function buildLoaders(): RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const sassLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      'style-loader',
      // Translates CSS into CommonJS
      'css-loader',
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  // A chain is executed in reverse order: typescriptLoader -> sassLoader -> ...
  return [sassLoader, typescriptLoader];
}
