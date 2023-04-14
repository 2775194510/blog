@echo off

rem Add all changes to Git staging area
git add .

rem Commit changes with a message
git commit -m "%1"

rem Push changes to remote repository
git push
