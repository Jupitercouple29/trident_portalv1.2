# Phalanx Trident Portal v1.2
Phalanx Trident Portal is an web application that allows users to monitor their network traffic. Once the user is logged in to the portal 
it will gather all of the data that pertains to the client based on login credentials. The portal allows the user to see all of their 
network traffic and can also be as granular as to see traffic of individual ip's. Most of the details on the portal's site are clickable 
that allows the user to drill down into that particular item. There is also a feature at the top of the page that allows the user to search
their network traffic by date. If the user has more than one trident, there is an option in the sidebar to see traffic from each trident 
individually. 

Installing
-
```
cd /
rm -rf /portal
git clone https://github.com/mjohnson-phx/trident_portalv1.2.git portal
```

Deployment
-
```
cd portal/api
yarn start
cd portal/app
yarn prod
```
Built With
-
- Node.js
- React.js
- Express.js
- Webpack
