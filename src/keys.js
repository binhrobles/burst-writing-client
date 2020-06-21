const keys = Object.freeze({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/dev/'
      : 'https://burstwriter.binhrobles.com/',
  clientId:
    '965552316990-ack881k6ntd1hdpvn2sc55cp7emd5d82.apps.googleusercontent.com',
});

export default keys;
