import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const isGithubPages = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? '/development-blog' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
