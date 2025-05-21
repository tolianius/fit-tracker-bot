import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/core/i18n/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.openfoodfacts.org',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
