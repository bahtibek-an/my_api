import User from "../models/models.js";
import userController from "../app/controllers/userController.js";
import bcrypt from "bcrypt";

const generateJwt = (id, email) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: "1d"},
        );
}

const userResolvers = {
    Query: {
        getAllUsers: async() => {
            return await User.findAll();
        },
        getUser: async(parent, { id }) => {
            return await User.findOne({where: {id}});
        }
    },
    Mutation: {
        registration: async (parent, { input }) => {
            const {email ,password} = input;

            if (!(email || password).trim()) {
                throw new Error("Empty password or login")
            }
    
            const candidate = await User.findOne({where: {email}});
    
            if (candidate) {
                throw new Error("User with this name already exists" )
            }
    
            const hashPassword = await bcrypt.hash(password, 5);
    
            const user = await User.create({ email, password: hashPassword });
    
            const token = generateJwt(user.id, user.email);
    
            return {id: user.id, email: user.email, token};
        },
        login: async (parent, { input }) => {
            const {email ,password} = input;

            const user = await User.findOne({where: {email}});

            if (!user) {
                throw new Error("User with this email not found");
            }

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (!comparePassword) {
                throw new Error("Wrong Password");
            }

            const token = generateJwt(user.id, user.email);

            return {id: user.id, email: user.email, token};
            }
    },
}

export default userResolvers;