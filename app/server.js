'use strict';

const koa   = require('koa');
const route = require('koa-route');
const send  = require('koa-send');

const app = koa();

app.use(function *(next) {
    // go to next middleware if it about api
    if (this.path.substr(0, 4).toLowerCase() === '/api') {
        yield next;
        return;
    }
    // file exists and its ok
    if (yield send(this, this.path, { root: 'app/view' })) {
        return;
    }
    if (this.path.indexOf('.') !== -1) {
      // file does not exist so do nothing and koa will return 404 by default
      // we treat any path with a dot '.' in it as a request for a file
      return;
    }
    yield send(this, '/index.html', { root: 'app/view' });
});

app.use(route.get('/api/vote', function *() {
    this.body = 'vote';
}));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
