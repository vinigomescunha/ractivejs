document.addEventListener("DOMContentLoaded", function (event) {
      "use strict"; // declare all 
      Ractive.DEBUG = false; // debug
      var RTD = (function () { // reactive template data
        function trackError(error) {
          console.error('error', error)
        }

        function createPagination(page, length, target, callback) {
          var maxPage = 8;
          return new Ractive({
            target: target,
            template: '#template-pagination',
            onclick: callback,
            data: {
              page: page,
              length: length,
              isFirst: function () {
                return page <= 1;
              },
              isLast: function () {
                return page >= length;
              }
            }
          });
        }

        function getPostsResponse(response) {
          var first = (Page.getPage('posts') - 1) * Page.getPerPage('posts');
          var last = first + Page.getPerPage('posts');
          new Ractive({
            target: '#template-posts-container',
            template: '#template-posts',
            data: {
              results: (response.reverse()).slice(first, last) // last n posts
            }
          });
          createPagination(
            Page.getPage('posts'),
            Math.ceil(response.length / Page.getPerPage('posts')),
            '#template-pagination-posts-container',
            function (page) {
              Page.setPage('posts', page);
              MyPubSub.publish('getPosts');
            }
          );
        }

        function getPosts() {
          getResources('posts').then(getPostsResponse).catch(trackError);
        }

        function getCommentsResponse(response) {
          var first = (Page.getPage('comments') - 1) * Page.getPerPage('comments');
          var last = first + Page.getPerPage('comments');
          new Ractive({
            target: '#template-comments-container',
            template: '#template-comments',
            data: {
              results: (response.reverse()).slice(first, last) // last n posts
            }
          });
          createPagination(
            Page.getPage('comments'),
            Math.ceil(response.length / Page.getPerPage('comments')),
            '#template-pagination-comments-container',
            function (page) {
              Page.setPage('comments', page);
              MyPubSub.publish('getComments');
            }
          );
        }

        function getComments() {
          getResources('comments').then(getCommentsResponse).catch(trackError);
        }

        function createUsersReload() {
          new Ractive({
            target: '#template-users-reload-container',
            template: '#template-users-reload',
            onclick: function () {
              MyPubSub.publish('getUsers');
            }
          });
        }

        function getUsersResponse(response) {
          new Ractive({
            target: '#template-users-container',
            template: '#template-users',
            data: {
              results: response.results.reverse()
            }
          });
          createUsersReload();
        }

        function getUsers() {
          getResources('users').then(getUsersResponse).catch(trackError);
        }
        return {
          getUsers,
          getComments,
          getPosts
        }
      })();
      MyPubSub.subscribe('getPosts', RTD.getPosts);
      MyPubSub.subscribe('getComments', RTD.getComments);
      MyPubSub.subscribe('getUsers', RTD.getUsers);
      MyPubSub.publish('getPosts');
      MyPubSub.publish('getComments');
      MyPubSub.publish('getUsers');
    });
