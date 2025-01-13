"use strict";
/**
 * contact controller
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.default = strapi_1.factories.createCoreController('api::contact.contact', ({ strapi }) => ({
    async create(ctx) {
        // Call the default core action
        const response = await super.create(ctx);
        // Extract the created message entity
        const { data: entity } = response;
        // Get the ID of the newly created entry
        const entryId = entity.id;
        // Define email options
        const mailOptions = {
            from: process.env.CONTACT_ALERT_EMAIL,
            replyTo: entity.email,
            to: process.env.MY_MAIL,
            subject: `#${Math.ceil(entryId / 3)}: ${entity.subject}`,
            text: `${entity.message}\n\n\nContact Details:\n${entity.name}\n${entity.email}\n${entity.contact}`,
        };
        // Schedule email sending in the next tick
        process.nextTick(() => {
            // Set up nodemailer transporter
            const transporter = nodemailer_1.default.createTransport({
                host: 'mail.socioy.com',
                port: 465,
                secure: true,
                pool: true,
                auth: {
                    user: process.env.CONTACT_ALERT_EMAIL,
                    pass: process.env.CONTACT_ALERT_EMAIL_PASSWORD,
                },
            });
            // Send email
            transporter
                .sendMail(mailOptions)
                .then(() => {
                strapi.log.info('Email sent successfully');
            })
                .catch((error) => {
                strapi.log.error('Error sending email:', error);
            });
        });
        return response;
    },
}));
