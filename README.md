# Prototype showcasing Web3 wallet login functionality

This project is a prototype that demonstrates Web3 wallet login functionality. The goal of this project is to allow new users to register, link their Wallet ID, and subsequently login to the application using their linked wallet.

### Features:

- New User Registration: New users can create an account by providing their necessary details.
  
- Wallet Linking: Users have the option to link their Web3 Wallet ID to their account.

- Login with Wallet: Once a user has linked their wallet, they can log in to the application by simply authenticating with their connected wallet.

## Usage
- **Open Demo Application**: Access this [demo](https://web3-login-five.vercel.app/) link to try out the application, or follow the instructions in the local setup section below.

- **Wallet Setup** *(Skip if wallet is already installed)*: To begin, click on the 'Sign In with Web3 Wallet' button. This will provide you with the necessary links to download wallet applications as Chrome extensions or mobile apps. (We recommend starting with MetaMask).
  - **Install the Wallet:** Download and install the chosen wallet extension or mobile application on your device.
  - **Launch the Wallet:** Open the installed wallet and follow the provided instructions to begin the setup process.
  - **Generate Seed Phrases:** You will be prompted to generate a set of seed phrases (aka a recovery phrase). These seed phrases are important for wallet restoration.
  - **Verify Seed Phrases:** After securely storing the seed phrases, the wallet will request you to verify them by entering them in the correct order. 
- **Register as a New User:** Click on `New User` and provide the necessary details.

- **Sign In:** Use your chosen username and password to sign in.

- **Link Wallet:** On the `Home` page, click on the `Link Wallet` button and provide your Wallet ID (which should be visible in your wallet).

- **Try 'Sign In with Web3 Wallet' feature**: Sign out from the application and attempt to sign in again using the `Sign In with Web3 Wallet` feature.  **MetaMask** should prompt you to `sign a message` to verify wallet ownership.

**Voila!:** If everything goes smoothly, you should now be redirected to the `Home` page of the application.


## Local setup

Install dependencies
```bash
npm run install
# or
yarn install 
```
Run the development server:
```

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Deploy

Project is configured to deploy in vercel. Push the changes to `main` branch and it will automatically deploy the changes.

Use this [demo](https://web3-login-five.vercel.app/) link
