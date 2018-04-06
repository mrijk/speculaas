module.exports = config => {
    config.set({
        mutate: [
            'lib/**/*.js'
        ],
        testRunner: 'mocha',
        testFramework: 'mocha',
        coverageAnalysis: 'perTest',
        reporter: ['html', 'progress'],
        mutator: 'javascript'
    });
}
