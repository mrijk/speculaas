module.exports = function(config) {
    config.set({
        files: [
            { pattern: 'lib/*.js', mutated: true, included: false},
            { pattern: 'specs/*.js', mutated: false, included: false},
            { pattern: 'lib/util/*.js', mutated: true, included: false},
            { pattern: 'lib/test/*.js', mutated: false, included: false},
            'test/**/*.js'
        ],
        testRunner: 'mocha',
        testFramework: 'mocha',
        coverageAnalysis: 'perTest',
        reporter: ['html', 'progress'],
    });
}
