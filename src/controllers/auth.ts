import { UserSchema } from "../models";

const Auth = {
    create: async (props: any) => {
        const { name, email, password, role, city } = props;

        try {
            const newData = new UserSchema({
                name: name,
                email: email,
                password: password,
                role: role,
                city: city,
                createdAt: new Date()
            });

            const saveData = await newData.save();

            if (!saveData) {
                throw new Error("Database Error");
            }

            return saveData;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
    findOne: async (props: any) => {
        const { filter } = props;

        try {
            const result = await UserSchema.findOne(filter);

            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
    fintByCity: async (props: any) => {
        const { param } = props;
        try {
            const user: any = await UserSchema.findOne(param);
            const result = await UserSchema.find({ city: user.city });

            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    }
};

export default Auth;
