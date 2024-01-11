require('dotenv').config();

async function getBearerToken() {
    try {
        const { CREDENTIALS_URL, CREDENDIALS_USER, CREDENTIALS_PASS } = process.env;
        const url = CREDENTIALS_URL;
        const data = {
            username: CREDENDIALS_USER,
            password: CREDENTIALS_PASS
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (response.ok) {
            return responseData.token;
        } else {
            throw new Error(`Failed to get token. Status: ${response.status}, Message: ${responseData.message}`);
        }
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while getting the bearer token.');
    }
}

module.exports = getBearerToken;