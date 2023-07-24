const development = {
  name: process.env.NAME,
  port: process.env.PORT,
  asset_path: process.env.ASSET_PATH,
  session_cookie_key: process.env.SESSION_COOKIE_KEY,
  db: process.env.DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  },
  google_client_id: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.GOOGLE_CALL_BACK_URL,
  jwt_secret: process.env.JWT_SECRET,
};

const production = {
  name: process.env.CODEIAL3_ENVIRONMENT,
  asset_path: process.env.CODEIAL3_ASSET_PATH,
  port: process.env.CODEIAL3_PORT,
  session_cookie_key: process.env.CODEIAL3_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL3_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL3_GMAIL_USERNAME,
      pass: process.env.CODEIAL3_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.CODEIAL3_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL3_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CODEIAL3_GOOGLE_CALL_BACK_URL,
  jwt_secret: process.env.CODEIAL3_JWT_SECRET,
};

// module.exports = eval(process.env.CODEIAL3_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL3_ENVIRONMENT);
module.exports = development;
// module.exports=production;
