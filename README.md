nginx：
add_header Access-Control-Allow-Origin '*';
add_header Access-Control-Allow-Methods 'POST,PUT,GET,DELETE';
add_header Access-Control-Allow-Headers 'version, access-token, user-token, Accept, apiAuth, User-Agent, Keep-Alive, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With'; 


apache：
Header set Access-Control-Allow-Origin *
Header set Access-Control-Allow-Credentials true
Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept"
