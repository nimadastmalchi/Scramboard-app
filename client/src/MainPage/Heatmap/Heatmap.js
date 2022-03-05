import React from 'react';

// Date Range Picker: https://github.com/hypeserver/react-date-range
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { useState } from 'react';

// This seems like a promising heatmap for our purposes.
// https://apexcharts.com/react-chart-demos/heatmap-charts/basic/
//
// NPM page: https://www.npmjs.com/package/react-apexcharts
import Chart from "react-apexcharts";

class HeatmapChart extends React.Component {
    constructor(props) {
        super(props);
        
        // Generates random data to display on the heatmap.
        // Eventually, we would want to replace this with some function
        // that would get the number of clicks per square.
        this.generateData = function (numItems, range) {
            const result = []
            const MIN = range.min;
            const MAX = range.max;

            for (let i = 0; i < numItems; i++) {
                const num = Math.random() * (MAX - MIN) + MIN;
                result.push(num);
            }

            return result;
        }

        // Generates series to populate heatmap.
        this.generateSeries = function (row, col) {

            // Each "series" is an array of JSON strings containing a name and data.
            // name - String denoting the name of series.
            // data - Array of elements representing that data.
            const series = []

            for (let i = 0; i < row; i++) {
                // The name of the series will be the row number of the board.
                const name = String(i);

                // The data will be the number of clicks that occurred in each column.
                // LENGTH OF DATA should be the same as "col"
                const data = this.generateData(col, { min: 0, max: 100 });

                // Create our JSON string
                const jsonString = {
                    name: name,
                    data: data
                }

                // Add JSON string to Series
                series.push(jsonString);
            }

            // We need to reverse the elements in the series array, as the top row of the board
            // is "0" and the bottom row of the board is "row - 1".
            series.reverse();

            // Finally, return the series
            return series
        }

        // JSON string that defines the FORMATTING of the heatmap
        // Docs: https://apexcharts.com/docs/options/chart/type/
        this.heatmapOptions = {
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
            title: {
                text: 'Board Heatmap'
            },
        }
        this.heatmapHeight = 600; // Specifies the height of the heatmap
        this.heatmapWidth = "100%"; // Specifies the width of the heatmap

        // Define the state of the heatmap to display information.
        this.state = {
            series: this.generateSeries(10, 10),
            options: this.heatmapOptions
        };
    }

    render() {
        return (
            <div id="chart">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="heatmap"
                    height={this.heatmapHeight}
                    width={this.heatmapWidth}
                />
            </div>
        );
    }
}

// Functional component that is used to render the overall heatmap page.
function Heatmap(props) {

    // Define a use state that will be used to get the dates.
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }

         
    ]);

    return (
        <div style={{ width: "100%", display: "table" }}>
            <div style={{ display: "table-row" }}>
                <div id="datePicker" style={{ width: "250px", display: "table-cell" }}>
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setDateRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                    />
                </div>
                <div id="heatmap" style={{ display: "table-cell" }}>
                    <HeatmapChart startDate={dateRange.startDate} endDate={dateRange.endDate}/>
                </div>
            </div>
        </div>
    );
}

export default Heatmap