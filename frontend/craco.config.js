const CracoAlias = require("craco-alias");

module.exports = {
    style: {
        postcssOptions: {
            plugins: [
                require('tailwindcss')('./tailwind.config.js'),
                require('postcss-extend')
            ],
        },
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: '.',
                tsConfigPath: './tsconfig.paths.json'
            }
        }
    ]
};