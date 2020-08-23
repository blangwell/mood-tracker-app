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

### On Setbacks
Next I imported Chartjs in order to test the API and familiarize myself with it. Here I ran into a big opportunity for learning. As someone familiar with Chartjs can tell you, Chartjs uses the DOM `document` property to access an HTML `canvas` element and generate the charts.
```js
var ctx = document.getElementById(elemId).getContext('2d')
```
But when I wrote this server-side in Nodejs, it was unsuccessful, logging that `document` was undefined. Because Node is server side logic, it has no access to the browser's document property. Instead of researching the error further (and learning how to simply access DOM elements from an ejs view) I panicked and flung myself into finding another API. 

This led me to Plotly. Plotly is a decent charting API, but for non-paying users, they have a call limit of 100 per day. I did not know this when I was getting started. I implemented plotly and generated beautiful sample charts. All was going well with the project. Then I hit the call limit. I knew that this would not be sustainable for a deployed web app, so I ended up back at Chartjs. _How could I perform DOM manipulation on the server side?_ With a little research, the solution was simple: use a `<script>` tags at the bottom of the EJS file and place the client-side Javascript there. This was an excellent learning opportunity. One shouldn't always panic and jump ship at the first sign of adversity. Furthermore, this situation highlighted the value of free and open source software. (Here, I'd like to take a moment to send a sincere thank you to the folks responsible for building and maintaining Chartjs.)

### Micro-sprint Two
The first order of business was to implement the Charjs API and to configure it to successfully chart information from the database. Here I learned a fun thing: passing variables from server-side logic into EJS templates and _then_ into client side javascript.
```js
// SERVER SIDE JS
// pass variables as an object while calling res.render()
res.render('track/index', {dates: dateArray, 
moods: moodObjectArray})
```
```js
// EJS
// access and manipulate variables in EJS
<% const getData = (metric, array) => {%>
    <% moods.forEach(m => { %>
        <% array.push(m[metric]) %>
    <% }) %>
<% } %>
...
<% getData('sleep', sleepArray) %>
```
```js
// CLIENT SIDE JS
// stringify EJS array value, use Regex to remove unwanted characters
// then split back into an array
let clientSleep = '<%- JSON.stringify(sleepArray) %>';
clientSleep = clientSleep.replace(/[\[\]"]+/g, '').split(',');
```
This took a while to get working, but once the server-side variables were being successfully passed into the client-side Javascript and the API was working, I was off and running. I decided to use a simple line graph and created a helper function to generate a chart for each mood metric.
```js
const buildChart = (elemId, data, label, borderRbg) => {
    var ctx = document.getElementById(elemId).getContext('2d')
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: clientDates,
            datasets: [{
                label: label,
                borderColor: borderRbg,
                data: data,
                spanGaps: true
            }]
            ...
        }
    }
...
```
### Micro-sprint Three
An important aspect of this user experience for this project was the ability to not create duplicate charts on the same days if the user wanted to update a day's chart. This involved a lot of digging in the Sequelize documentation and many trips over to StackOverflow. I was able to set up a conditional using the `update()` method and the Sequelize mixin `createMood()` to accomplish this.
```js
let filteredMoods = user.moods.filter(m => {
  return m.date == req.body.date
})

if (filteredMoods.length > 0) {
  filteredMoods[0].update(newMood)
  .then(updated => {
      res.redirect('/track')
  })
  .catch(err => {console.log(err)})

} else {
  user.createMood({ 
    date: req.body.date,
    elevated: req.body.elevated,
    depressed: req.body.depressed,
    irritable: req.body.irritable,
    anxious: req.body.anxious,
    sleep: req.body.sleep
  })
.then(relationInfo => {
    res.redirect('/track')  
  })
```
 I initially wanted to use `moment` to generate the last seven days and then sync the corresponding chart data with each separately generated `moment` date. After running into several issues with this and working at it with my instructors for the better part of two days, I instead decided to include only the dates where user has charted moods on the x axes of the graphs. To obtain the week view, I sorted the `moodObjectArray` by date and sliced the first seven items.
 ```js
 const compare = (a,b) => {
  let comparison = 0;
  if (a.date < b.date) {
      comparison = 1
  } else if (a.date > b.date) {
      comparison= -1;
  }
  return comparison
}

moodObjectArray.sort(compare)
moodObjectArray = moodObjectArray.slice(0, 7)
```
I then refactored the charting form with dropdown menus to prevent duplicate attribute entries (and to prevent database errors, an array is not an integer after all!) 

Finally it was time to clean up the code and add to the page styles. 

## Conclusion
Here it is. My first full-stack application, a real milestone in my software engineering career. I hope you find some use for it!