all:
	webpack
	cat headers dist/main.js > dist/ravelry-stash-label.user.js
