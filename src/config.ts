
type configType={
    authServer : string;
    resourceServer : string;
    refreshTokenApi :string;
}

const config:configType = {
    authServer : "https://localhost:8081",
    resourceServer : "https://localhost:8080",
    refreshTokenApi : "http://localhost:8081/reissue/access_token"
}

export default config;