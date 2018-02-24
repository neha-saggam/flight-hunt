# flight-hunt
Allows user to search flights given origin and destination. Also, filters the list of flights based on price first and departure next.

## Manual Setup Prerequisites ##
1. NodeJS (npm version >= 3.10.8, node version >= 6.9.1)
	
	For CentOS7
  * yum install epel-release
  * yum install nodejs
	
	For Windows & Mac
	https://nodejs.org/en/download/
	
## Getting Started ##
Install node dependencies mentioned in package.json
   ~~~~
   cd flight-hunt
   npm install
   ~~~~

Run the app:
   ~~~~
   npm run start
   ~~~~	
   
Hit http://localhost:3000 to check if server is running.
Hit http://localhost:3000/searchFlights/{{origin}}/{{destination}}
For example: http://localhost:3000/searchFlights/LAX/LAS
To change the port you can edit the port property in sever.js file or set environment variable 'FLIGHT_HUNT_PORT' to required value.
