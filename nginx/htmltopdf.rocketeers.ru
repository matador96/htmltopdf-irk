server {
    listen 80;
    listen  443;

    server_name htmltopdf.rocketeers.ru;
    root /home/htmltopdf/htmltopdf-irk/frontend/build;
    index index.html;

    location / {
        try_files $uri /index.html =404;
    }

    location /api {
        proxy_pass http://localhost:3006;
    }
}