import sendGrid from "@sendgrid/mail";
sendGrid.setApiKey(process.env.SENDGRIDAPIKEY!);
export default sendGrid;
