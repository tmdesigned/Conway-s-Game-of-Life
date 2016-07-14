# Conway-s-Game-of-Life
Conway's Game of Life simulator using React and SASS
===
by Taylor Morgan

Purpose
---

This  app utilizes the React.js library and SASS to deliver a functioning life simulator. Developed in the 1970's, Conway's simulator is based on a 2 dimensional grid of squares. Each square can be thought of as a biological cell, a person living on land, etc. At each generation, each square either lives, dies, or comes to life based on its neighbors.

Living square:
* < 2 neighbors, die of underpopulation
* 2-3 neighbors, live
* > 3 neighbors, die of overpopulation

Dead Square:
* 3 neighbors exact, come to life from new birth

Users can add or remove rows and columns, click each square individually to set up their own pattern, or watch a predefined repeating pattern (i.e. "pulsar").

Webpack is used to automatically bundle both the .js and .scss files.

Demo
---
http://www.tmdesigned.com/examples/game_of_life/
