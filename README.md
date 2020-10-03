## 'A3-try-os' tries out hands-on-project using Ethereum Network!
A3trios is a team of 3 geeks yearning for excellence !

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
