## REQUIREMENTS
The R script needs to have the following packages and their dependencies:
* tidyverse
* openxlsx
* httr
* googlesheets4
* jsonlite

The script file needs the input files in the folder as base data.  
Since the dev.labhive.de has a password protection, please remember to use this (currently line 402)

## FUNCTION
It generates semi random users, for the Diagnostic centers, it uses our list from google docs.

## ISSUES
The skill sets, offers and requests are generated completely at random. This could be improved with more intelligent sampling functions.
Currently POSTing users with missing values for the non required fields leads to rejections

In case of questions, ask Tobi :-)

### Dockerfile
Philipp tried to run the script inside a Docker container but had no success yet.
