/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NOTION_TOKEN: process.env.NOTION_TOKEN,
        NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    },

    images: {
        domains: [
            'www.notion.so',
            'images.unsplash.com'
        ],
    }
};

export default nextConfig;
