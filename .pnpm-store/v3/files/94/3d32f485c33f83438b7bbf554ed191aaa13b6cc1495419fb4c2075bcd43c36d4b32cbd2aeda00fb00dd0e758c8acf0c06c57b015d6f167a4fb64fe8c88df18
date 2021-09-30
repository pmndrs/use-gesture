var options = {
    hostname: 'http://test.com',
    cacheTime: 600000, // 600 sec - cache purge period
    urls: [{
            url: 'http://test.com/page-1/',
            changefreq: 'weekly',
            priority: 0.3,
            links: [
                { lang: 'en', url: 'http://test.com/page-1/', },
                { lang: 'ja', url: 'http://test.com/page-1/ja/', },
            ]
    },]
};
var sm = require('sitemap');
var sitemap = sm.createSitemap(options);
console.log(sitemap.toString());
