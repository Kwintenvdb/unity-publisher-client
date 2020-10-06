import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import { UnityPublisherApi } from 'unity-publisher-api';
import { Repository } from './repository';
import { MonthData } from 'unity-publisher-api/dist/api/models/monthData';
import { SalesByMonth } from './salesByMonth';

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
    await cacheData();
    isAuthenticated = true;
    ctx.status = 200;
});

async function cacheData() {
    await Promise.all([
        initializePackageData(),
        initializeSalesData()
    ]);
}

async function initializeSalesData() {
    async function fetchMonthSales(month: MonthData) {
        const sales = await api.getSalesData(month.value);
        salesByMonth.push({
            month: month,
            sales: sales
        });
    }

    const months = await api.getMonthsData();
    const salesByMonth: SalesByMonth[] = [];
    const promises = months.map(month => fetchMonthSales(month));
    await Promise.all(promises);
    salesByMonth.sort((s1, s2) => s1.month.value.localeCompare(s2.month.value));
    repository.storeSales(salesByMonth);
}

async function initializePackageData() {
    const packages = await api.getPackagesData();
    repository.storePackages(packages);
}

router.get('/months', async ctx => {
    console.log(repository.getPackages());
    ctx.body = await api.getMonthsData();
});

router.get('/sales/:month', async ctx => {
    console.log('getting sales');
    const { month } = ctx.params;
    console.log('getting sales', month);
    ctx.body = repository.getSalesByMonth(month);
});

router.get('/sales', async ctx => {
    console.log('getting all sales');
    ctx.body = repository.getSales();
});

router.get('/packages', async ctx => {
    console.log('getting packages');
    ctx.body = repository.getPackages();
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
