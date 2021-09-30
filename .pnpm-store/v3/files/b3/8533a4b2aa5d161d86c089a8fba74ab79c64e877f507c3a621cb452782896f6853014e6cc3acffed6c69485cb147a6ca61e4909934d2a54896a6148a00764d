const prompt = ({ message, defaultResponse, stream }) => {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: stream,
    });

    return new Promise((resolve) => {
        rl.question(`${message} `, (answer) => {
            // Close the stream
            rl.close();

            const response = (answer || defaultResponse).toLowerCase();

            // Resolve with the input response
            if (response === "y" || response === "yes") {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

module.exports = prompt;
