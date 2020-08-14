# Mood tracker app

### Process
I started off by adding in authorization boilerplate that I had written for just such an occasion. In this instance, the authorization is handled with bcrypt, oAuth, express-session, and passport.

Then I initialized Sequelize and created the mood_tracker development, test, and production databases. I first created the user and mood models. User stores the user's name and authentication information, while Mood stores mood tracker entry data. 

Next I imported Chartjs in order to test the API and familiarize myself with it. 