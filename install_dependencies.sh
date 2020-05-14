# This script installs the necessary dependencies on your computer so that you 
# can set up Postgres in a Docker container and run the backend on your machine.


echo "WARNING: This script requires root access to install dependencies."
echo "Do you still want to continue? [Y/n]"
read yn
if [ $yn = "Y" ] || [ $yn = "y" ]; then
	sudo apt install gdal-bin libgdal-dev
	sudo apt install python3-gdal
	sudo apt install binutils libproj-dev
fi

