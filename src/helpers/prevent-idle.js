import http from 'http';

export const ping = () => {
  setInterval(() => {
    const opts = {
      host: 'https://mws-gads-phase2.herokuapp.com',
      path: '/api/v1'
    };
    http.get(opts, (res) => {
      res.on('data', (chunk) => {
        try {
          console.log(chunk);
        } catch (error) {
          console.log(error);
        }
      });
    })
        .on('error', (error) => {
          console.log(error.message);
        });
  }, 10 * 60 * 1000);
};
