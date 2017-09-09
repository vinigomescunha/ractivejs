var getReqInfo = (function (endpoint) {
  var endPoints = {
    users: 'https://randomuser.me/api/?results=10',
    comments: 'https://jsonplaceholder.typicode.com/comments',
    posts: 'https://jsonplaceholder.typicode.com/posts'
  }
  if (!endPoints[endpoint]) {
    throw new Error('no exist endpoint');
  }
  return endPoints[endpoint];
});
var getReqInit = (function (init) {
  var inits = {
    'cors': {
      mode: 'cors',
      method: 'GET',
      header: new Headers({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      })
    },
    'no-cors': {
      mode: 'no-cors'
    }
  };
  return inits[init];
});
var getResources = (function (refEndPoint) {
  var ReqInit = getReqInit('cors');
  var ReqInfo = getReqInfo(refEndPoint);

  function getResource() {
    return fetch(ReqInfo, ReqInit).then(
      function (response) {
        return response.json().then(
          function (json) {
            return json;
          });
      }
    );
  }
  return getResource();
});