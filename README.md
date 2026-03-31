# tyvila.online

Public landing page for [Squids](https://squids.co.za) — South Africa's community discussion platform.

Hosted on GitHub Pages. Custom domain: `tyvila.online`.

## Structure

```
/               → Homepage
/about.html     → About page
/features.html  → Features page
/404.html       → Not found
/sitemap.xml    → Sitemap index (includes squids.co.za sitemap)
/sitemap-pages.xml → Pages on this site
/robots.txt     → Crawler policy
/CNAME          → Custom domain config
```

## Deployment

Automated via GitHub Actions on push to `main`. See `.github/workflows/deploy.yml`.

## Domain setup

Point `tyvila.online` A record to GitHub Pages IPs and add CNAME record per GitHub Pages documentation.
