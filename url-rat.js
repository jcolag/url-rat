// You'll need a server of your own to capture these.
// Change the URL below to match.
var url = 'http://localhost:8080/';
var currentUrl = document.location.href;

console.log(currentUrl);
(async () => {
  // Send the request
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'text/plain',
      'Content-Type': 'text/html',
      // My sample server isn't recognizing the request body,
      // so since it's just a URL, I'm stashing a copy in the
      // header, too.
      'X-This-Is-The-Url': currentUrl
    },
    body: currentUrl
  });
  // Get the response
  const content = await rawResponse;
  // Dump the response to the console, so that we can tell
  // something happened on our side.
  console.log(content);
})();

