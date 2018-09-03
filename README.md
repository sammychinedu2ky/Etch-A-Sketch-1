## Etch-A-Sketch

### Overview
The purpose of this project is to create a rendition of the famous drawing toy, Etch-A-Sketch originally invented by Andre Cassagnes of France.  

> To view the page in browser, please click [here](https://tenglin2.github.io/Etch-A-Sketch/).

### Languages Used
- HTML
- CSS
- JavaScript

### Features
- Fully Functional Drawing Board with Mouse Movement
- Multi-Shading for All Color Boxes
- Expansive Toolbar for Drawing Options
  - Convenient Clear Button
  - Optional Change of Grid Size
  - Detailed Opacity Slider with Percentage Display
  - Erase Toggle to Erase Activated Boxes
  - Mono Toggle to Change Color between Random and Monochrome
- Useful Hover Triggers
- Aesthetic Background and Font Style
- Shadow Effect to Convey Z-Index

### What I Learned
Etch-A-Sketch was a very intensive and multi-faceted that required a lot of guess & check, creativity, and time. It is uncharacteristically heavy on the CSS compared to the JavaScript simply because of all the little gadgets and toggles that I had to style correctly.  

- Properly positioning a grid structure requires float and display inline-block styling to ensure it formats without excessive margins or padding.
- Creating a slider for the opacity level is done by manipulating the thumb and track. You set the min and max value and can create steps for track movement. Also, the slider is dependent on the cursor so it is absolutely necessary to specify this in styling.
- The toggle buttons are composed of a checkbox input and slider span all wrapped in label tags. It requires a baseline switch where the slider lies on, and the slider itself. It needs to have cursor pointer, absolute positioning, and transitions to make it functional and realistic.
- It is sometimes more useful to create an element in JavaScript rather than straight out in HTML.
- Wrapping everything into functions and calling them when appropriate is a cleaner way to code.
- forEach method when applied to a constant can manipulate all the elements of its children. Incredibly useful.
- When using rgba attributes, the actual values(numbers) inside the expression must be integers.
- String manipulation and bounding of rgba values.
- I learned how important arrow functions can be especially when used in unison with event listeners.
- Integrating the toggle buttons can be done by adding Boolean expressions to inspect when they are checked.

Overall a very educational, colorful, and enjoyable project.
