import { mongoose } from "mongoose";
import bcrpt from "bcrpt";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please tell us your name"]
    },
    email:{
        type:String,
        required:[true,"Please provide a valid email"],
        unique:true,
        lowercase:true,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,"Please confirm your password"],
        validate:{
            validator:function(val){
                return this.password === val;
            },
            message:"Passwords do not match"
        }
    },
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        user.password =await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};
export const User = mongoose.model("User", userSchema);





