#!/bin/sh

echo "Waiting for MongoDB to start..."
./wait-for db-movies:27017 
./wait-for db-shows:27018 


echo "Starting the server..."
npm start 