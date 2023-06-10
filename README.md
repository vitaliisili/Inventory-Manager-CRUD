To use this application in your system must be installed
docker and node js

Run local

1. clone project
```
git clone project
```
2. cd to project
3. create virtual environment
4. activate environment
5. run `pip install -r requirements.txt --upgrade`
6. run database `docker-compose -f docker-compose-local.yml up -d`
7. run server `uvicorn app.main:app -reload`
8. open new tab in terminal and run 
