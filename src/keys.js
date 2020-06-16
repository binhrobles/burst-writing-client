const keys = Object.freeze({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/dev/'
      : 'https://burstwriter.binhrobles.com/',
});

export default keys;
