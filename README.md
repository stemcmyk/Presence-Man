# PrecenseMan
This is very work in progres. 
Tho, it does work with storing user presence and such

**GUIDE:** 

- First of all you should run:
  ``npm i``  or ``yarn`` (if you have yarn installed) inside a terminal in the "Presence-Man" folder.
  When you've done that, make a copy of the .env-pre and rename the copy to ".env".
- Inside that you should add your standard bot token under the CLIENT_TOKEN variable  
  Then you can change the prefix to whatever you want, default is "-" because it is unique I guess?
- Then you have to setup a mongodb database with a database called "Main" and inside the database you should have a collection called "users"
  If you do not know how to do this, please google it. 
   
  When you've done that, press 

![image](https://user-images.githubusercontent.com/51480428/114258864-fa322a80-99c9-11eb-9d0d-53fb686eed76.png)
![image](https://user-images.githubusercontent.com/51480428/114258881-29489c00-99ca-11eb-881b-e755b84c53e9.png)

Then copy the text below and paste it into anywhere: 

![image](https://user-images.githubusercontent.com/51480428/114258894-3cf40280-99ca-11eb-8525-b6913c8615f9.png)

Then change the "myFirstDatabase" to Main.
Also change the "< password >" to your password.
Then paste that entire sting inside of "CONNECTION_STRING" inside the .env file.
  
  
**You should now be ready to start the bot.**

**Starting the bot**

Personally I recommend using Nodemon for running the bot, if you do not have Nodemon installed run
``npm i -g nodemon`` or ``yarn add global nodemon`` (if you have yarn installed)

when that has installed, run "nodemon" inside the terminal. 
and the bot should be started.




-- Other things.

- If you want to change the interval of saving the user time, change the variable "localInterval" to something else. I'd recommend having it above 5 seconds for both performance and to avoid issues with MongoDB 
