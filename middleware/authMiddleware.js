const withAuth = (req, res, next) => {
    // Check if the session indicates the user is logged in
    if (!req.session.loggedIn) {
        // If the user is not logged in, redirect to the login page
        res.redirect('/login');
    } else {
        // If the user is logged in, proceed to the next middleware function
        next();
    }
};

module.exports = withAuth;
