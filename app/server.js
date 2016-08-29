'use strict';

const path  = require('path');
const koa   = require('koa');
const route = require('koa-route');
const serve = require('koa-static');

const app   = koa();

app.use(route.get('/api/vote', function *() {
    this.body = 'vote';
}));

app.use(serve(path.join(`${__dirname}/view/`)));

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
