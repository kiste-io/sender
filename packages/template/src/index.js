const fs = require('fs')
const {
    EMAIL_TEMPLATES_DIR_PATH
} = require('./config')




const templateFileNameRegEx = new RegExp(/^(\w+)\.(\w+)/)

/**
 * Load everything we need for processing syncroniously
 */
const templates = fs.readdirSync(EMAIL_TEMPLATES_DIR_PATH).map(tpl => {
    
    const match = templateFileNameRegEx.exec(tpl)
    
    if (!match || !match[1] || !match[2]) return {}

    const [_, templateName, templateEngine] = match

    require(templateEngine)

    return {
        templateName,
        templateEngine,
        templateContent: fs.readFileSync(`${EMAIL_TEMPLATES_DIR_PATH}/${tpl}`, 'utf-8')
    }
})


/**
 * HANDELBARS Implementation
 */
const HANDELBARS_MODULE = 'handlebars'

const compileHandelsbars = (templateContent, payload) => new Promise((resolve, reject) => {
    try {
        const handelbars = require(HANDELBARS_MODULE)
        
        const template = handelbars.compile(templateContent);
        
        const result = template(payload)

        resolve(result);

    } catch (e) {
        reject(e)
    }
})

    





module.exports = (templateName, payload) => {

    const tpl = templates.find(t => t.templateName === templateName) 
    
    return {
        compile:  () =>  {

            switch (tpl.templateEngine) {
                case HANDELBARS_MODULE:
                    return compileHandelsbars(tpl.templateContent, payload)

                default:
                    return Promise.resolve('no template engine')

            }

            
        }
    }
    
}
