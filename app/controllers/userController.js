import User from "../../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from './../../error/ApiError.js';

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: "1d"},
        );
}

class UserController {
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({where: {email}});

            if (!user) {
                return next(ApiError.badRequest("User with this email not found"));
            }
            const comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) {
                return next(ApiError.internal("Wrong Password"));
            }
            const token = generateJwt(user.id, user.email);

            return res.json({token});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
        
    }

    async registration(req, res) {
        try {
            const {email, password} = req.body;
        
            if (!(email || password).trim()) {
                return next(ApiError.badRequest("Empty password or login"));
            }

            const candidate = await User.findOne({where: {email}});

            if (candidate) {
                return next(ApiError.badRequest("User with this name already exists"));
            }

            const hashPassword = await bcrypt.hash(password, 5);

            const user = await User.create({ email, password: hashPassword });

            const token = generateJwt(user.id, user.email);

            return res.json({token});
        } catch (e) {
            return next(ApiError.internal(e.message));
        }
        
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email);

        return res.json({token});
    }
}

export default new UserController;