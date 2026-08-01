INSERT INTO applications (client_id, client_secret_hash, client_name, scopes,
                           authorization_grant_types, client_authentication_methods)
VALUES ('example-app',
        '{bcrypt}$2a$12$xzIPjB40faGFLYG0nryQ6OaDg/AVJGnKwEQGvrv16.t6HK0K3MKqW',
        'Example Consumer App',
        'permissions:sync',
        'password,refresh_token',
        'client_secret_basic');
