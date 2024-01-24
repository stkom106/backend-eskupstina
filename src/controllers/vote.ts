import { VoteSchema } from "../models";

const Vote = {
    create: async (props: any) => {
        const { user_id, agenda_item_id, decision } = props;

        try {
            const newData = new VoteSchema({
                user_id: user_id,
                agenda_item_id: agenda_item_id,
                decision: decision,
                vote_time: new Date()
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
    find: async (props: any) => {
        const { filter } = props;
        try {
            const result = await VoteSchema.find(filter);
            // console.log("🚀 ~ file: agenda.ts:29 ~ find: ~ result:", result)

            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
    findOne: async (props: any) => {
        const { filter } = props;
        try {
            const result = await VoteSchema.findOne(filter);
            // console.log("🚀 ~ file: agenda.ts:29 ~ find: ~ result:", result)

            return result;
        } catch (err: any) {
            throw new Error(err.message);
        }
    },
}
export default Vote;