var loader = $("#loader");
var content = $("#content");
var uicInstance;

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {

      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {

      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("UICBuilding.json", function(building) {


      App.contracts.UICBuilding = TruffleContract(building);

      App.contracts.UICBuilding.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    
    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Contract Address: " + account);
      }
    });
      return App.getResults();
  },
  

  getResults: function() {
    loader.hide();
    content.show();
    var candidatesResults = $('#candidatesResults');
    candidatesResults.empty();

    App.contracts.UICBuilding.deployed().then(function(instance) {
        uicInstance = instance;

        uicInstance.totalBuildings().then(function (obj){return obj.c}).then(function (totalBuildings) {

        for (var i = 1; i <= totalBuildings[0]; i++) {
            uicInstance.building(i).then(function(building) {
              var id = building[0];
              var name = building[1];
              var voteCount = building[2];


              var candidateTemplate =  "<td class='text-justify'>" + id + "</td> <td class='text-justify'> " + name + " </td><td class='text-justify'> " + voteCount +"</td>";
              console.log(candidateTemplate)
              candidatesResults.append(candidateTemplate);
            });
        }
      })
    });
  },
  
  
  addBuild: function() {
    var name = document.querySelector('#buildingName').value;
    var number = document.querySelector('#buildingNumber').value;
    var address = document.querySelector('#buildingAddress').value;
    // console.log("A -----------"+a)
    alert("We are adding:"+'\n' + "Name:" + name + '\n' + 'Number:' + number + '\n' + 'Address:' + address);
      
    App.contracts.UICBuilding.deployed().then(function(instance) {
        instance.addBuilding(name, number, address);
        alert("Added!");
        location.reload(true);
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

