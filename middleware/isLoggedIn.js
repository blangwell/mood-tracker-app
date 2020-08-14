// if a user logs out, but tries to access member content
// it will throw an error and prompt them to log in again
module.exports = (req, res, next) => {
    if (!req.user) {
        req.flash('Error!', 'You must be signed in to access this page')
        res.redirect('/auth/login')
    } else {
        next(); // let user go to requested page
    }
}
// check to see if user trying to access site is logged in or not