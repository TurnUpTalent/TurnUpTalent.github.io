// Chakra imports
import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    useColorModeValue,
} from "@chakra-ui/react";
import React from 'react';

import CheckTable from "views/admin/default/components/CheckTable";
import PieCard from "views/admin/default/components/PieCard";
import BarGraph from "./components/BarGraph";
import {
    columnsDataCheck,
    columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";

export default function UserReports() {

    return (
        <Box pt={{base: "130px", md: "80px", xl: "80px"}}>

            <SimpleGrid columns={{base: 1, md: 2, xl: 2}} gap='20px' mb='20px'>
                <PieCard title={'Categories of risk'}/>
                <BarGraph title={'Retention Score Graph'}/>
            </SimpleGrid>
            <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck}/>
        </Box>
    );
}
