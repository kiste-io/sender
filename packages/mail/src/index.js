const nodemailer = require('nodemailer')
const {
    MAILBOX_PORT, 
    MAILBOX_HOST,

    SEND_PREDEFINED_EMAIL_TARGET_FROM,
    SEND_PREDEFINED_EMAIL_TARGET_TO,
    SEND_PREDEFINED_EMAIL_TARGET_SUBJECT,
    
    SEND_OBTAINED_EMAIL_TARGET_FROM,
    SEND_OBTAINED_EMAIL_TARGET_SUBJECT,
} = require('./config')
const templater = require('@kiste/sender-template')



const renderHtmlTemplate = (templateName, payload) => 
    Promise.resolve(templater(templateName, payload).compile())


const mailSender = (payload, sinks) => 
    Promise.all(
        sinks.map(
            ([sink, templateName]) => 
                renderHtmlTemplate(templateName, payload)
                .then( html => sink(payload, {html}))))
    .then((r) => [payload, r]);


const createTransport = () => 
    new Promise((resolve, reject) => {
        try{
            resolve(nodemailer.createTransport({
                host: MAILBOX_HOST,
                port: MAILBOX_PORT            
            }));
        } catch (e) {
            console.error(e)
            reject(e)
        }
    })

/**
 * SEND Variants
 */

const SEND_PREDEFINED_EMAIL_LABEL = 'predefined_address'

const sendToPredefinedAddress = (_, {html}) => 
    createTransport()
    .then(transport => 
        Promise.resolve(transport.sendMail({
            html,
            from: SEND_PREDEFINED_EMAIL_TARGET_FROM,
            to: SEND_PREDEFINED_EMAIL_TARGET_TO,
            subject: SEND_PREDEFINED_EMAIL_TARGET_SUBJECT
        })))
    .then(result => ({
        label: SEND_PREDEFINED_EMAIL_LABEL,
        result
    }))
    

const  SEND_OBTAINED_EMAIL_LABEL = 'obtained_address'

const sendToObtainedAddress = ({email}, {html}) => 
    createTransport()
    .then(transport => Promise.resolve(transport.sendMail({
            html,
            from: SEND_OBTAINED_EMAIL_TARGET_FROM,
            to: email,
            subject: SEND_OBTAINED_EMAIL_TARGET_SUBJECT
        })))
    .then(result => ({
        label: SEND_OBTAINED_EMAIL_LABEL,
        result
    }))


module.exports = {
    mailSender,

    sendToPredefinedAddress,
    SEND_PREDEFINED_EMAIL_LABEL,
    
    sendToObtainedAddress,
    SEND_OBTAINED_EMAIL_LABEL
}