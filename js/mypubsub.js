var MyPubSub = (function () {
  var listCallbacks = [];

  function getArgs(args) {// remove first arg that is publish name
    var args = Object.create(args);
    for (var i in args) {
      args[i] = args[(parseInt(i) + 1)] ? args[(parseInt(i) + 1)] : null;
    }
    return args;
  }
  return {
    subscribe: function (topic, callback) {
      listCallbacks[topic] = listCallbacks[topic] || [];
      listCallbacks[topic].push(callback);
    },
    publish: function (topic) {
      listCallbacks[topic] = listCallbacks[topic] || []
      for (var i = 0, len = listCallbacks[topic].length; i < len; i++) {
        listCallbacks[topic][i].apply(this, getArgs(arguments));
      }
    }
  }
})();