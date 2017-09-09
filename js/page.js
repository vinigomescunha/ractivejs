var Page = (function () {
        var page = {
          comments: 1,
          posts: 1
        };
        var perPage = {
          comments: 12,
          posts: 10
        }

        function getPage(index) {
          return page[index];
        }

        function setPage(index, value) {
          page[index] = value;
        }

        function getPerPage(index) {
          return perPage[index];
        }

        return {
          getPage,
          setPage,
          getPerPage
        }
      })();
