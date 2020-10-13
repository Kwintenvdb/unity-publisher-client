import Database from 'better-sqlite3';
import { SalesByMonth } from './api/salesByMonth';
import { SalesDto } from '@shared/SalesDto';
import { PackageData } from 'unity-publisher-api';

export class Repository {
    private readonly db = new Database('storage.db', { verbose: console.log });

    constructor() {
        // Create the packages table
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
                PRIMARY KEY (month, package, price)
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

    public storeSales(sales: SalesByMonth[]) {
        const stmt = this.db.prepare('INSERT OR REPLACE INTO sales (month, package, numSales, price, gross) VALUES (?, ?, ?, ?, ?)');
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
                gross: 123,
                sales: 14,
                price: 12.3
            }]
        });

        const insertAll = this.db.transaction(() => {
            sales.forEach(saleByMonth => {
                saleByMonth.sales.forEach(sale => {
                    const previousSales = getSalesStmt.get(saleByMonth.month.value, sale.packageName, sale.price);
                    const prevNumSales = previousSales?.numSales || 0;
                    if (sale.sales > prevNumSales) {
                        const numNewSales = sale.sales - prevNumSales;
                        console.log('New sales for ' + sale.packageName + ', new sales: ' + numNewSales);
                        const result = stmt.run(saleByMonth.month.value, sale.packageName, sale.sales, sale.price, sale.gross);
                        console.log('insert sales');
                        console.log(result);
                    }
                });
            });
        });
        insertAll();
    }

    public getSales(): SalesDto[] {
        const stmt = this.db.prepare('SELECT * FROM sales');
        return stmt.all();
    }

    public getSalesByMonth(month: number): SalesDto[] {
        const stmt = this.db.prepare('SELECT * FROM sales WHERE month = ?');
        return stmt.all(month);
    }
}
