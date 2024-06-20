export default {
  async fetch(request) {
    const url = new URL(request.url);
    const q = decodeURI(url.searchParams.get('q'));

    if (q === null) {
      return new Response("Missing q parameter", {
        status: 400,
      });
    }
    const headers = {};
    request.headers.forEach((value,key) => {
      headers[key] = value;
    })

    const response = await fetch(q, headers);

    // Clone the response so that it's no longer immutable
    const newResponse = new Response(response.body, response);

    newResponse.headers.set('Access-Control-Allow-Origin', request.headers.origin ? request.headers.origin : '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
    return newResponse;
  },
};