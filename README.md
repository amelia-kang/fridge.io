# FridgeIO Application

## Introduction
FridgeIO is a mobile app that helps users keep track of their food inventory at home. It is built with Angular with Ionic framework, and Firebase cloud database as backend.

## Prepare the environment
* For node modules, download from nodejs.org official site
* To install ionic, open command line, run `npm install -g ionic`; use `sudo` if necessary.
* Download the project on github into one folder. Note that github repo does not include node modules. You should include one folder that looks like node_modules in the project folder.

## Run the ionic project
* Open a CLI inside the project folder, run `ionic serve` to open the project in browser and go to inspect view to change screen dimensions. 
* Alternatively, run `ionic serve --lab` to run the project in mobile environemnt lab.

## Key features
* Tab to navigate to different pages + menu on the side.
* Login & Signup Authentication with Firebase Cloudstore.
* Space page to view all user's items. Items are in a sorted order in terms of their expiry dates.
* Search function on space page for users to search item names.
* Add-item page to add new item into user's collection.
* Shopping list (to be implemented) that can help users to navigate their shopping list and add those itmes into their inventory once purchased.
* Push notification (to be implemented): push notification will be sent to user's phone when an item is about to expire soon (1 day).
* Shared Fridge (to be implemented): one inventory collection can be accessed and modified by multiple users. 
