const bcrypt = require('bcrypt')

/**
 * Generate OTP with specific length
 * 
 * @param int length 
 * @returns string
 */
exports.generateOtp = async (length = 6) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Generate secret from OTP by hashing the OTP
 * 
 * @param string secret 
 * @returns string
 */
exports.generateSecret = async(otp) => {
    // Salt is a random string that is added to a password before hashing.
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    // Hash the OTP
    const hashedOtpBuffer = await bcrypt.hash(otp, salt);
    const secret = hashedOtpBuffer.toString('utf8');
    return secret;
}

/**
 * Verify OTP by comparing secret and OTP 
 * 
 * @param string secret 
 * @param int otp 
 */
exports.verify = async(otp, secret) => {
    const isMatch = await bcrypt.compare(otp, secret)
    return isMatch
}