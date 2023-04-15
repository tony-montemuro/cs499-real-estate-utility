const FrontendHelper = () => {
    /* ===== VARIABLES ===== */
    const dollar = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

    /* ===== FUNCTIONS ===== */

    // FUNCTION 1: floatToUSD - takes a floating point value, and returns a string formatted in USD
    // PRECONDITIONS (1 parameter):
    // 1.) val - a floating-point number representing a price
    // POSTCONDITIONS (1 possible outcome):
    // using the dollar format, a copy of val is generated in the USD format, and returned
    const floatToUSD = val => {
        return dollar.format(val);
    };

    // FUNCTION 2: formatFloat - takes a floating point value, and returns a string with nice formatting (commas)
    // PRECONDITIONS (1 parameter):
    // 1.) val - a floating-point number
    // POSTCONDITIONS (1 possible outcome):
    // a single string is returned that is equivalent to val, but with commas added for readability
    const formatFloat = val => {
        return val.toLocaleString("en-US");
    };

    // FUNCTION 3: getAddress - takes a street, city, zip, and state, and returns an address string
    // PRECONDITIONS (1 parameter):
    // 1.) property - an object that contains fields for street, city, zip, and state of the property
    // POSTCONDITIONS (1 possible outcome):
    // a single string is returned that encompasses all parameters, in a proper format
    const getAddress = (property) => {
        return `${ property.street }, ${ property.city }, ${ property.state } ${ property.zip }`;
    };

    // FUNCTION 4: snakeToTitle - takes a string in snake case, and converts it to title case
    // PRECONDITIONS (1 parameter):
    // 1.) snake - a string, that is formatted in snake case
    // POSTCONDITIONS (1 possible outcome):
    // a single string is returned, which is the title case version of the snake parameter
    const snakeToTitle = (snake) => {
        return snake.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()).replace (/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());
    }

    return { floatToUSD, formatFloat, getAddress, snakeToTitle };
};

/* ===== EXPORTS ===== */
export default FrontendHelper;