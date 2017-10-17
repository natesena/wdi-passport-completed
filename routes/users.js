//user routes
const
	express = require('express'),
	passport = require('passport'),
	usersRouter = new express.Router()

usersRouter.route('/login')
	.get((req, res) => {
		res.render('login', {message: req.flash('loginMessage')})
	})

	// utilize our local-login strategy to log in
	.post(passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login'
	}))

usersRouter.route('/signup')
	.get((req, res) => {
		res.render('signup', {message: req.flash('signupMessage')})
	})

	// utilize our local-signup strategy to sign up
	.post(passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup'
	}))

usersRouter.get('/profile', isLoggedIn, (req, res) => {
	res.render('profile', {user: req.user})
})

usersRouter.get('/logout', (req, res) => {
	// destroy the session, redirect back home
	req.logout()
	res.redirect('/')
})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) return next()
	res.redirect('/')
}

module.exports = usersRouter