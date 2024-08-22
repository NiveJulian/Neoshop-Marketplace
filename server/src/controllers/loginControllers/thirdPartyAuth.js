const admin = require("./firebaseAdmin");
const { user } = require('../../db.js');

const authThird = async (token) => {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, email, email_verified, firebase, name, picture } = decodedToken;

        const [theUser, created] = await user.findOrCreate({
            where: { email },
            defaults: {
              id_user: uid,
              name: name || " ",
              email_verified,
              sign_in_provider: firebase.sign_in_provider,
              picture: picture || " ",
            },
          });
        if(!created){
            if(!theUser.sign_in_provider) throw new Error ("The user already exist");
        };
        
        return theUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = authThird;
