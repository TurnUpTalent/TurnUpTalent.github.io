
import {Box, Grid, SimpleGrid, GridItem} from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/profile/components/Banner";
import BarGraph from "./components/BarGraph";
import React from "react";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
// Assets
import banner from "assets/img/auth/banner.png";
import {lineChartDataTotalSpent, lineChartOptionsTotalSpent} from "../../../variables/charts";
import LineChart from "./components/LineChart";

export default function Profile(props) {
    let id = 1;
    if (typeof props.match.params.id === 'string' || props.match.params.id instanceof String)
    { id = 1;}
    else
    {id = props.match.params.id-1;}
    const name = tableDataCheck[id].name;
    const job = tableDataCheck[id].name;
    const department = tableDataCheck[id].department;
    const score = tableDataCheck[id].score;
    const xaxis = tableDataCheck[id].xaxis;
    const series = tableDataCheck[id].series;

    const images = require.context('assets/img/avatars', true);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
        <Grid
            h='200px'
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(5, 1fr)'
            gap='20px' mb='60px'
        >
            {/*<PieCard />*/}
            {/*<WeeklyRevenue />*/}
            {/*<div style="flex: 10;">*/}
            <GridItem rowSpan={2} colSpan={1} >
                <Banner
                    gridArea='1 / 1 / 2 / 2'
                    id = {id? id : '000000'}
                    banner={banner}
                    avatar={images(`./avatar${id}.png`)}
                    name= {name ? name : 'John Doe'}
                    job= {job ? job : 'Anonymous Job'}
                    department={department ? department : 'Anonymous Department'}
                    score={score ? score : '0'}
                />
            </GridItem>
            {/*</div>*/}
            <GridItem colSpan={4} rowSpan={3}>
                <LineChart
                    xaxis = {xaxis}
                    series = {series}
                    chartData={lineChartDataTotalSpent}
                    chartOptions={lineChartOptionsTotalSpent}
                />
            </GridItem>
        </Grid>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' >
            <BarGraph title={"Top 5 positive factors"} mt='20px'/>
            <BarGraph title={"Top 5 negative factors"} mt='10px'/>
        </SimpleGrid>
    </Box>
  );
}
