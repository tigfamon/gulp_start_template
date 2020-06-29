# Tutorial
Start template for projects that uses https://gulpjs.com/

### Features
* File include - you can use component approach in work
* Scss - write css styles using SCSS
* Using npm - install all dependencies via npm
* BrowserSync - hot reload your pages after changes

### Quick start
1. You will need to install globally npm on your machine. Please, see this [link](https://nodejs.org/en/)
2. After npm install, you will need to install globally gulp-cli on your machine. Please, run in your terminal or see this [link](https://gulpjs.com/docs/en/getting-started/quick-start)
```
npm install --global gulp-cli
```

### Usage gulp
Start your local server for development:
```
gulp
```
Build your project for production server:
```
gulp build
```

### File include
To use components, in html it is necessary to use the following:
```html
<body>
  @@include('header.html')
</body>
```
where header.html - your component in src/components

### Add dependency
For example, you want to use jquery [Slick slider](https://kenwheeler.github.io/slick/) plugin. You need to follow these steps:
1. Install plugin via npm:
```
npm i slick-carousel
```
2. Add js from this plugin in gulpfile.js:
```javascript
vendor_js: ['node_modules/jquery/dist/jquery.min.js', 'node_modules/select2/dist/js/select2.full.min.js']
```
3. Add styles from this plugin in gulpfile.js
```javascript
vendor_css: ['node_modules/normalize.css/normalize.css', 'node_modules/slick-carousel/slick/slick.css']
```
4. Restart your development server. After that you can use slick slider in your project.
