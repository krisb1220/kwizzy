# Kwizzy App

This is going to be a simple full-stack WYSIWYG quiz/form builder app. Will eventually be converted to React/Typescript, but that is not currently the priority. 

# Commit 2
Added significant front end functionality as well as some improvements to the way authentication and static files are  handled. 

NOTE: All front end work has instead been completed on the newly added "index.html" file to allow for live server / hot module reloading. I'm sure there's a better way I just don't know it. 
 
+ Added some WYSIWYG functionality. The homepage now has a small toolbar and form staging area that has simple input elements added through button presses.
+ Added "message" to response from `/signup` and `/login` that explains the result
+ Basic Post model created
+ Added `static` middleware
+ added `cors` middleware

## TODO
+ CORS leaniency
+ "Save form" button -- (save as raw html or array of element objects??)
+ Complete DB teardown and remodeling
+ Create more intutitive & practical database schema
+ Unit tests because retyping the same stuff for testing is getting on my nerves 
+ Add API key for database so that this can be used publicly without MongoDB Atlas getting upset with me
+ Add caching / sessions
+ Everything else

## Short-term goals:
+ Login & Auth
+ Ability to build a form with multiple input types (radio, checkboxes, short text, long text, etc)
+ A simple layout system
+ File upload 
+ "News feed" 
+ "Profile" page
+ Ability to submit forms 
+ Ability to view form submissions

## Goals
+ Convert frontend to React
+ Ensure proper security 
+ Custom colors?

## Current state
There are currently 3 endpoints -
+ `GET /`
+ `POST /SIGNUP`
+ `POST /LOGIN`

MongoDB instance on Atlas 