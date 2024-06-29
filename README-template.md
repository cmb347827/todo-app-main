# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![screenshot](./images/screenshot.PNG "screenshot")

### Links

- Solution URL: [Github]()
- Live Site URL: [Live Github]()

## My process

### Built with

- Semantic HTML5 markup
- Sass/SCSS
- Bootstrap
- jQuery/Javascript
- Mobile-first workflow


### What I learned
  - Had the purple background set for the main element at first, but I could not get that to look right as it kept growing with the form content. When I changed it to apply to the header element it worked.
  -I fulfilled all requirements , including the bonus. I also added an error message when a user tries to add a blank task, as well as the ability to save updated tasks that are already in the list, also number of 'items left' gets updated when a user checks/unchecks a task, also completed tasks strike through immediately.
  -for the checkbox tickmark I could apply a stackoverflow post (see link)
  - The use of js filter()
  - Amazon tutorial project helped with localStorage use
  - At first I had to use JS to add the striked out text for completed tasks (see WhichStyle code in updatetaskcontainer and textarea code in setRemoveChecked ), but figured out how to do this using SCSS only (lines 70-80)
  - I needed to apply the gradient border for the `input[type='checkbox']` on hover, and remembered that I used this before in a previous project.
    I could use the same technique here.


### Continued development

- Daily tutorials and projects in HTML5, CSS3, Javascript, Bootstrap, Sass/SCSS. For now, in time I will go re-learn React ect.

### Useful resources
[how to make checkboxes round](https://stackoverflow.com/questions/29617200/how-to-make-checkboxes-rounded)
[gradient borders](https://codyhouse.co/nuggets/css-gradient-borders)


## Author

- Website - [One of my latest codepens](https://codepen.io/cynthiab72/pen/oNybYON)
- Frontend Mentor - [@cmb347827](https://www.frontendmentor.io/profile/cmb347827)

