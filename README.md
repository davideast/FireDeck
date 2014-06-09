FireDeck
=========

FireDeck is a realtime and interactive slide deck about Firebase and Angular, powered by Firebase and Angular.

If you're looking to give a presentation on Firebase and want to amaze the audience and leave them speechless, then look no further.

Installation
--------------
1. Get a blank Firebase. If you don't have a Firebase, go here and create a blank one.
2. Clone the repo
3. Install bower dependencies
> ```sh
$ bower install
```
4. Install npm dependencies
```sh
$ npm install
```
5. Change the constant url in the app.js file 
```js
  app.constant('FBURL', 'https://<your-firebase>.firebaseio.com/');
  app.constant('SLIDES', 'https://<your-firebase>.firebaseio.com/slides');
  app.constant('CURRENT', 'https://<your-firebase>.firebaseio.com/current');
  app.constant('CODEURL', 'https://<your-firebase>.firebaseio.com/code');
```
6. Build with Gulp.
```sh
$ gulp
```
7. Order the slides, press Ctrl-C to exit after the process has ended.
```sh
$ gulp order-slides
```
8. If you want to be the only person to control the slides, go into your Firebase dashboard, and click on the Simple Login Tab. Enable Email/Passsword Authentication. Add a user in the dashboard. If you do not want to be the only person controlling to the slides or for the slides to not change globally see **Appendix Slide Control**.
9. Run the app
> ```sh
$ gulp serve
```
10. If you created an account, go to /#/login and login with the account.
11. Go to the first slide, /#/slide/presentation-info and click through to make sure everything is running properly.
12. When you get to the code samples: data-in-out, ng-federer-facts, & federer-secret, you will need to add the beginning code samples. These samples are located in code/start. The file names match the corresponding slides. Copy and paste the code in. Press Ctrl-K (win) or Cmd-K (mac) to update the panel to the left.



License
----

MIT
