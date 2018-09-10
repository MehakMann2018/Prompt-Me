/*
 * Starting JS program to demonstrate fetching data from the Reddit API
 */

// putting this here gives it global "scope", meaning it is
// accessible in the console. Try console.log(gdata) to explore the result!
let gdata = null; 

(function() {
  // you can use this for now, but you'll eventually want your own key
  const authKey = "cNLS7HbvItB4PLc0sLQEhSbTo8QsWVZlkKYOfDbu0zPd8jVRTE";
  const secKey = "JHnttsQEES2ucfbEVA2hW640PehBoynKw1Cxcuuxj1oFSqdf1v";
  const blogs = ["writing-prompt-s", "unblockingwritersblock"]

  window.onload = function() {
    for (let i = 0; i < blogs.length; i++) {
      makeFetch(blogs[i]);
    }
  };

  /*
   * Fetches data from the Reddit API and adds 5 article tags, each
   * representing basic data for a post in the returned response.
   *
   * This is starter code to demonstrate how to get the API data and 
   * add HTML elements to the page as a result! Feel free to try and
   * expand on it!
   */
  function makeFetch(blogName) {
    //fetch("https://www.reddit.com/r/WritingPrompts/.json?limit=5")
    //fetch("https://api.tumblr.com/v2/blog/" + blog + ".tumblr.com/info?api_key=" + authKey)
    fetch("https://api.tumblr.com/v2/blog/" + blogName + ".tumblr.com/posts/text?api_key=" + authKey + "&limit=5")

      .then(checkStatus) // this handle errors for making fetches
      .then(JSON.parse)  // turns strings into easy-to-use JS objects
      .then(function(result) { 
        gdata = result;
        //let arr = result.data.children;
        let arr = result.response.posts;
        let body = document.querySelector("body");
        for (let i = 0; i < arr.length; i++) {
          //let post = arr[i].data;
          let post = arr[i];
          //body.innerHTML += post;
          let article = createPostElement(post);
          body.appendChild(article);
        }
      }).catch(console.log); // log any errors we catch to the console for debugging
  }

  function createPostElement(post) {
    //let title = post.title;
    let date = post.date;
    let timestamp = post.timestamp * 1000;
    let now = new Date().getTime();
    let secondsSince = (now - timestamp) / 1000;

    let minutesSince = parseInt(secondsSince /= 60);

    let postURL = post.short_url;
    let author = post.post_author;
    //let post = arr[i].summary;

    // create a <article> tag to contain the post data (a "card" on the page)
    let article = document.createElement("article");
    article.className = "card";

    // create a <h2> tag
    let h2 = document.createElement("h2");

    // create a <a> tag with link to url of post
    let a = document.createElement("a");
    a.href = postURL;
    a.target = "_blank"; // so users can click an open new tab
    //a.innerText = date;
    if (minutesSince < 60) {
      a.innerText = "posted " + minutesSince + " minutes ago";
    } else {
      a.innerText = "posted " + parseInt(minutesSince / 60) + " hours ago";
    }


    h2.appendChild(a);
    h2.innerHTML += " (" + post.blog_name + ")";

    article.appendChild(h2);

    // create a <img> tag with post thumbnail image, if one exists
    //if (post.thumbnail && post.thumbnail.indexOf(".") !== -1) {
    //  let img = document.createElement("img");
    //  img.src = post.thumbnail;
    //  article.appendChild(img);
    //}

    let p = document.createElement("p");
    if (post.summary === post.title) {
      p.innerHTML = post.body;
    } else {
      p.innerText = post.summary;
    }
    article.appendChild(p);

    return article;
  }

  // -------------------- Helper functions! -------------------- // 

  // Most of these are just shorthand functions for longer JS functions... :)
  function $(id) {
    return document.getElementById(id);
  }

  function qs(query) {
    return document.querySelector(query);
  }

  function qsa(query) {
    return document.querySelectorAll(query);
  }

  /*
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid result text if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 || response.status == 0) {
      return response.text();
    } else { 
      return Promise.reject(new Error(response.status + ": " + response.statusText));
    }
  }
})();
