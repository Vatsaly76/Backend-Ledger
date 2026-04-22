const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for Creating an account'],
    },
    email: {
        type: String,
        required: [true, 'Email is required for Creating an account'],
        unique: [true, 'Email already exists'],
        lowercase: true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'],
        trim: true
    },
    password: { 
        type: String,
        required: [true, 'Password is required for Creating an account'],
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    return next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('User', userSchema);