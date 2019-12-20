import React, { Component } from 'react'
import axios from 'axios'
import LinearGraph from './Components/LinearGraph'
import BarGraph from './Components/BarGraph'
import Summary from './Components/Summary'

class Content extends Component {

    state = {
        occupation: [],
        region: {},
        summary: {},
        trendComparison: {
            endYear: '',
            startYear: '', 
            regional: [],
            state: [],
            nation: []
        },
        employingIndustries: {
            industries: [],
            jobs: '', 
            year: ''
        }, 
        yearRange: [], 
        trendArray: []
    }

    componentDidMount() {
        this.emsiRequest();
    }

    emsiRequest = () => {

        axios.get('http://www.mocky.io/v2/5a29b5672e00004a3ca09d33')
        .then(response => {
            let myData = response.data;

            let regionTrend = myData.trend_comparison.regional;
            let stateTrend = myData.trend_comparison.nation;
            let nationTrend = myData.trend_comparison.state;
            
            //Push into new array to send as a prop
            this.state.trendArray.push(regionTrend, stateTrend, nationTrend)
            
            this.setState({
                occupation: myData.occupation,
                region: myData.region,
                summary: myData.summary, 
                trendComparison: myData.trend_comparison, 
                employingIndustries: myData.employing_industries, 
            })
        })
        .catch(err => {
            console.log('There was an error in your request', err)
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.region !== this.state.region) {
            this.setState({
                region: this.state.region, 
                occupation: this.state.occupation,
                summary: this.state.summary, 
                trendComparison: this.state.trendComparison,
                employingIndustries: this.state.employingIndustries, 
                yearRange: this.state.yearRange,
                trendArray: this.state.trendArray
            })
        }
    }

    render() {
        return (
            <div>
                <header>
                    <h2>Occupation Overview</h2>
                    <p>{this.state.occupation.title} in {this.state.region.title}</p> 
                    <h4>Occupation Summary for {this.state.occupation.title}</h4>    
                </header>
                <Summary 
                    data={this.state.summary} 
                    title={this.state.occupation.title}/>
                <LinearGraph 
                    data={this.state.trendComparison}/>
                <BarGraph 
                    data={this.state.employingIndustries}
                    title={this.state.occupation.title}/>
            </div>
        )
    }
}

export default Content
