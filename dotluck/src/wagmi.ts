import {
    getDefaultConfig,
  } from '@rainbow-me/rainbowkit';
import { moonbaseAlpha } from 'wagmi/chains';
  
export const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [moonbaseAlpha],
    // ssr: true, // If your dApp uses server side rendering (SSR)
});
  