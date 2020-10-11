export function formatCurrency(amount: number): string {
    const format = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });
    return format.format(amount);
}
