import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/config';

export function buildPlugins({ paths, isDev, analyze, apiUrl }: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: paths.html }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    // replaces variables with other values or expressions at compile time
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API_URL__: JSON.stringify(apiUrl),
    }),
    // not working in build:prod, only if --env analyze=true is set
    new BundleAnalyzerPlugin({
      analyzerMode: analyze ? 'server' : 'disabled',
    }),
    // allows all kinds of modules to be updated at runtime without the need for a full refresh.
    ...(isDev ? [new ReactRefreshWebpackPlugin()] : []),
  ];
}
