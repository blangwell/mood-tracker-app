# Mood tracker app

### Technology
- Node.js
- Express
- Sequelize
- EJS

### Process
I started off by adding in authorization boilerplate that I had written for just such an occasion. In this instance, the authorization is handled with bcrypt, oAuth, express-session, and passport.

Then I initialized Sequelize and created the mood_tracker development, test, and production databases. I first created the user and mood models. User stores the user's name and authentication information, while Mood stores mood tracker entry data. 
I then created `dbTest.js` and ran a few tests to see if the database was set up properly. It took some time to get my associations configured successfully. A bit of digging in the Sequelize docs and a little help from my colleagues uncovered the issue. I had forgotten the `through` value in the association!

```js
module.exports = (sequelize, DataTypes) => {
  class mood extends Model {
    static associate(models) {
      // define association here
      models.mood.belongsToMany(models.user, 
        {through: 'usersMoods'})
    }
  };
```
Once that was fixed
Because the `mood` table takes a date field, I looked into generating a date via the deprecated `new Date()` method. I ran into an warning that these Date objects are not reliable across all browsers and now deprecated. That in mind, my lesson in `moment` came flooding back to me. I required moment and tested to make sure the database would successfully accept its value 

I then added some basic Bootstrap styles to the layout and  created the track route and its associated views.

Next I imported Chartjs in order to test the API and familiarize myself with it. 