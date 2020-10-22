const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: {
        enabled: isProduction,
        content: ['./src/**/*.html', './src/**/*.tsx', './src/styles/**/*.scss', './src/styles/**/*.css'],
        options: {
            whitelist: ['form-input', 'form-select']
        }
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
                accent: '#B3405D'
            },
            boxShadow: {
                md: '0 4px 8px -1px rgba(0, 0, 0, 0.05)'
            },
        }
    },
    variants: {},
    plugins: [
        require('@tailwindcss/custom-forms')
    ],
};
