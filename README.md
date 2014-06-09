FireDeck
=========

FireDeck is a realtime and interactive slide deck about Firebase and Angular, powered by Firebase and Angular.

If you're looking to give a presentation on Firebase and want to amaze the audience and leave them speechless, then look no further.

Installation
--------------
1) Get a blank Firebase. If you don't have a Firebase, go here and create a blank one.

2) Clone the repo

3) Install bower dependencies

```sh
$ bower install
```
4) Install npm dependencies

```sh
$ npm install
```

5) Change the constant url in the app.js file

```js
  app.constant('FBURL', 'https://<your-firebase>.firebaseio.com/');
  app.constant('SLIDES', 'https://<your-firebase>.firebaseio.com/slides');
  app.constant('CURRENT', 'https://<your-firebase>.firebaseio.com/current');
  app.constant('CODEURL', 'https://<your-firebase>.firebaseio.com/code');
```

6) Build with Gulp.

```sh
$ gulp
```

7) Order the slides, press Ctrl-C to exit after the process has ended.

```sh
$ gulp order-slides
```

8) If you want to be the only person to control the slides, go into your Firebase dashboard, and click on the Simple Login Tab. Enable Email/Passsword Authentication. Add a user in the dashboard. If you do not want to be the only person controlling to the slides or for the slides to not change globally see **Appendix > Slide Control**.

9) Run the app
```sh
$ gulp serve
```

10) If you created an account, go to /#/login and login with the account.

11) Go to the first slide, /#/slide/presentation-info and click through to make sure everything is running properly.

12) Go to the code samples: data-in-out, ng-federer-facts, & federer-secret. You will need to add the beginning code samples. These samples are located in code/start. The file names match the corresponding slides. Copy and paste the code in. Press Ctrl-K (win) or Cmd-K (mac) to update the panel to the left.

13) The final result of the code samples are in the final folder with the associated names.

14) If you run into any problems you can contact david@firebase.com.


Appendix
----

####Slide Control
Slide control is made up of two nodes, **order** and **order-index**. Order is a set of numerical keys that correspond to the order of the slides. The value is the name of the slide less the .html exstention. Order-index is the same information, but in reverse. This will make it easier to know what the numerical order of a slide is when a URL request comes in.

####Adding your own slides
To add your own slides you just need to insert it and adjust the other slides to the proper order. To make this task easier, there is a gulp process that will reorder all of the slides for you. You just need to provider an array of slide names in order and the process will provide the correct order.

####Adding your own code slides
Code slides are a bit different then regular slides. To get code slides working you need to create a HTML file under the slides directory. See the examples below to set up firepad and the iframe. Then you must create the page that the iframe renders out to. This must be placed in the code directory. If you're using Angular, it is complicated to rebootstrap an Angular app. To make it easier, the code is loaded into the frame which makes a call out to an Angular template and then compiles your Angular code using that template. This is done through a helper function called ngHack. The entire process is demonstrated below. This is the current process, but another version is planned to greatly simplify things.

**Example**

*slides/your-slide-name.html*
```html
<fire-pad location="your-slide-name" auth="auth"></fire-pad>
  <div id="render-container">

    <iframe id="your-slide-name-frame"
            class="render-frame"
            ng-src="/code/your-slide-name.html">
    </iframe>

  </div>
```
*code/your-slide-name.html*
```html
<html>
  <head>
    <title>Rendering in an iframe</title>
    <!--
        Whatever CSS assets you need for your code example go here
    -->
  </head>
  <body>

    <!--
        If using Angular, don't add any html here
    -->

    <script src="/bower_components/firebase/firebase.js"></script>
    <script src="/bower_components/angular/angular.js"></script>
    <script src="/bower_components/angularfire/angularfire.js"></script>
    <script src="ngHack.js"></script>
    <script>
        (function() {

          window.ngHack({
            fbUrl: 'https://<your-firebase>.firebaseio.com/code/<your-slide-name>/post',
            moduleName: 'YourModuleName',
            templateUrl: '/code/views/<your-slide-name>.html'
          });

      }());
    </script>
  </body>
```
*code/views/your-slide-name.html*
```html
<!--
    Your custom Angular templates go here
-->
```
License
----

MIT
