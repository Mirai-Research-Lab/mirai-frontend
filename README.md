This repo contains the codebase for the NEXT JS frontend server for NFT Marketplace as well as User Profile.

#### This webpage is the focal point of our project which will serve as the user's interface and simultaneously functioning as an NFT Marketplace wherein users can buy, sell and trade NFT's which they win from the game.

---

### FEATURES

##### Overview and User Info
- First and foremost, the user needs to make an account and sign up with his/her details.
- It is necessary for the user to create an account in order to play the game.
- The link to download the deployed game is provided in the home page.
- The users can connect different wallets to their account (provided that they are not already associated with any other email) .
- The users can set any connected wallet as their default funding address (The default funding address is that wallet address where all transactions regarding the game i.e. NFT's take place. All NFT's won by the user are transacted )
- The site has a leaderboard section showcasing the day's top performer's (based on their daily highscore). At the end of each day , the top 3 performers are awarded with Eth (GoEth) as well as an NFT (All NFT's are our very own creation !)
- The NFT's can be minted into any wallet address of the user's choice (The user needs to first connect to that wallet).
- The user can also update their profile pictures.

![6jpeg](https://user-images.githubusercontent.com/96298187/202830046-f55f9499-dbc4-4fe0-a959-02470e44ae31.jpeg)
<br/>
<br/>
![4jpeg](https://user-images.githubusercontent.com/96298187/202830065-d1f1e93a-c7b8-4d1d-acbf-deac8d951dfb.jpeg)
<br/>
<br/>
<br/>
![image](https://user-images.githubusercontent.com/96298187/202830684-b8c74c71-9886-4a3f-8500-82abd538aca8.png)


#### Security 
- In order to ensure maximum transparency and fairness, we have performed several checks. These include:-
 - 1 wallet can only be associated with a single email account.If an attempt is made to connect to an already associated wallet, the user is prompted and the wallet is disconnected.

  - Initially, the first connected wallet is set as the funding address. The users can connect to a different account and set it as their default account.

  - The mint NFT & withdraw balance buttons will work only if the users have won any NFT via the game.
  ![image](https://user-images.githubusercontent.com/96298187/202830372-852da701-36a8-4bc6-9c0d-38d3fbb16009.png)
<br/><br/>

![image](https://user-images.githubusercontent.com/96298187/202830298-7e6a3a84-3b85-464b-b6f1-d1838b27938f.png)
<br/><br/>

#### Marketplace
- Our marketplace is a closed one , i.e. only the NFT's generated from the game can be traded here, the reason being to withhold relevancy of the marketplace with respect to our game. 

- All NFT's gained by the user can be put up for sale in any other marketplace.

- 36 unique NFT's have been curated using an open AI model.

- The users can list their minted NFT's for sale by setting a price. Moreover, they can update price and also cancel their listings.

- NFT's listed by other user's (wallet addresses) will be available in the NFT marketplace section and users can buy them at the specified prices.  

![image](https://user-images.githubusercontent.com/96298187/202830243-0ecb28f6-b4df-4eeb-b682-467c25c817e1.png)
<br/>
<br/>
<br/>
<br/>
![image](https://user-images.githubusercontent.com/96298187/202830481-c7272e28-8d4c-4956-a414-9f613080ceda.png)

---
#### Game 

The home page of the website has the link to the deployed game from where the user can download the game. A disclaimer is displayed on accessing the link. The user can
then download the game for free from the provided link.
<br/><br/>
![image](https://user-images.githubusercontent.com/96298187/202830608-88218c7a-4416-4717-9439-a58f3bf16422.png)

<br/><br/>
![image](https://user-images.githubusercontent.com/96298187/202830612-c4f678d1-27fa-4305-b6dc-a61a35464c61.png)

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
