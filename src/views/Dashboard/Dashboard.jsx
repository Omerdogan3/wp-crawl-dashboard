import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

import {myWebsites, importedToday} from '../../myData/myWebsites';

import {
  optionsSales,
  dataSales,
  responsiveSales,
  legendSales,
} from "variables/Variables.jsx";

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-ticket text-danger" />}
                statsText="Account Type"
                statsValue="Free"
                statsIconText="Buy Premium"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-plus text-success" />}
                statsText="Imported Today"
                statsValue={importedToday}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Today"
              />
            </Col>
            <Col lg={4} sm={6}>
              <StatsCard
                bigIcon={<i className="fa pe-7s-browser text-info" />}
                statsText="Websites"
                statsValue={myWebsites.length}
                statsIcon={<i className="fa fa-plus" />}
                statsIconText="Add More Websites"
              />
            </Col>
          </Row>
          <Row>
            <Col md={7}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Activities"
                category="Imported Contents This Month"
                stats="Just Updated"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            

            <Col md={5}>
              <Card
                title="Do To List"
                category="Please handle with these problems to import content."
                stats="Everything Seems OKAY!"
                statsIcon="fa pe-7s-like2"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
