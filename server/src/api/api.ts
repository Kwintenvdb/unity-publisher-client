import { MonthData, UnityPublisherApi } from 'unity-publisher-api';
import { router } from './router';
import { Repository } from '../repository';
import { SalesByMonth } from './salesByMonth';
import { UserService } from '../user/userService';
import { CronJob } from 'cron';
import { createEmailService } from '../notification/createEmailService';

const repository = new Repository();
const emailService = createEmailService();
const userService = new UserService(repository);

const api = new UnityPublisherApi();
let isAuthenticated = false;

const cacheDataJob = new CronJob('*/5 * * * *', () => {
    console.log('Data caching triggered by cron job.');
    if (isAuthenticated) {
        cacheData();
    } else {
        console.log('Not authenticated, ignoring job.');
    }
});

router.get('/isAuthenticated', async ctx => {
    ctx.body = isAuthenticated;
});

router.post('/authenticate', async ctx => {
    const { email, password } = ctx.request.body;
    await api.authenticate(email, password);
    await cacheData();
    cacheDataJob.start();
    isAuthenticated = true;
    ctx.status = 200;
});

async function cacheData() {
    console.log('Caching data...');
    await Promise.all([
        initializePackageData(),
        initializeSalesData()
    ]);
    console.log('Caching data done.');
}

router.post('/logout', ctx => {
    console.log('Logging out...');
    api.logout();
    cacheDataJob.stop();
    isAuthenticated = false;
    ctx.status = 200;
});

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

    const diffsByMonth = repository.storeSales(salesByMonth);
    const { email, emailAlertsEnabled } = userService.getUserData() ?? {};
    if (emailAlertsEnabled) {
        const monthsWithNewSales = diffsByMonth.filter(d => d.newSales.length > 0);
        if (monthsWithNewSales.length > 0) {
            console.log('sending email for months with new sales', monthsWithNewSales);
            emailService.sendSaleNotificationMail(email, monthsWithNewSales);
        }
    }
}

async function initializePackageData() {
    const packages = await api.getPackagesData();
    repository.storePackages(packages);
}

router.get('/months', async ctx => {
    ctx.body = await api.getMonthsData();
});

router.get('/sales/:month', async ctx => {
    const { month } = ctx.params;
    console.log('getting sales for ', month);
    const salesByMonth = repository.getSalesByMonth(month);
    salesByMonth.forEach(sbm => {
        const pkg = repository.getPackageByName(sbm.package);
        sbm.packageUrl = pkg.url;
    });
    ctx.body = salesByMonth;
});

router.get('/sales', async ctx => {
    console.log('getting all sales');
    ctx.body = repository.getSales();
});

router.get('/packages', async ctx => {
    console.log('getting packages');
    ctx.body = repository.getPackages();
});

router.get('/reviews', async ctx => {
    console.log('getting reviews');
    ctx.body = await api.getReviewData();
});

router.get('/email/isSubscribed', ctx => {
    const userData = userService.getUserData() ?? {};
    console.log(userData);
    ctx.body = Boolean(userData.emailAlertsEnabled);
});

router.post('/email/subscribe', ctx => {
    const { email } = ctx.request.body;
    userService.setEmailAlertsEnabled(email, true);
    ctx.status = 200;
});

router.post('/email/unsubscribe', ctx => {
    const { email } = ctx.request.body;
    userService.setEmailAlertsEnabled(email, false);
    ctx.status = 200;
});
