# Dotluck

## Team Name: ChainZilla

### Team Members:
- **Rudransh Singh Tomar** (GitHub: [trudransh](https://github.com/trudransh))
- **Raveesh Kumar** (GitHub: [Raveesh1007](https://github.com/Raveesh1007))

---

## Demo & Links
- **Live Demo**: [GitHub Repository](https://github.com/trudransh/DotLuck)
- **GitHub Repository**: [DotLuck](https://github.com/trudransh/DotLuck)

---

## Project Overview

### Description:
Dotluck is a lottery platform where users can test their luck by betting on multiple types of lottery games built on top of the Polkadot blockchain. Polkadot provides a multi-layered security structure, ensuring that the system operates in a trustless environment. 

The platform features two main types of lottery games:
1. **High-Risk, High-Reward Lottery**: Users can purchase tickets from $1 to $10 and stand a chance to win a substantial reward from the pool.
2. **No-Loss Lottery**: Users buy a ticket for the lottery pool and, if they don’t win, they can opt-out and get their original amount back, providing a risk-free option. Additionally, choosing to stay in the lottery increases their chances of winning in the raffle.

### Key Features:
- **Lottery**: High Risk, High Reward. Users can purchase tickets for a modest price and have a chance to win large rewards.
- **No Loss Lottery**: Users can play risk-free by receiving their original stake back if they don’t win while staying in the game increases their chance of winning.

---

## Technology Stack

- **Blockchain/Parachains**:
  - **Moonbeam**: Smart contract functionality for the lottery, and orchestration of the no-loss lottery mechanism.
  - **Bifrost**: Liquid staking for the raffle pool, generating yield transferred to the Moonbeam contract for winner selection and reward distribution.

- **Frontend**: **Next.js**

---

## Progress & Changelog

### Day 1 (27/11/2024):
- **Achievements**: 
  - Ideation on the No-Loss Lottery.
  - Figuring out the tech stack, architecture, and parachains.
  - Locked the idea for the round.
- **Challenges**: 
  - Selecting the perfect parachains to use for the project.

### Day 2 (28/11/2024):
- **Achievements**:
  - Researching parachains and compatibility with project needs.
  - Started front-end development.
  - Tweaked the idea to incorporate multiple games, including normal lottery and no-loss lottery.
- **Challenges**:
  - Faced challenges in reframing the app architecture and pivoting the idea.

### Day 3 (29/11/2024):
- **Achievements**:
  - Built the smart contracts on Moonbeam for the lottery.
  - Started working on the no-loss lottery contract.
- **Challenges**:
  - Issues with Moonbeam contract XCM calls to the Bifrost network.
  - Integrating Chainlink VRF for randomness and winner selection.
