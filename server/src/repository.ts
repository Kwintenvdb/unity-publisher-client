import Database from 'better-sqlite3';
import { PackageData } from 'unity-publisher-api/dist/api/models/packageData';

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
    }

    public storePackages(packages: PackageData[]) {
        packages.forEach(pkg => {
            const statement = this.db.prepare('INSERT OR REPLACE INTO packages (id, name, url) VALUES (?, ?, ?)');
            statement.run(pkg.id, pkg.name, pkg.short_url);
        });
    }
}
