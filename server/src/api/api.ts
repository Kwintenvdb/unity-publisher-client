import { MonthData, UnityPublisherApi } from 'unity-publisher-api';
import { router } from './router';
import { Repository } from '../repository';
import { SalesByMonth } from './salesByMonth';

const repository = new Repository();

const api = new UnityPublisherApi();
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
    // TODO diff the changes
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
