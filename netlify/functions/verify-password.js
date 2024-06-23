// netlify/functions/verify-password.js
exports.handler = async (event, context) => {
    const { password } = JSON.parse(event.body);
    const correctPassword = process.env.ACCESS_PASSWORD;
  
    if (password === correctPassword) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: 'Incorrect password' })
      };
    }
  };