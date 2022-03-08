import React from 'react';

// Date Range Picker: https://github.com/hypeserver/react-date-range
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState } from 'react';

// Import the Chart component from "react-apexcharts", which is what we will
// be using to render our heatmap.
// Source: https://www.npmjs.com/package/react-apexcharts
// Documantation: https://apexcharts.com/react-chart-demos/heatmap-charts/basic/
import Chart from "react-apexcharts";

// Generates the series Array object containing the click data we will display
// on heatmap according to ApexCharts specifications.
function generateSeries(row, inputData) {
    // type row: int
    // type inputData: Array(Array()) -> essentially a 2D matrix.
    // return: Array containing dictionary objects of the following shape:
    //              {
    //                  name: "",
    //                  data: [],
    //              }
    
    // Each "series" is an array of dictionaries containing a name and data.
    // name - String denoting the name of series.
    // data - Array of elements representing that data.
    const series = [];

    for (let i = 0; i < row; i++) {
        // The name of the series will be the row number of the board.
        const name = String(i);
        
        const seriesDictionary = {
            name: name,
            data: inputData[i]   // inputData is a 2D matrix, so we just need to copy the rows.
        }

        // Add dictionary to series
        series.push(seriesDictionary);
    }

    // We need to reverse the elements in the series array, as the top row of the board
    // is "0" and the bottom row of the board is "row - 1".
    series.reverse();

    // Finally, return the series
    return series
}

// HeatmapChart is our heatmap component.
function HeatmapChart(props) {
    // props inputs:
    // props.heatmapData: JSON string representing a JSON array.

    // Chart Options
    const heatmapHeight = 600; // Specifies the height of the heatmap
    const heatmapWidth = "100%"; // Specifies the width of the heatmap
    const row = 50;
    const col = 50;

    // In its raw form, the heatmap data is in the form of a JSON string.
    // Because we are using a date range to collect the heatmap data from
    // firebase, there may be times where the date range does not produce any
    // heatmap data (i.e. no clicks occurred in that range), so we get back an
    // empty string.
    let dataSeries = null;
    if (props.heatmapData.length === 0)
    {
        // If the heatmap data is an empty string, then we will fill the
        // heatmap with an 2D matrix of zeros.
        const empty_array = Array(row).fill().map(()=>Array(col).fill(0));
        dataSeries = generateSeries(row, empty_array);
    }
    else
    {
        // Else, we parse props.heatmapData into a JavaScript Array, and
        // generate our series with it.
        dataSeries = generateSeries(row, JSON.parse(props.heatmapData));
    }

    // JSON string that defines the FORMATTING of the heatmap
    // Docs: https://apexcharts.com/docs/options/chart/type/
    const heatmapOptions = {
        dataLabels: {
            enabled: false
        },
        colors: ["#008FFB"],
        xaxis: {
            labels: {
                show: false     // Don't really see a point in showing coordinates.
            }
        },
        yaxis: {
            labels: {
                show: false     // Don't really see a point in showing coordinates.
            }
        },
        grid: {
            show: true,
            xaxis: {
                lines: {
                    show: true
                }
            },   
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    ranges: [{
                        from: 0,
                        to: 0,
                        color: '#ff0000',
                        name: 'CELLS W/ NO CLICKS'
                    }]
                }
            }
        }
    }

    // Define state of heatmap and display information.
    const state = {
        series: dataSeries,
        options: heatmapOptions
    };

    return (
        <div id="chart">
            <Chart
                options={state.options}
                series={state.series}
                type="heatmap"
                height={heatmapHeight}
                width={heatmapWidth}
            />
        </div>
    );
}

// Heatmap is our component that renders the overall heatmap page.
function Heatmap(props) {
    // dateRange (with its useState) is used to capture the date range input
    // from user.
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    // clickData (with its useState) is used to store the JSON string retrieved
    // by our backend API.
    const [heatmapData, setHeatmapData] = useState("");

    // updateHeatmapData(), when called, updates the stored date range to the
    // range that the user specifies, and updates the heatmap data to be that
    // from the newly specified range.
    const updateHeatmapData = (item) => {
        setDateRange([item.selection]);

        const start = item.selection.startDate.getTime();
        const end = item.selection.endDate.getTime();
        fetch('http://localhost:3001/heatmap', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                start: start,
                end: end
            })
        }).then((data) => data.json())
            .then((json) => {
                // console.log(json);
                setHeatmapData(json);
            })
            .catch((error) => console.log("Error: " + error));
    };

    return (
        <div>
            <div style={{ width: "100%", display: "table" }}>
                <div style={{ display: "table-row" }}>
                    <div id="datePicker" style={{ width: "250px", display: "table-cell", verticalAlign: "top" }}>
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => updateHeatmapData(item)}
                            moveRangeOnFirstSelection={true}
                            ranges={dateRange}
                        />
                    </div>
                    <div id="heatmap" style={{ display: "table-cell" }}>
                        <HeatmapChart
                            heatmapData={heatmapData}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Heatmap
