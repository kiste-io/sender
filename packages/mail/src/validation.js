const Validator = require('jsonschema').Validator;
const v = new Validator();
const {PAYLOAD_SCHEMAS_DIR_PATH} = require('./config')
const fs = require('fs')

const schemaFileNameRegEx = new RegExp(/^(\w+)\.json/)


/**
 * Load everything we need for processing syncroniously
 */
const schemas = fs.readdirSync(PAYLOAD_SCHEMAS_DIR_PATH).map(file => {
    
    const match = schemaFileNameRegEx.exec(file)
    
    if (!match || !match[1]) return {}

    const [_, schemaName] = match

    return {
        name: schemaName,
        schema: JSON.parse(fs.readFileSync(`${PAYLOAD_SCHEMAS_DIR_PATH}/${file}`, 'utf-8'))
    }
}).reduce((acc, s) => ({...acc, [s.name]: s.schema}) , {})

module.exports = {

    notExists: (templateName) => !schemas[templateName],

    isValid: (templateName, payload) => v.validate(payload, schemas[templateName]).valid
    
    
}