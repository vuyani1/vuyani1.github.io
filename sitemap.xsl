<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Squids Sitemap</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#050505;color:#f0f0f0;font-family:monospace;padding:2rem}h1{font-size:1.5rem;margin-bottom:1rem;background:linear-gradient(90deg,#ff6b9d,#f97316,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}a{color:#f97316;text-decoration:none}a:hover{text-decoration:underline}table{width:100%;border-collapse:collapse}td,th{padding:.5rem 1rem;text-align:left;border-bottom:1px solid #1a1a1a}th{color:#888;font-size:.75rem;text-transform:uppercase}</style></head>
<body><h1>🦑 Squids Sitemap Index</h1><table><tr><th>Sitemap</th><th>Last Modified</th></tr><xsl:for-each select="sm:sitemapindex/sm:sitemap"><tr><td><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td><td><xsl:value-of select="sm:lastmod"/></td></tr></xsl:for-each></table></body>
</html>
</xsl:template>
</xsl:stylesheet>
