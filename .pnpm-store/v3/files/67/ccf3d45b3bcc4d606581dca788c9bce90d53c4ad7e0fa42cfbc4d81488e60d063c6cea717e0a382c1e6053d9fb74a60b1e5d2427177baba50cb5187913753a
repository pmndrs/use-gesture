function getSiteUrl(themeOptions) {
  if (process.env.NETLIFY !== 'true')
    return themeOptions.siteUrl || 'http://localhost:8000/'
  if (process.env.CONTEXT === 'production') return process.env.URL
  return process.env.DEPLOY_PRIME_URL
}

exports.getSiteUrl = getSiteUrl
