import {
    getDefaultConfig,
  } from '@rainbow-me/rainbowkit';
import { moonbaseAlpha, moonbeam } from 'wagmi/chains';
  
export const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [moonbeam],
    // ssr: true, // If your dApp uses server side rendering (SSR)
});
  