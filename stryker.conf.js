module.exports = config => {
    config.set({
        mutate: [
            'lib/**/*.js'
        ],
        testRunner: 'mocha',
        testFramework: 'mocha',
        coverageAnalysis: 'perTest',
        reporters: ['html', 'progress'],
        mutator: 'javascript'
    });
}
