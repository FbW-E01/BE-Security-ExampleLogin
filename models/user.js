import mongoose from 'mongoose';
import { hash, compareHashes } from '../libs/crypto.js';

const required = true;
const unique = true;

const userSchema = new mongoose.Schema({
    username: { type: String, required, unique },
    password: { type: String, required }
});

userSchema.statics.register = async function(data) {
    const hashed = await hash(data.password);

    data.password = hashed;

    return User.create(data);
};

userSchema.statics.login = async function(data) {
    const user = await User.findOne({ username: data.username });

    if (!user) {
        return false;
    }

    return await compareHashes(data.password, user.password);
}

const User = mongoose.model("loginusers", userSchema);

export default User;