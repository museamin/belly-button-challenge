// Get the endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Define a global variable for the data
let jsonData;

// Fetch the JSON data and console log it
let data = d3.json(url).then(function(data) {

  // Copy all name IDs into a new array
  let names = data["names"]

  // Copy data into a global variable so data is available outside promise
  jsonData = data;

  // Populate the dropdown menu with the name IDs
  for (let ID in names) {
    let option = document.createElement("option");
    option.setAttribute('value', names[ID]);
    let optionText = document.createTextNode(names[ID]);
    option.appendChild(optionText);
    selDataset.appendChild(option);
  }

  // Replace the ; with <br> so that the hovertext is more readable on graphs 
  for (let i=0;i<data.samples.length;i++){
    for (let j=0;j<data.samples[i].sample_values.length;j++){
      data.samples[i].otu_labels[j] = data.samples[i].otu_labels[j].replaceAll(';','<br>')  
    }  
  }  

  // Populate the charts and the meta data panel with the first set of data  
  populateMetadata(data.metadata[0]);
  plotBarChart(data.samples[0]);
  plotBubbleChart(data.samples[0]);
  
  return data;
});


function plotBarChart(data){  
  // Add OTU to each name ID string for display on the chart 
  var otu_ids_str = data.otu_ids.map(i => "OTU " + i)
  
  // Display the first 10 results on a horizontal bar graph
  // with sample values on the x axis and IDS on the y axis
  let trace1 = {
    x: data.sample_values.slice(0,10),
    y: otu_ids_str.slice(0,10),
    text: data.otu_labels.slice(0,10),
    name: "Graph",
    type: "bar",
    orientation: "h",
    transforms: [{
      type: 'sort',
      target: 'y',
      order: 'descending'
    }],
  };
  // Adjust the position of the bar graph so that it is level with 
  // top of the selection panel.
  let layout = {
    margin: {
      l: 100,
      r: 100,
      t: 0,
      b: 100
    },
    yaxis: {
      title: {
        text: 'OTU ID'
      },
    },
    xaxis: {
      title: {
        text: 'Sample Values'
      },
    },  
  };
  // Plot the bar chart
  let dataPlotBar = [trace1];
  Plotly.newPlot("bar", dataPlotBar, layout, {displayModeBar: false}); 
}


function plotBubbleChart(data){
  // Set the properties for the bubble plot
  // Make marker size smaller using the function markerSize defined below
  var trace1 = {
    x: data.otu_ids,
    y: data.sample_values,
    mode: 'markers',
    marker: {
      color: data.otu_ids,
      size: data.sample_values.map(value=>value*0.6)
    },
    text: data.otu_labels
  };
  let layout = {
    xaxis: {
      title: {
        text: 'OTU ID'
      },
    },
    yaxis: {
      title: {
        text: 'Sample Values'
      },
    },
  }    
// Plot the bubble chart
var dataPlotBubble = [trace1];
Plotly.newPlot('bubble', dataPlotBubble,layout);
}


// function to populate the meta data panel
function populateMetadata(data){
  // select the meta data side panel
  metadataPanel = d3.select("#sample-metadata");
  // clear the panel otherwise the data is appended to previous data
  metadataPanel.html("");
  // Get the keys and values of the meta data
  let  key = Object.keys(data);
  let value = Object.values(data);
  
  // Write each key-value pair to the panel 
  for (let i=0;i<key.length;i++){
    metadataPanel.append('h6').text(`${key[i]}: ${value[i]}`);
  } 
}


// This function is called when a dropdown menu item is selected
function optionChanged(datasetID) {
  // match the returned ID from the event listener to the ID in the global jsonData
  // for both the metadata and the sample data  
  const metadata = jsonData.metadata.find(obj => obj.id.toString() === datasetID);
  const sampledata = jsonData.samples.find(obj => obj.id.toString() === datasetID);
  // call the functions to update the meta data panel and the charts
  populateMetadata(metadata);
  plotBarChart(sampledata);
  plotBubbleChart(sampledata);
}







  