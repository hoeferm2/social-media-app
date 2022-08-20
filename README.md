# social-media-app

- Repo URL: https://github.com/hoeferm2/social-media-app
- Video Demonstration: https://drive.google.com/file/d/1zvnmywAYCJvFRjBEq-LA3Uugt1dh4zfz/view

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [APIs](#APIs)
- [Usage](#usage)
- [Credits](#credits)

## Description

This is a back end build for a social media site. This allows an for a userbase, commenting system and the ground work for a reaction to posts. Users can track, thoughts, friends, and reactions. 

## Installation

- Users should have Node JS installed
- This applicaiton uses express, mongoose, and moment.
- Users should run npm i to install the correct packages.
- For the back end build users can either go with mongodb://127.0.0.1:27017/socialDB or mongodb://localhost:27017/socialDB. This is located in the config file.
- There is no seed file so users can either input in insomnia or with the mongodb.

## APIs

- This API has three schemas. Users, thoughts, and reactions.
- Users are users.
- Thoughts function as posts are are attached to users.
- Reactions are comments on thoughts are are attached to them.
- There are friends but they do not have a schema and are simply an empty array at the start, attached to users.

## Usage

- GET PUT POST and DELETE routes allow for the retrival, editing, destruciton and adding of users, thoughts and reactions.

## Credits

- Many thanks to Rainer Dotulong for providing much needed advice on how to format this document. Thanks to Gabe Sowa for walking me through routes. 