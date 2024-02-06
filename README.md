# Module 14 Belly Button Challenge
## Task
The task was to build an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogs the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Files:
[index.html](index.html)  
- The file provided to set up the web page.

[samples.json](samples.json)  
- A copy of the json data that is available on the external site, provided for reference.

[static/js/app.js](static/js/app.js)  
- Javascript file which:
  - uses the D3 library to read the data
  - plots a horizontal bar graph to display the top 10 OTUs found for each individual
  - plots a bubble chart of all the OTUs found for each individual
  - displays the individual's demographic data
  - updates the graphs and metadata when a new sample (new individual) is chosen from the drop down menu
