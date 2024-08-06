# Kwizzy App

This is going to be a simple full-stack WYSIWYG quiz/form builder app. Will eventually be converted to React/Typescript, but that is not currently the priority. 

## TODO
+ CORS leaniency
+ "Save form" button -- (save as raw html or array of element objects??) ✅
+ Complete DB teardown and remodeling
+ Create more intutitive & practical database schema
+ Unit tests because retyping the same stuff for testing is getting on my nerves 
+ Add API key for database so that this can be used publicly without MongoDB Atlas getting upset with me
+ Add caching / sessions ✅
+ Everything else
+ Remove glitch files?? maybe?? 

## Short-term goals:
+ Login & Auth ✅
+ Ability to build a form with multiple input types (radio, checkboxes, short text, long text, etc) ✅
+ A simple layout system (kinda done) ✅
+ File upload 
+ "News feed" 
+ "Profile" page
+ Ability to submit forms 
+ Ability to view form submissions

## Goals
+ Convert frontend to React
+ Ensure proper security --- (kinda did? idk im not an expert)
+ Custom color schemes for users?

## Current state
There are currently 3 endpoints -
+ `GET /` - main app
+ `POST /SIGNUP` - adds a new user to the database
+ `POST /LOGIN` - logs in an existing user
+ `POST /entries` - Lookup list of entries or add a new one. `?action=lookup` and `?action=save` respectively
+ `GET /auth-status` - either responds with the `user` object or `"not authenticated"`



# Commit 5
+ I think auth works now? Moved login login to strategies/local-strategy. 
+ Removed `/authenticate`
+ Login no longer requires `/` and `/authenticate`, all is on `/`
+ No logout yet
+ Front end broken lol

# Commit 5
+ Saving a version that mostly works before I start messing with the sessions and routes

# Commit 4
+ Added `POST /entries` endpoint. Either returns all posts or adds a new post and returns all posts.
+ User data will be shared with front-end on login now. 
+ User can see a list of the kwizzys they have created
+ User can save a kwizzy
+ User data is temporarily stored in the DOM to allow functionalities. Will eventually make it as a cookie.
+ Next: Sessions

# Commit 2/3ish
Added significant front end functionality as well as some improvements to the way authentication and static files are  handled. 

NOTE: All front end work has instead been completed on the newly added "index.html" file to allow for live server / hot module reloading. I'm sure there's a better way I just don't know it. 
 
+ Added some WYSIWYG functionality. The homepage now has a small toolbar and form staging area that has simple input elements added through button presses.
+ Added "message" to response from `/signup` and `/login` that explains the result
+ Basic `Post` model created
+ Added `static` middleware
+ added `cors` middleware
MongoDB instance on Atlas 