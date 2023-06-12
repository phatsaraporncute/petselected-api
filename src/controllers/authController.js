const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

exports.register = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password) throw new Error("must have email & password");

    if (password.length < 6 || password.length > 15)
        throw new Error("Password must be 6-15 characters");

    bcrypt
        .hash(password, 10)
        .then((hashed) => {
            return User.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashed,
            });
        })
        .then((rs) => {
            res.status(201).json({ msg: `user: '${rs.firstName}' created` });
        })
        .catch(next);
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: { email: email }
        })

        if (!user) {
            throw new Error("Cannot Login 1");
        }
        const pwOk = await bcrypt.compare(password, user.password)

        if (!pwOk) {
            throw new Error("Cannot Login 2")
        }
        const payload = {
            id: user.id,
            name: user.firstName
        }
        const token = jwt.sign(payload, `${process.env.JWT_SECRETKEY}`, { expiresIn: '30d' })
        res.json({ token: token })

    } catch (err) {
        next(err)
    }

    // const { email, password } = req.body;

    // User.findOne({
    //     where: { email: email },
    // }).then((user) => {
    //     if (!user)
    //         throw new Error("Cannot Login 1");
    //     return Promise.all([bcrypt.compare(password, user.password), Promise.resolve(user)])
    // }).then(([pwOk, user]) => {
    //     if (!pwOk)
    //         throw new Error("Cannot Login 2")
    //     const payload = {
    //         id: user.id,
    //         name: user.name
    //     }
    //     const token = jwt.sign(payload, `${process.env.JWT_SECRETKEY}`, { expiresIn: '30d' })
    //     res.json({ token: token })
    // }).catch(next)
};

exports.getMe = (req, res, next) => {
    const { id, firstName } = req.user
    res.json({ id, firstName })
}
