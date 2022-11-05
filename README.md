# Code Style

## PUG
extends includes/layouts/layout.pug

block pages
  // Your PUG/HTML Code

## Components

## SCSS
- The colors and variables declared in /assets/css/variables.scss
- Divide css by pages, each page will have its own style which will be divided into / assets / css / pages (saved in folders)
- The components save in /assets/css/components (Save in folder)
- Css build by main.scss. So, when adding scss file, import scss file in main file

# Run Project
- npm install
- npm install -g gulp
- npm install -g yarn
- yarn install
- gulp dev (development)
- open any pug file(ctrl + s) ->  auto render pug to html
- open file main.scss(ctrl + s) ->  auto render file main.css
- gulp build (build production)

# View Project
-> dist/*.html
