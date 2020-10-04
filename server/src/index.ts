import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import { UnityPublisherApi } from 'unity-publisher-api';
import { Repository } from './repository';

const app = new Koa();
app.use(bodyParser());

const router = new Router({
    prefix: '/api'
});

const api = new UnityPublisherApi();
const repository = new Repository();

let isAuthenticated = false;

router.get('/isAuthenticated', async ctx => {
    ctx.body = {
        isAuthenticated
    };
});

router.post('/authenticate', async ctx => {
    const { email, password } = ctx.request.body;
    await api.authenticate(email, password);
    await initializePackageData();
    isAuthenticated = true;
    ctx.status = 200;
});

async function initializePackageData() {
    const packages = await api.getPackagesData();
    repository.storePackages(packages);
}

router.get('/months', async ctx => {
    ctx.body = await api.getMonthsData();
});

router.get('/sales/:month', async ctx => {
    console.log('getting sales');
    const { month } = ctx.params;
    console.log('getting sales', month);
    ctx.body = await api.getSalesData(month);
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
