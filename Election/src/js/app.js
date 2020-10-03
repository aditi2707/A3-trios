App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      ethereum.enable();
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.election.setProvider(App.web3Provider);
        App.listenForEvents();
      return App.render();
    });
  },
    
    // Listen for events emitted from the contract             // ------------
  listenForEvents: function() {
    App.contracts.election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();                         // ---------------------
      });
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.election.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.CandCount();
    }).then(function(CandCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $("#candidatesSelect");
      candidatesSelect.empty();


      for (var i = 1; i <= CandCount; i++) {
        electionInstance.candidate(i).then(function(candi) {
          var id = candi[0];
          var party= candi[1]
          var name = candi[2];
          var v_count = candi[3];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + party + "</th><td>" + name + "</td><td>" + v_count + "</td></tr>"
          candidatesResults.append(candidateTemplate);

          var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
        candidatesSelect.append(candidateOption);
        });
      }
      return electionInstance.voter(App.account);
    }).then(function(hasvoted){
        if(hasvoted){
          $('form').hide();
        }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },


  castVote: function() {
    var cand_id = $('#candidatesSelect').val();
    App.contracts.election.deployed().then(function(instance) {
      return instance.vote(cand_id, { from: App.account });
    }).then(function(result) {

      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
}; 

 $(function() {
  $(window).load(function() {
    App.init();
  });
});
