import {
    getDefaultConfig,
    RainbowKitProvider,
  } from '@rainbow-me/rainbowkit';
import { moonbeamDev } from 'wagmi/chains';
  
export const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [moonbeamDev],
    // ssr: true, // If your dApp uses server side rendering (SSR)
});
  