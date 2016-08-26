all:
	webpack
	cat headers dist/main.js > stash.user.js
	cp stash.user.js /home/yanick/.mozilla/firefox/dsbz8xob.default/gm_scripts/Ravelry_Stash_Labels/stash.user.js
