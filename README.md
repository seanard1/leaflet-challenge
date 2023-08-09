# leaflet-challenge
Module 15 challenge using leaflet and GeoJSON data

This challenge is live at: https://seanard1.github.io/leaflet-challenge/

## Premise/Introduction

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Summary

The webpage and javascript in this repository queries the API from the United States Geological Survey to return data of earthquakes in the past seven days.

These earthquakes are plotted on a map by the `logic.js` file, which displays them at their recorded location, places a marker relative the the magnitude of the quake and colours the marker based on the depth. 

Additionally, a dataset of tectonic plates created by Hugo Ahlenius, Nordpil and Peter Bird is included as a map layer to see the relationship between where plates meet and where earthquakes occur. 

Tectonic Plates Data: https://github.com/fraxen/tectonicplates

## Citations

This project required several methods, codes and functions outside the scope of class.

https://codepen.io/haakseth/pen/KQbjdO

- This was my main source for information pertaining to how to create the legend, including the css work required.

https://css-irl.info/working-with-color-scales-for-data-visualisation-in-d3/

https://www.d3indepth.com/scales/

- I used the above two websites to research how to manage the colour changing based on the depth. This was a significant hurdle. I ended up making a compromise on my goals based on the examples in the Module instructions. I didn't want to hard code the scale for the colours, but once I realized how the legend was structured in the example, I did settle for a scale that went only to 100-plus. 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

https://stackoverflow.com/questions/85116/display-date-time-in-users-locale-format-and-time-offset

https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary

- These three resources were used to style the marker popups.

https://github.com/leaflet-extras/leaflet-providers

- This is where I found additional tile layers to use for the map.

https://stackoverflow.com/questions/21391824/what-does-mean-in-the-parameters-of-a-for-loop-in-javascript

- This resource helped significantly cleanup my legend code.


