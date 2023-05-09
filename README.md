# netflix-clone
This application is a clone of netflix.
It is a mern application with admin ,server and client side to it.

# TECHNOLOGY 
REACT NODE EXPRESS MONGODB SASS JWT FIREBASE CRYPTOS
the app uses react for front side rendering ,
node and express  for server side rendering ,
mongodb as the database ,
sass(in client) for styling ,
JWT for user authentication,
FIREBASE storage for storing the file(movies,trailer).
CRYTPTOS for encryption and decrytpion.

# SERVER 
The server uses node, express. It also JWT(javascript web tokens) for user authentication.CRYPTOS for encrytion of password.
# LINK 
https://netflixclone-server-prince.onrender.com/

(NOTE: the server is deployed on render (free tier) and it goes offline after 15-30 min of activity.
SO we first start the server before running client and admin by clicking server link);
# apis available 
the server has api related to  users,movies and movie lists;
![Screenshot (73)](https://user-images.githubusercontent.com/115965811/237011844-cbb78852-1df7-485d-a143-b6321966c242.png)
![Screenshot (72)](https://user-images.githubusercontent.com/115965811/237011874-ded408df-e254-4eba-a16b-b764b7b14d89.png)
![Screenshot (75)](https://user-images.githubusercontent.com/115965811/237023259-f60662e7-3c1b-4d74-824f-8d8c17d41aa9.png)




## ADMIN 
The admin site is designed to maintain the database of the application.
through it we can perform various actions on our database like adding movies,users,list.
It also displays the stats data of the users and many other purposes.

# LINK 
https://netflixclone-admin-prince.onrender.com/

# USE 
To use the application first start the server(by clicking server link) then run the admin link.
to login,
 use the email address : dummyuser1234@gmail.com
password:12346;
https://![Screenshot (76)](https://user-images.githubusercontent.com/115965811/237015726-f31f0729-a644-4e21-8b7b-b9f50c36acaf.png)
Users are stored in local storage,if user is present then home else login 

(note: havent implemented sign up)
U can modify the user,movie and lists as u need with the admin site.
![Screenshot (77)](https://user-images.githubusercontent.com/115965811/237016159-59267baf-ac6b-4a51-a1fd-8388f590ee75.png)

# VIDEO LINK :

# Client 
The client part of the application uses react and has a server to process requests.
# LINK 
https://netflixclone-client-prince.onrender.com

# use
u can start by signing up then login with ur id;
we have home page movie page series page data for which is fetched from database,then we have watch page for viewing the movie we want to see.

# preview 



![Screenshot (78)](https://user-images.githubusercontent.com/115965811/237024758-761a7c62-e8c8-406c-a660-c4b0d0936630.png)


![Screenshot (79)](https://user-images.githubusercontent.com/115965811/237024767-0ee36e81-8277-4de0-aefe-02567948cd77.png)

![Screenshot (80)](https://user-images.githubusercontent.com/115965811/237024780-ffb98191-c70a-46fe-8b23-99321bcdcb10.png)

![Screenshot (81)](https://user-images.githubusercontent.com/115965811/237024802-ba89b394-f5e7-47af-bdae-aa3f5fa69ff4.png)


![Screenshot (82)](https://user-images.githubusercontent.com/115965811/237024814-901436fd-9662-4137-b252-7d46c1e4b88d.png)

## /api/ in code is wewritten as serverlink/api/
# Use on local host:
clone the repo
naviagate to each folder,
npm install 
npm start
add mongo url and cryptos secretkey in .env for server.
