server {
    listen 80;
    listen  443;

    server_name htmltopdf-v2.rocketeers.ru;
    
    location /api {
        proxy_pass http://localhost:3008;
    }
}