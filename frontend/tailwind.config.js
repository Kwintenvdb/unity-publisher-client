const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: {
        enabled: isProduction,
        content: ['./src/**/*.html']
    },
    theme: {
        container: {
            center: true,
        },
    },
    variants: {},
    plugins: [],
};
