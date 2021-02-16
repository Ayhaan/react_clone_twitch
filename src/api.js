

import axios from 'axios';

let api = axios.create({
    headers: {
        "Client-ID": "0uegf09amf2bowytsvwzqlqmq9u4wc",
        "Authorization": "Bearer ztgpjz9i66f5pbtl1dggf6srxpcr2h"
        }
})

/*
    CLIENT_ID = 'VOTRE_CLIENT_ID';
    REDIRECT = 'http://127.0.0.1/';

    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id=0uegf09amf2bowytsvwzqlqmq9u4wc&redirect_uri=http://localhost:3000&response_type=token

*/

export default api;