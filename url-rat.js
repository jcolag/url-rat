// You'll need a server of your own to capture these.
browser.storage.managed
  .get()
  .then((managed) => {
    browser.storage.sync
      .get()
      .then((local) => {
        // Overwrite defaults with local storage.
        var store = Object.assign(managed, local);
        var url = store.dest;
        var currentUrl = document.location.href;

        // We can skip all of this, if we're not supposed to run.
        if (!store.isActive) {
          return;
        }

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
      });
  });



