module.exports = config => {
    config.set({
        mutate: [
            'lib/**/*.js'
        ],
        mutator: "javascript",
        packageManager: "npm",
        reporters: ["html", "clear-text", "progress"],
        testRunner: "mocha",
        transpilers: [],
        testFramework: "mocha",
        mochaOptions: {
            files: [ 'test/**/*.js' ]
        },
        coverageAnalysis: "perTest"
    });
};
