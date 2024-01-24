import { AgendaSchema } from "../models";

const Agenda = {
    create: async (props: any) => {
        const { name, description, pdf } = props;

        try {
            const newData = new AgendaSchema({
                name: name,
                description: description,
                pdf_path: pdf
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
            const result = await AgendaSchema.findById(filter);
            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
    find: async (props: any) => {
        const { filter } = props;
        try {
            const result = await AgendaSchema.find(filter);
            // console.log("🚀 ~ file: agenda.ts:29 ~ find: ~ result:", result)

            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
    update: async ({ filter, updateDoc, options }: any) => {
        try {
            const result = await AgendaSchema.updateOne(filter, updateDoc, options);
            console.log("🚀 ~ file: agenda.ts:40 ~ update: ~ result:", result)
            // console.log("🚀 ~ file: agenda.ts:29 ~ find: ~ result:", result)

            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
}
export default Agenda;