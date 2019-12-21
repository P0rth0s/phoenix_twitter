# Project 4
Harry Deffebach

# Run
Make sure Mnesia folder is deleted
Run with mix phx.server
Go to localhost:4000

# What works
Register
Delete - remove active session
Follow
Tweet
Mentions
Hashtags
Live Pushes for mentions and timeline

# Testing
I didnt have a chance to write tests for the new version of the project.
However tests can be viewed in the 4.1 project submission.
These tests will not pass here because of changes of certain map keys from atoms to string values.
Engine has also been removed and its functionality moved to the online_channel module.
However all functionality remains the same.

# Simulation
I didnt know how to convert my simulation from genserver to channels.
Simulation can be found in project 4.1 submission.
It includes "celebrity users" with more followers.
It automatically runs when program is ran.
Note: an error is printed despite program running
