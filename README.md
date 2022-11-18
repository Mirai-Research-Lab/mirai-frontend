### This repo contains the codebase for the NEXT JS frontend server for NFT Marketplace as well as User Profile.

### This webpage is the focal point of our project which will serve as the user's interface and simultaneously functioning as an NFT Marketplace wherein users can buy, sell and trade NFT's which they win from the game.

---

### FEATURES

- First and foremost, the user needs to make an account and sign up with his/her details.
- The users will need to connect a wallet a
- The users can connect different wallets to their account (provided that they are not already associated with any other email) .
- The users can set any connected wallet as their default funding address (The default funding address is that wallet address where all transactions regarding the game i.e. NFT's take place. All NFT's won by the user are transacted )
- The site has a leaderboard section showcasing the day's top performer's (based on their daily highscore). At the end of each day , the top 3 performers are awarded.with eth (GoEth) as well as an NFT (All NFT's are our very own creation !)
- All NFT's associated .
- In order to ensure maximum transparency and fairness, we have performed several checks. These include:-

  - 1 wallet can only be associated with a single email account.If an attempt is made to connect to an already associated wallet, the user is prompted and the wallet is disconnected.
  - Initially, the first connected wallet is set as the funding address. The users can connect to a different account and set it as their default account.
  - The mint NFT & withdraw balance buttons will work only if the users have won any NFT via the game.

- Our marketplace is a closed one , i.e. only the NFT's generated from the game can be traded here, the reason being to withhold relevancy of the marketplace with respect to our game.

- 36 unique NFT's have been curated using an open AI model.

- The users can list their minted NFT's for sale by setting a price. Moreover, they can update price and also cancel their listings.

- NFT's listed by other user's (wallet addresses) will be available in the NFT marketplace section and users can buy them at the specified prices.

- It is necessary for the user to create an account in order to play the game.
- The user can also update their profile pictures.
- The link to download the deployed game is provided in the home page.

---

### To run the server in local environment, follow these steps:

1. Run command: `git clone https://github.com/Mirai-Research-Lab/mirai-frontend`
2. Run command: `cd mirai-frontend`
3. Run command: `npm install`
4. Run command: `npm run dev`

The server will be running on port 3000.
To test the server, open your browser and go to `http://localhost:3000/`. It will redirect you to the auth (login-signup) page.

---

### The server is deployed on Vercel and can be accessed at: https://mirai-frontend.vercel.app/
