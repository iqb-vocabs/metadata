let schema_folder = 'src/schemas';
let test_data_folder = 'test-data';
if (process.argv[2]) {
    schema_folder = process.argv[2];
    if (process.argv[3]) {
        test_data_folder = process.argv[3];
    }
}

const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const fs = require('fs');

function evaluateFileOk(
    filename: string,
    compiledSchema: { (arg0: any): any; errors: any; } | null,
    checkForInvalid: boolean
): boolean {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const valid = compiledSchema ? compiledSchema(JSON.parse(data)) : null;
        if (valid) {
            if (checkForInvalid) {
                console.log(`\x1b[0;31mERROR\x1b[0m '${filename}' should be invalid`);
                return false;
            } else {
                return true;
            }
        } else {
            if (checkForInvalid) {
                return true;
            } else {
                console.log(`\x1b[0;31mERROR\x1b[0m '${filename}':`);
                console.error(compiledSchema ? compiledSchema.errors : 'error unknown')
                return false;
            }
        }
    } catch (err) {
        console.log(`\x1b[0;31mERROR\x1b[0m '${filename}':`);
        console.error(err);
        return false;
    }
}

fs.readdirSync(schema_folder).forEach((file: string) => {
    const filenameSplits = file.split('.schema.');
    if (filenameSplits.length === 2) {
        let schema;
        try {
            schema = fs.readFileSync(`${schema_folder}/${file}`, 'utf8');
        } catch (err) {
            console.log(`\x1b[0;31mERROR\x1b[0m reading schema '${file}':`);
            console.error(err);
            process.exitCode = 1;
            schema = null;
        }
        if (schema) {
            let compiledSchema: { (arg0: any): any; errors: any; } | null;
            try {
                compiledSchema = ajv.compile(JSON.parse(schema))
            } catch (err) {
                console.log(`\x1b[0;31mERROR\x1b[0m parsing schema '${file}':`);
                console.error(err);
                process.exitCode = 1;
                compiledSchema = null;
            }
            if (compiledSchema) {
                const valid_folder = `${test_data_folder}/${filenameSplits[0]}/test_valid`;
                const invalid_folder = `${test_data_folder}/${filenameSplits[0]}/test_invalid`;
                let checksOk = 0;
                let checksNotOk = 0;
                if (fs.existsSync(valid_folder)) {
                    fs.readdirSync(valid_folder).forEach((file: string) => {
                        if (evaluateFileOk(`${valid_folder}/${file}`, compiledSchema, false)) {
                            checksOk += 1;
                        } else {
                            checksNotOk += 1;
                        }
                    });
                } else {
                    console.log(`${filenameSplits[0]}: \x1b[0;33m folder for valid test-data not found\x1b[0m`);
                }
                if (fs.existsSync(invalid_folder)) {
                    fs.readdirSync(invalid_folder).forEach((file: string) => {
                        if (evaluateFileOk(`${invalid_folder}/${file}`, compiledSchema, true)) {
                            checksOk += 1;
                        } else {
                            checksNotOk += 1;
                        }
                    });
                } else {
                    console.log(`${filenameSplits[0]}: \x1b[0;33m folder for invalid test-data not found\x1b[0m`);
                }
                if (checksNotOk > 0) {
                    console.log(`${filenameSplits[0]}: \x1b[0;31m${checksNotOk} check${checksNotOk > 1 ? 's' : ''} failed\x1b[0m`);
                    process.exitCode = 1;
                }
                if (checksOk > 0) {
                    console.log(`${filenameSplits[0]}: \x1b[0;32m${checksOk} check${checksOk > 1 ? 's' : ''} passed\x1b[0m`);
                }
            }
        }
    }
});
