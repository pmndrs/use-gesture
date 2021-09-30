import fs from 'fs';
import robotsTxt from 'generate-robotstxt';
import path from 'path';

const publicPath = './public';
const defaultEnv = 'development';
const defaultOptions = {
  output: '/robots.txt',
  query: `{
    site {
      siteMetadata {
        siteUrl
      }
    }
  }`
};

function writeFile(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function runQuery(handler, query) {
  return handler(query).then(res => {
    if (res.errors) {
      throw new Error(res.errors.join(', '));
    }

    return res.data;
  });
}

const getOptions = pluginOptions => {
  const options = { ...pluginOptions };

  delete options.plugins;

  const { env = {}, resolveEnv = () => process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV } = options;

  const envOptions = env[resolveEnv()] || env[defaultEnv] || {};

  delete options.env;
  delete options.resolveEnv;

  return { ...options, ...envOptions };
};

export async function onPostBuild({ graphql, pathPrefix = "" }, pluginOptions) {
  const userOptions = getOptions(pluginOptions);
  const mergedOptions = { ...defaultOptions, ...userOptions };

  if (
    !Object.prototype.hasOwnProperty.call(mergedOptions, 'host')
  ) {
    const {
      site: {
        siteMetadata: { siteUrl }
      }
    } = await runQuery(graphql, mergedOptions.query);

    mergedOptions.host = siteUrl;
  }

  if (
    !Object.prototype.hasOwnProperty.call(mergedOptions, 'sitemap')
  ) {

    mergedOptions.sitemap = new URL(path.posix.join(pathPrefix, 'sitemap', 'sitemap-index.xml'), mergedOptions.host).toString();
  } else {
    try {
      new URL(mergedOptions.sitemap)
    } catch {
      mergedOptions.sitemap = new URL(mergedOptions.sitemap.startsWith(pathPrefix) ? mergedOptions.sitemap : path.posix.join(pathPrefix, mergedOptions.sitemap), mergedOptions.host).toString()
    }
  }


  const { policy, sitemap, host, output, configFile } = mergedOptions;

  const content = await robotsTxt({
    policy,
    sitemap,
    host,
    configFile
  });
  const filename = path.join(publicPath, output);

  return await writeFile(path.resolve(filename), content);
}
