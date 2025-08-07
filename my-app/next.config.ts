import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? '/<your-repo-name>' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
