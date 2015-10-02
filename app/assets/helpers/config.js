
var configProvider = function(){
  var config = {};

  return {
    set: function(key, val){
      config[key] = val;
    },
    get: function(key){
      return config[key];
    },
    $get: function(){
      return config;
    }
  };

}

module.exports = angular.module('foosApp.config', [])
  .provider('$config', configProvider);