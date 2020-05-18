# This script installs the necessary dependencies on your computer so that you 
# can set up Postgres in a Docker container and run the backend on your machine.


echo "WARNING: This script requires root access to install dependencies."

read -p "Do you still want to continue? [Y/n] " yn

if [ $yn = "Y" ] || [ $yn = "y" ]; then
	sudo apt install gdal-bin libgdal-dev
	sudo apt install python3-gdal
	sudo apt install binutils libproj-dev
fi

read -p "Have you installed Docker? [Y/n] " yn

# This sets up the Postgres docker container.
if [ $yn = "Y" ] || [ $yn = "y" ]; then
	docker run --name=postgis -d -e POSTGRES_USER=user001 -e POSTGRES_PASS=123456789 -e POSTGRES_DBNAME=gis -p 5432:5432 kartoza/postgis:9.6-2.4
fi

