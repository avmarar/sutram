import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    serverExternalPackages: ['@uploadthing/react', 'mongoose'],
    typescript: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreBuildErrors: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.clerk.com'
            },
            {
                protocol: 'https',
                hostname: 'images.clerk.dev'
            },
            {
                protocol: 'https',
                hostname: 'uploadthing.com'
            },
            {
                protocol: 'https',
                hostname: 'placehold.co'
            }
        ]
    }
};

export default nextConfig;
