const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const useragent = require("express-useragent");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email required"],
        validate: function (value) {
            if (!validator.isEmail(value)) {
                throw new Error('invalid email');
            }
        }
    },
    username: {
        type: String,
        unique: true,
        required: [true, "username required"],
        trim: true
    },
    about: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password required"],
        min: 6
    },
    lastSeen: {
        type: Date,
    },
    tokens: {
        type: [
            {
                token: {
                    type: String
                },
                createdAt: {
                    type: Date,
                    default: Date.now()
                },
                platform: {
                    type: String
                },
                browser: {
                    type: String
                },
                isMobile: {
                    type: Boolean
                },
                isDesktop: {
                    type: Boolean
                },
                isAndroid: {
                    type: Boolean
                },
                isIphone: {
                    type: Boolean
                }
            }
        ]
    }
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.getToken = async function (fields) {
    const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET, {});

    this.tokens = this.tokens.concat({
        token,
        platform: fields.platform,
        browser: fields.browser,
        isMobile: fields.isMobile,
        isDesktop: fields.isDesktop,
        isAndroid: fields.isAndroid,
        isIphone: fields.isIphone
    });
    return token;
}

userSchema.methods.matchPassword = function (password) {
    return bcrypt.compare(this.password, password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;