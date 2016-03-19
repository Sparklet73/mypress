'use strict'

const Menu = require('../models/menu')
const User = require('../models/user')

exports.index = function (req, res, next) {
	const websiteName = req.app.get('websiteName')
	const logoString = req.app.get('logoString')
	const logoImage = req.app.get('logoImage')
	const logoLink = req.app.get('logoLink')
	const webTitle = req.app.get('webTitle')
	const webSubtitle = req.app.get('webSubtitle')
	const mainButtonString = req.app.get('mainButtonString')
	const mainButtonLink = req.app.get('mainButtonLink')
	const mainButtonTarget = req.app.get('mainButtonTarget')
	const template = req.app.get('template')
	const templateFile = template + '/index'

	// Define
	const MenuModel = Menu.bindKnex(req.app.get('db').normalDB)
	const UserModel = User.bindKnex(req.app.get('db').normalDB)
	let userList = []
	let menuList = []

	// Getting menu data
	MenuModel.query()
	.orderBy('order')
	.then(menus => {
		console.log('in menu')
		menus.forEach(menu => {
			menuList.push({
				name: menu.name,
				link: menu.link,
				target: menu.target,
			})
		})
		return UserModel.query().orderBy('first_name').orderBy('last_name')
	})
	.then(users => {
		console.log('in user')
		users.forEach(user => {
			userList.push({
				username: user.username,
				privilege: user.privilege,
				firstName: user.first_name,
				lastName: user.last_name,
				picture: user.picture,
				email: user.email,
				introduction: user.introduction,
				facebook: user.facebook,
				linkedin: user.linkedin,
				twitter: user.twitter,
				google: user.google,
				flickr: user.flickr
			})
		})
	})
	.catch(err => {
		next(err)
	})
	.finally(() => {
		console.log('in finally')
		const resp = {
			websiteName: websiteName,
			logoString: logoString,
			logoImage: logoImage,
			logoLink: logoLink,
			webTitle: webTitle,
			webSubtitle: webSubtitle,
			mainButtonString: mainButtonString,
			mainButtonLink: mainButtonLink,
			mainButtonTarget: mainButtonTarget,
			template: template,
			menuList: menuList,
			userList: userList
		}
		res.render(templateFile, resp)
	})
}
