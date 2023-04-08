/* ===== IMPORTS ===== */
import { supabase } from "./SupabaseClient";

const ReadFilterHelper = () => {

    const fetchAbbreviatedShowingsNone = async (lower, upper) => {
        const { data:abbreviatedShowings, count, error, status} = await supabase
            .from("showing")
            .select(`
                showing_id,
                start_time,
                end_time,
                listing!inner (
                    agent (
                        agency (
                            name
                        ),
                        name
                    ),
                    listing_id,
                    property!inner (
                        street,
                        city,
                        small,
                        state,
                        zip
                    )
                ),
                agent (
                    name,
                    agency (
                        name
                    )
                )
            `, { count: "exact" })
            .range(lower, upper)
            .order("showing_id");

    // error handling
    if (error && status !== 406) {
        throw error;
    }

    //return data
    return { abbreviatedShowings: abbreviatedShowings, count: count };

    };

    const fetchAbbreviatedShowingsFilterZIP = async (lower, upper, zip) => {
        const { data:abbreviatedShowings, count, error, status} = await supabase
            .from("showing")
            .select(`
                showing_id,
                start_time,
                end_time,
                listing!inner (
                    agent (
                        agency (
                            name
                        ),
                        name
                    ),
                    listing_id,
                    property!inner (
                        street,
                        city,
                        small,
                        state,
                        zip
                    )
                ),
                agent (
                    name,
                    agency (
                        name
                    )
                )
            `, { count: "exact" })
            .range(lower, upper)
            .eq('listing.property.zip', zip)
            .order("showing_id");

        // error handling
        if (error && status !== 406) {
            throw error;
        }

        //return data
        return { abbreviatedShowings: abbreviatedShowings, count: count };
    };

    const fetchAbbreviatedShowingsFilterState = async (lower, upper, state) => {

        const { data:abbreviatedShowings, count, error, status} = await supabase
            .from("showing")
            .select(`
                showing_id,
                start_time,
                end_time,
                listing!inner (
                    agent (
                        agency (
                            name
                        ),
                        name
                    ),
                    listing_id,
                    property!inner (
                        street,
                        city,
                        small,
                        state,
                        zip
                    )
                ),
                agent (
                    name,
                    agency (
                        name
                    )
                )
            `, { count: "exact" })
            .range(lower, upper)
            .eq('listing.property.state', state)
            .order("showing_id");

        // error handling
        if (error && status !== 406) {
            throw error;
        }

        //return data
        return { abbreviatedShowings: abbreviatedShowings, count: count };
    };

    const fetchAbbreviatedShowingsFilterCity = async (lower, upper, city) => {
        const { data:abbreviatedShowings, count, error, status} = await supabase
            .from("showing")
            .select(`
                showing_id,
                start_time,
                end_time,
                listing!inner (
                    agent (
                        agency (
                            name
                        ),
                        name
                    ),
                    listing_id,
                    property!inner (
                        street,
                        city,
                        small,
                        state,
                        zip
                    )
                ),
                agent (
                    name,
                    agency (
                        name
                    )
                )
            `, { count: "exact" })
            .range(lower, upper)
            .eq('listing.property.city', city)
            .order("showing_id");

        // error handling
        if (error && status !== 406) {
            throw error;
        }

        //return data
        return { abbreviatedShowings: abbreviatedShowings, count: count };
    };

    const fetchAbbreviatedShowingsFilterStateZIP = async (lower, upper, zip, state) => {
        const { data:abbreviatedShowings, count, error, status} = await supabase
            .from("showing")
            .select(`
                showing_id,
                start_time,
                end_time,
                listing!inner (
                    agent (
                        agency (
                            name
                        ),
                        name
                    ),
                    listing_id,
                    property!inner (
                        street,
                        city,
                        small,
                        state,
                        zip
                    )
                ),
                agent (
                    name,
                    agency (
                        name
                    )
                )
            `, { count: "exact" })
            .range(lower, upper)
            .eq('listing.property.state', state)
            .eq('listing.property.zip', zip)
            .order("showing_id");

        // error handling
        if (error && status !== 406) {
            throw error;
        }

        //return data
        return { abbreviatedShowings: abbreviatedShowings, count: count };
    };

    const fetchAbbreviatedShowingsFilterCityZIP = async (lower, upper, zip, city) => {
        const { data:abbreviatedShowings, count, error, status} = await supabase
            .from("showing")
            .select(`
                showing_id,
                start_time,
                end_time,
                listing!inner (
                    agent (
                        agency (
                            name
                        ),
                        name
                    ),
                    listing_id,
                    property!inner (
                        street,
                        city,
                        small,
                        state,
                        zip
                    )
                ),
                agent (
                    name,
                    agency (
                        name
                    )
                )
            `, { count: "exact" })
            .range(lower, upper)
            .eq('listing.property.zip', zip)
            .eq('listing.property.city', city)
            .order("showing_id");

        // error handling
        if (error && status !== 406) {
            throw error;
        }

        //return data
        return { abbreviatedShowings: abbreviatedShowings, count: count };
    };

    const fetchAbbreviatedShowingsFilterCityState = async (lower, upper, state, city) => {
        const { data:abbreviatedShowings, count, error, status} = await supabase
            .from("showing")
            .select(`
                showing_id,
                start_time,
                end_time,
                listing!inner (
                    agent (
                        agency (
                            name
                        ),
                        name
                    ),
                    listing_id,
                    property!inner (
                        street,
                        city,
                        small,
                        state,
                        zip
                    )
                ),
                agent (
                    name,
                    agency (
                        name
                    )
                )
            `, { count: "exact" })
            .range(lower, upper)
            .eq('listing.property.state', state)
            .eq('listing.property.city', city)
            .order("showing_id");

        // error handling
        if (error && status !== 406) {
            throw error;
        }

        //return data
        return { abbreviatedShowings: abbreviatedShowings, count: count };
    };

    const fetchAbbreviatedShowingsFilterCityStateZIP = async (lower, upper, zip, state, city) => {

        console.log(zip, state, city)

        const { data:abbreviatedShowings, count, error, status} = await supabase
            .from("showing")
            .select(`
                showing_id,
                start_time,
                end_time,
                listing!inner (
                    agent (
                        agency (
                            name
                        ),
                        name
                    ),
                    listing_id,
                    property!inner (
                        street,
                        city,
                        small,
                        state,
                        zip
                    )
                ),
                agent (
                    name,
                    agency (
                        name
                    )
                )
            `, { count: "exact" })
            .range(lower, upper)
            .eq('listing.property.state', state)
            .eq('listing.property.zip', zip)
            .eq('listing.property.city', city)
            .order("showing_id");

        // error handling
        if (error && status !== 406) {
            throw error;
        }

        //return data
        return { abbreviatedShowings: abbreviatedShowings, count: count };
    };

    return({ fetchAbbreviatedShowingsNone, fetchAbbreviatedShowingsFilterZIP, fetchAbbreviatedShowingsFilterState, 
        fetchAbbreviatedShowingsFilterCity, fetchAbbreviatedShowingsFilterStateZIP, fetchAbbreviatedShowingsFilterCityZIP,
        fetchAbbreviatedShowingsFilterCityState, fetchAbbreviatedShowingsFilterCityStateZIP});

};

export default ReadFilterHelper;