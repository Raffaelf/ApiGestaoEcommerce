'use strict'

const User = use('App/Models/User');

class UserController {

    async index({ auth }) {
        const user = await User.findOrFail(auth.user.id);
        return user;
    }

}

module.exports = UserController
