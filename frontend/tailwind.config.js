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
        extend: {
            colors: {
                dark: '#233857',
                'dark-soft': '#9fb8d1',
                primary: '#09a6d0',
                'primary-dark': '#028cb1',
                accent: '#fcaa8e'
            }
        }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/custom-forms')
    ],
};
