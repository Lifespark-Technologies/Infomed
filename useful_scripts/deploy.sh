cd frontend
npm run build # to ensure that we run webpack and create the minifed js file that is used in the HTML file
cd ..
cp infomed/example.env infomed/.env
python manage.py runserver
