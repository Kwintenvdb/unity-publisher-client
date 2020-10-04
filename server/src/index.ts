import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import { UnityPublisherApi } from 'unity-publisher-api';

const app = new Koa();
app.use(bodyParser());

const router = new Router({
    prefix: '/api'
});

const api = new UnityPublisherApi();

router.post('/authenticate', async ctx => {
    // console.log(ctx);
    const { email, password } = ctx.request.body;
    await api.authenticate(email, password);
    ctx.body = await api.getMonthsData();
});

router.get('/', async ctx => {
    ctx.body = 'test';
});

app.use(router.routes());

// Serving static assets
const root = path.join('..', 'frontend', 'build');
app.use(serve(root));
app.use(ctx => {
    ctx.redirect('/');
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
