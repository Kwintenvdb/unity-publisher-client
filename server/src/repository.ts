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
                gross REAL NOT NULL
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
        const stmt = this.db.prepare('INSERT OR REPLACE INTO sales (month, package, numSales, gross) VALUES (?, ?, ?, ?)');
        const insertAll = this.db.transaction(() => {
            sales.forEach(saleByMonth => {
                saleByMonth.sales.forEach(sale => {
                    stmt.run(saleByMonth.month.value, sale.packageName, sale.sales, sale.gross);
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
