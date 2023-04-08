/* ===== IMPORTS ===== */
import { supabase } from "./SupabaseClient";


const Update = () => {
   
    const CreateShowings = async (day, time, hours, listing_number, agent_number) => {

        hours = hours ? hours : 1;

        var time_start = new Date(day + "T" + time + ":00");
        var time_end = new Date();
        time_end.setTime(time_start.getTime() + (hours * 3600000));

        try {
            const { data: error, status} = await supabase
                .from("showing")
                .insert([{
                    start_time: time_start,
                    end_time: time_end,
                    listing: listing_number,
                    agent: agent_number
                }])
     

            // error handling
            if (error && status !== 406) {
                throw error;
            }

        }
        catch (error) {
            console.log(error);
            console.log("huh");
            alert(error.message);
        }
    };


    return {CreateShowings };
};

/* ===== EXPORTS ===== */
export default Update;