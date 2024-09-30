// Authorization endpoint for Spotify
export const authEndpoint = "https://accounts.spotify.com/authorize";

// Dynamically set the redirect URL based on the environment
const redirectUrl = encodeURIComponent(
    window.location.hostname === "localhost" 
        ? "http://localhost:3000/" 
        : "https://rajhalder123.github.io/Spotify-Frontend/"
);

// Your Spotify client ID
const clientId = "7e5f0dff5c9d45b385bf28c0a0b0e9d9";

// Scopes for the access token
const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
];

// Function to parse the token from URL
export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
            let parts = item.split("=");
            if (parts.length === 2) {
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
};

// Login URL for Spotify authorization
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
