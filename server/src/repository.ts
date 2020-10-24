import Database from 'better-sqlite3';
import { SalesByMonth } from './api/salesByMonth';
import { SalesDto } from '@shared/SalesDto';
import { PackageData } from 'unity-publisher-api';
import { NewSaleDiffsByMonth } from './api/newSaleDiff';
import { UserData } from './user/userData';

export class Repository {
    private readonly db = new Database('storage.db', { verbose: console.log });

    constructor() {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS packages (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                url TEXT NOT NULL
            );
        `);

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS sales (
                month INTEGER NOT NULL,
                package TEXT NOT NULL,
                numSales INTEGER NOT NULL,
                price REAL NOT NULL,
                gross REAL NOT NULL,
                lastSale TEXT NOT NULL,
                PRIMARY KEY (month, package, price)
            );
        `);

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS userData (
                email TEXT PRIMARY KEY,
                emailAlertsEnabled INTEGER
            );
        `);
    }

    public storePackages(packages: PackageData[]) {
        packages.forEach(pkg => {
            const statement = this.db.prepare('INSERT OR REPLACE INTO packages (id, name, url) VALUES (?, ?, ?)');
            statement.run(pkg.id, pkg.name, pkg.url);
        });
    }

    public getPackages(): PackageData[] {
        const statement = this.db.prepare('SELECT * FROM packages');
        return statement.all();
    }

    public getPackageByName(name: string): PackageData {
        const stmt = this.db.prepare('SELECT * FROM packages where name = ?');
        return stmt.get(name);
    }

    public storeSales(sales: SalesByMonth[]): NewSaleDiffsByMonth[] {
        const insertSaleStmt = this.db.prepare(`INSERT OR REPLACE INTO sales
            (month, package, numSales, price, gross, lastSale) VALUES
            (?, ?, ?, ?, ?, ?)`);
        const getSalesStmt = this.db.prepare(`
            SELECT numSales FROM sales
            WHERE month = ?
            AND package = ?
            AND price = ?
        `);

        sales.push({
            month: {
                value: '123',
                name: 'My month name'
            },
            sales: [{
                packageName: 'test package',
                gross: 510,
                sales: 18,
                price: 12.3,
                lastSale: 'last sale date'
            }]
        });

        const insertAll = this.db.transaction(() => {
            const diffs: NewSaleDiffsByMonth[] = sales.reduce((diffs: NewSaleDiffsByMonth[], saleByMonth) => {
                const diff: NewSaleDiffsByMonth = {
                    month: saleByMonth.month,
                    newSales: []
                };

                saleByMonth.sales.forEach(sale => {
                    const previousSales = getSalesStmt.get(saleByMonth.month.value, sale.packageName, sale.price);
                    const prevNumSales = previousSales?.numSales ?? 0;
                    if (sale.sales > prevNumSales) {
                        const numNewSales = sale.sales - prevNumSales;
                        console.log('New sales for ' + sale.packageName + ', new sales: ' + numNewSales);
                        insertSaleStmt.run(saleByMonth.month.value, sale.packageName, sale.sales, sale.price, sale.gross, sale.lastSale);

                        const previousGross = previousSales?.gross ?? 0;
                        const newGross = sale.gross;
                        diff.newSales.push({
                            packageName: sale.packageName,
                            numNewSales,
                            previousGross,
                            newGross
                        });
                    }
                });

                diffs.push(diff);
                return diffs;
            }, []);
            return diffs;
        });
        return insertAll();
    }

    public getSales(): SalesDto[] {
        const stmt = this.db.prepare('SELECT * FROM sales');
        return stmt.all();
    }

    public getSalesByMonth(month: number): SalesDto[] {
        const stmt = this.db.prepare('SELECT * FROM sales WHERE month = ?');
        return stmt.all(month);
    }

    public getUserData(): UserData {
        const stmt = this.db.prepare('SELECT * FROM userData');
        return stmt.get();
    }

    public setEmailAlertsEnabled(email: string, enabled: boolean) {
        if (enabled) {
            const stmt = this.db.prepare('INSERT OR REPLACE INTO userData (email, emailAlertsEnabled) VALUES (?, ?)');
            stmt.run(email, 1);
        } else {
            const stmt = this.db.prepare('DELETE FROM userData');
            stmt.run();
        }
    }
}
