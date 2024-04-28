class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    // ...
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f280bef9-8cb1-42f0-967f-b248aa62ce9e",
    "Content-Type": "application/json",
  },
});
