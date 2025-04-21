import React from 'react';
import ContentHeader from '../../components/share/ContentHeader';
import { Chart } from "react-google-charts";

const databar = [
  ["Year", "Sales", "Expenses"],
  ["2014", 1000, 400],
  ["2015", 1170, 460],
  ["2016", 660, 1120],
  ["2017", 1030, 540],
];

// Material chart options
const optionsbar = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales and Expenses over the Years",
  },
};

const dataline = [
  ["x", "dogs"],
  [0, 0],
  [1, 10],
  [2, 23],
  [3, 17],
  [4, 18],
  [5, 9],
  [6, 11],
  [7, 27],
  [8, 33],
  [9, 40],
  [10, 32],
  [11, 35],
];

const optionsline = {
  title: "Line Chart Example",
  hAxis: { title: "Time" },
  vAxis: { title: "Popularity" },
  legend: "none",
};

export const datapie = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7], // CSS-style declaration
];

export const optionspie = {
  title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false,
};

export const datascatter = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2008", 1030, 540],
  ["2009", 1000, 400],
  ["2010", 1170, 460],
  ["2011", 660, 1120],
  ["2012", 1030, 540],
];

export const optionsscatter = {
  title: "Company Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

const Dashboard = () => {

  return (
    <>
      <ContentHeader title="Dashboard" />

      <main className="dash-content">
        <div className="container-fluid">
          <h1 className="dash-title">Charts</h1>

          <div className="row">
            <div className="col-xl-6">
              <div className="card spur-card">
                <div className="card-header">
                  <div className="spur-card-icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <div className="spur-card-title"> Two bars </div>
                  <div className="spur-card-menu">
                    <div className="dropdown show">
                      <a className="spur-card-menu-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      </a>
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body spur-card-body-chart">
                  <canvas id="spurChartjsTwoBars"></canvas>
                  <Chart
                    // Note the usage of Bar and not BarChart for the material version
                    chartType="Bar"
                    data={databar}
                    options={optionsbar}
                  />

                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card spur-card">
                <div className="card-header">
                  <div className="spur-card-icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <div className="spur-card-title"> Line </div>
                  <div className="spur-card-menu">
                    <div className="dropdown show">
                      <a className="spur-card-menu-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      </a>
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body spur-card-body-chart">
                  <canvas id="spurChartjsLine"></canvas>

                  <Chart
                    chartType="LineChart"
                    //width="100%"
                    //height="400px"
                    data={dataline}
                    options={optionsline}
                  />

                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div className="card spur-card">
                <div className="card-header">
                  <div className="spur-card-icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <div className="spur-card-title"> Doughnut </div>
                  <div className="spur-card-menu">
                    <div className="dropdown show">
                      <a className="spur-card-menu-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      </a>
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body spur-card-body-chart">
                  <canvas id="spurChartjsDougnut"></canvas>
                  <Chart
                    chartType="PieChart"
                    //width="100%"
                    //height="400px"
                    data={datapie}
                    options={optionspie}
                  />

                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="card spur-card">
                <div className="card-header">
                  <div className="spur-card-icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <div className="spur-card-title"> Scatter Area </div>
                  <div className="spur-card-menu">
                    <div className="dropdown show">
                      <a className="spur-card-menu-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body spur-card-body-chart">
                  <canvas id="spurChartjsPolar"></canvas>
                  <Chart
                    chartType="ScatterChart"
                    //width="100%"
                    //height="100%"
                    data={datascatter}
                    options={optionsscatter}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>


    </>

  );

};

export default Dashboard;
