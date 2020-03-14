import React, { useEffect, useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios'
import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const [confirmed, setConfirmed] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [countrylist, setCountrylist] = useState([])
  const [selconfirmed, setselconfirmed] = useState(0)
  const [seldeath, setSeldeath] = useState(0)
  const [selrecoverd, setSelrecoverd] = useState(0)
  const [india, setIndia] = useState([])

  const [indiaconfirmed, setindiaconfirmed] = useState(0)
  const [indiadeath, setindiadeath] = useState(0)
  const [indiarecoverd, setindiarecoverd] = useState(0)




  const classes = useStyles();

  useEffect(() => {
    axios.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief')
      .then(res => {
        console.log("lljfdsjfldsjfl", res)
        setConfirmed(res.data.confirmed)
        setDeaths(res.data.deaths)
        setRecovered(res.data.recovered)
      }
      )
  }, [])

  useEffect(() => {
    axios.get('https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest')
      .then(res => {
        console.log("lljfdsjfldsjfl", res)
        setCountrylist(res.data)
        setIndia(res.data)
      }
      )
  }, [])

  const handleStateDropdown = (e) => {
    var strng = e.target.value;
    var arr = strng.split(',');
    setselconfirmed(arr[1])
    setSeldeath(arr[2])
    setSelrecoverd(arr[3])
  }

  setTimeout(() => {
    india.map((user => {
      if (user.countryregion === "India") {
        setindiaconfirmed(user.confirmed)
        setindiadeath(user.deaths)
        setindiarecoverd(user.recovered)
      }
    }))
  }, 1000);


  return (
    <div>
      <h3>World Wide</h3>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <h1 className={classes.cardCategory}>Confirmed</h1>
              <h3 className={classes.cardTitle}>
                {confirmed}
              </h3>
            </CardHeader>

          </Card>
        </GridItem>


        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Recovered</p>
              <h3 className={classes.cardTitle}>{recovered}</h3>
            </CardHeader>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Deaths</p>
              <h3 className={classes.cardTitle}>{deaths}</h3>
            </CardHeader>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Fatality rate
</p>
              <h3 className={classes.cardTitle}>{(deaths / confirmed * 100).toFixed(2)}</h3>
            </CardHeader>

          </Card>
        </GridItem>
      </GridContainer>
      <h3>India</h3>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <h1 className={classes.cardCategory}>Confirmed</h1>
              <h3 className={classes.cardTitle}>
                {indiaconfirmed}
              </h3>
            </CardHeader>

          </Card>
        </GridItem>


        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Recovered</p>
              <h3 className={classes.cardTitle}>{indiarecoverd}</h3>
            </CardHeader>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Deaths</p>
              <h3 className={classes.cardTitle}>{indiadeath}</h3>
            </CardHeader>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Fatality rate
</p>
              <h3 className={classes.cardTitle}>{(indiadeath / indiaconfirmed * 100).toFixed(2)}</h3>
            </CardHeader>

          </Card>
        </GridItem>
      </GridContainer>



      <GridContainer>
        <h3>Regional</h3>
        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <select name="EventTime" id="eventtime" className="form-control"
              onChange={(e) => handleStateDropdown(e)}
            >
              <option value='' selected>Select</option>
              {countrylist.length > 0 && countrylist.map(user => {
                let alok = user.countryregion + user.provincestate
                return (
                  <option value={[user.countryregion, user.confirmed, user.deaths, user.recovered]}>{alok}</option>
                )
              })}
            </select>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <h1 className={classes.cardCategory}>Confirmed</h1>
              <h3 className={classes.cardTitle}>
                {selconfirmed}
              </h3>
            </CardHeader>

          </Card>
        </GridItem>


        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Recovered</p>
              <h3 className={classes.cardTitle}>{selrecoverd}</h3>
            </CardHeader>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Deaths</p>
              <h3 className={classes.cardTitle}>{seldeath}</h3>
            </CardHeader>

          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Fatality rate
</p>
              <h3 className={classes.cardTitle}>{(seldeath / selconfirmed * 100).toFixed(2)}</h3>
            </CardHeader>

          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
