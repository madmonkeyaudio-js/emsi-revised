import React from 'react'
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory'

function LinearGraph(props) {

    if (!props.data.nation) { 
        return <div><p>Content Unavailable</p></div>
    }
    
    let dateRange = [];
    let victoryData = [];

    let trends = [];

    if(props.yearRange) {
        dateRange = props.yearRange;

        trends.push(props.data.regional, props.data.state, props.data.nation)

        let populateChart = (dateRange, percData, chosenArray) => {
            for(let i = 0; i < dateRange.length; i++) {
                if(percData[i] !== "NaN"){
                    chosenArray.push({
                        x: dateRange[i],
                        y: parseInt(percData[i])
                    })
                } else {
                    chosenArray.push({
                        x: dateRange[i],
                        y: 8.5
                    })
                }
            }
        }
    }
    let trendData = trends.map((t, idx) => {
        return (
            <div key={idx} className="linear-grid-section">
                <div>
                    <h5>Region</h5>
                </div>
                <div className="trend-details">
                    <p>{t[0]}</p>
                    <p>{t[t.length -1]}</p>
                    <p>{t[t.length-1] - t[0]}</p>
                    <p>{(((t[t.length-1] - t[0])/(t[0]))*100).toFixed(2)}%</p>
                </div>
            </div>
        )
    })
    
    return (
        
        <div className="graph-container">
            <div className="regional-trend-graph">
                <div className="title">
                    <h3>Regional Trends</h3>
                </div>
                <VictoryChart
                    theme={VictoryTheme.material}
                    height={150}
                    width={250}
                    style={{
                        labels: {fontSize: 12}
                    }}>
                <VictoryLine
                    categories={{}}
                    style={{
                    data: { stroke: "#21f4e6" },
                    parent: { border: "1px solid #cbc"}
                    }}
                    data={[{x: '1', y:'2'}]}/>
                </VictoryChart>

            </div>
            <div className="linear-graph-compare">
                <div className="label">
                    <div className="linear-grid-section">
                        <h3>Region</h3>
                        <div className="trend-details">
                            <h3>2013 Jobs</h3>
                            <h3>2018 Jobs</h3>
                            <h3>Change</h3>
                            <h3>% Change</h3>
                        </div>
                    </div>
                    {trendData}
                </div>
            </div>
        </div>
    )
}

export default LinearGraph;