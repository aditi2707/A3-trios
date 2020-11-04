## 'A3-try-os' tries out hands-on-project using Ethereum Network!
A3trios is a team of 3 geeks yearning for excellence !

Screenshots

![2020-11-04 (3)](https://user-images.githubusercontent.com/51512071/98102181-547a0d00-1eb9-11eb-95fb-48f4358e7fa7.png)

![2020-11-04 (4)](https://user-images.githubusercontent.com/51512071/98102210-6196fc00-1eb9-11eb-95f4-53e9c8a5844c.png)

### Voting
![2020-09-06 (12)](https://user-images.githubusercontent.com/51512071/98102662-dcf8ad80-1eb9-11eb-9dfd-db1243c7af34.png)


![2020-11-04 (5)](https://user-images.githubusercontent.com/51512071/98102222-665bb000-1eb9-11eb-83ec-037b951394c2.png)



## Briefing for "Eth-election"


 ### Necessary prerequisites
    NPM: https://nodejs.org    // To interact with our local Ethereum Node 

    Truffle: https://github.com/trufflesuite/truffle   // Compile and deploy Smart Contracts, inject them into web apps.

    Ganache: http://truffleframework.com/ganache/      // Setting up a personal Ethereum Blockchain for testing your Solidity contracts.

    Metamask: https://metamask.io/     // Extension for accessing Ethereum enabled Dapps in your browser.
   
   
#### After cloning the project install the required dependencies in the same directory : npm install
  
* Open up the Ganache GUI client that you downloaded and installed.
   This will start ypur local blockchain instance .
  
### Compile and deploy Election smart contract
     truffle migrate --reset

   You must migrate the election smart contract each time your restart ganache.

 ### Configure Metamask
    *Unlock Metamask

    *Connect metamask to your local Etherum blockchain provided by Ganache.

    *Import an account provided by ganache.   

  ### Run the Front End Application
     npm run dev 

     Visit this URL in your Browser: https://localhost:3030
