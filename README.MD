## To build using dockerfile
docker build -t rickzx98/io-module:{version}

## To run the image
docker run -it --name io-module --env-file ./.env  rickzx98/io-module:{version} 