const config = {};

if(process.env.PORT) {
  config.twilioAccountSid = process.env.twilioAccountSid;
  config.twilioAuthToken = process.env.twilioAuthToken;
  config.twilioPhoneNumber = process.env.twilioPhoneNumber;
} else {
  const twilioKeys = require('./keys.js');
  config.twilioAccountSid = twilioKeys.twilioAccountSid;
  config.twilioAuthToken = twilioKeys.twilioAuthToken;
  config.twilioPhoneNumber = twilioKeys.twilioPhoneNumber;
}

module.exports = config;