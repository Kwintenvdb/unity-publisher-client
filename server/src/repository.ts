import Database from 'better-sqlite3';
import { PackageData } from 'unity-publisher-api/dist/api/models/packageData';
// import { SalesData } from 'unity-publisher-api/dist/api/models/salesData';
import { SalesByMonth } from './salesByMonth';
import { SalesDto } from '@shared/SalesDto';

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
                gross TEXT NOT NULL
            );
        `);
    }

    public storePackages(packages: PackageData[]) {
        packages.forEach(pkg => {
            const statement = this.db.prepare('INSERT OR REPLACE INTO packages (id, name, url) VALUES (?, ?, ?)');
            statement.run(pkg.id, pkg.name, pkg.short_url);
        });
    }

    public getPackages(): PackageData[] {
        const statement = this.db.prepare('SELECT * FROM packages');
        return statement.all();
    }

    public storeSales(sales: SalesByMonth[]) {
        sales.forEach(saleByMonth => {
            saleByMonth.sales.forEach(sale => {
                const stmt = this.db.prepare('INSERT OR REPLACE INTO sales (month, package, numSales, gross) VALUES (?, ?, ?, ?)');
                stmt.run(saleByMonth.month.value, sale.packageName, sale.sales, sale.gross);
            });
        });
    }

    public getSales(): SalesDto[] {
        const stmt = this.db.prepare('SELECT * FROM sales');
        return stmt.all();
    }
}
