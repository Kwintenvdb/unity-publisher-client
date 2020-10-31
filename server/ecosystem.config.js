module.exports = {
    apps: [
        {
            name: 'unity-publisher-client',
            script: 'dist/index.js',
            watch: false,
            env: {
                'PORT': 3000,
                'NODE_ENV': 'production'
            }
        }
    ]
};
