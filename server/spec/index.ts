import find from 'find';
import Jasmine from 'jasmine';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import logger from '@shared/Logger';

// Setup command line options
const options = commandLineArgs([
    {
        name: 'testFile',
        alias: 'f',
        type: String,
    },
]);

const result2 = dotenv.config({
    path: `./env/test.env`,
});
if (result2.error) {
    throw result2.error;
}

const jasmine = new Jasmine(null);

jasmine.loadConfig({
    random: true,
    spec_dir: 'spec',
    spec_files: [
        './**/*.spec.ts',
    ],
    stopSpecOnExpectationFailure: false,
});

jasmine.onComplete((passed: boolean) => {
    if (passed) {
        logger.info('All tests have passed :)');
    } else {
        logger.error('At least one test has failed :(');
    }
});

if (options.testFile) {
    const testFile = options.testFile;
    find.file(testFile + '.spec.ts', './spec', (files) => {
        if (files.length === 1) {
            jasmine.specFiles = [files[0]];
            jasmine.execute();
        } else {
            logger.error('Test file not found!');
        }
    });
} else {
    jasmine.execute();
}
