# Mood tracker app

## Technology
- Node.js
- Express
- EJS
- Sequelize
- Chartjs

## Process

### Planning
Before writing any code, I drafted an ERD and wireframes for the project.  

[ERD](https://drive.google.com/file/d/17K8AHv5uGz8-d9zegZ-SNLBP4y3vX8nt/view?usp=sharing)

[Wireframes](https://drive.google.com/file/d/18aWveG_Yp9A9CJqqFNHi3GROVF6yRJLD/view?usp=sharing)

Once I had a idea of what the app's pages and database would look like, I made a Kanban board via Trello to manage the project.

[Kanban Board](https://trello.com/b/noPdaTUX/mood-tracker-app)

### Getting to Work

I started off by adding in authorization boilerplate that I had written for just such an occasion. In this instance, the authorization is handled with bcrypt, oAuth, express-session, and passport.

Then I initialized Sequelize and created the mood_tracker development, test, and production databases. I first created the `user` and `mood` models. User stores the user's name and authentication information, while Mood stores mood tracker entry data. Then I joined them with a n:m association through `usersMoods`
```js

```
At this point I created `dbTest.js` and ran a few tests to see if the database was set up properly. It took some time to get my associations configured successfully. A bit of digging in the Sequelize docs and a little help from my colleagues uncovered an issue. I had forgotten the `through` value in the association!

```js
module.exports = (sequelize, DataTypes) => {
  class mood extends Model {
    static associate(models) {
      models.mood.belongsToMany(models.user, 
        {through: 'usersMoods', onDelete: 'CASCADE'})
```

Because the `mood` table takes a date field, I looked into generating dates via moment moment and tested to make sure the database would successfully accept its value. Moment ended up being unnecessary once I set up the tracking form, but it was very useful for testing. 

I then added some basic Bootstrap styles to the layout to make it easier to build the app with the finished product's aesthetic in mind.  

Next I created the `track` route along with the mood tracker form view. I initially used checkboxes for charting the mood values, which were ultimately changed to dropdowns to prevent database errors from multiple values for the same mood attribute. I used the html `<input type="date">` to allow the user to select which day to chart for. I did some testing to insure that this information would reliable translate to the database, which it did! 

Next I imported Chartjs in order to test the API and familiarize myself with it. Here I ran into a big opportunity for learning. As someone familiar with Chartjs can tell you, Chartjs uses the DOM `document` property to access an HTML `canvas` element and generate the charts.
```js
var ctx = document.getElementById(elemId).getContext('2d')
```
But when I wrote this server-side in Nodejs, it was unsuccessful, logging that `document` was undefined. Because Node is server side logic, it has no access to the browser's document property. Instead of researching the error further (and learning how to simply access DOM elements from an ejs view) I panicked and flung myself into finding another API. 

This led me to Plotly. Plotly is a decent charting API, but for non-paying users, they have a call limit of 100 per day. I did not know this when I was getting started. I implemented plotly and generated beautiful sample charts. All was going well with the project. Then I hit the call limit. I knew that this would not be sustainable for a deployed web app, so I ended up back at Chartjs. _How could I perform DOM manipulation on the server side?_ With a little research, the solution was simple: use a `<script>` tags at the bottom of the EJS file and place the client-side Javascript there. This was an excellent learning opportunity. One shouldn't always panic and jump ship at the first sign of adversity. Furthermore, this situation highlighted the value of free and open source software. (Here, I'd like to take a moment to send a sincere thank you to the folks responsible for building and maintaining Chartjs.)
