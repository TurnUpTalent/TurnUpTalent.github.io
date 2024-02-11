import {
    Flex,
    Table,
    Checkbox,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";


// TableContainer.js
import React from "react"
import { useTable } from "react-table"

export default function FilterTable(props) {
    const { columnsData, tableData } = props;

    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    return (
        // If you're curious what props we get as a result of calling our getter functions (getTableProps(), getRowProps())
        // Feel free to use console.log()  This will help you better understand how react table works underhood.
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                </tr>
            ))}
            </thead>

            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

// export default FilterTable

// export default function CheckTable(props) {
//     const { columnsData, tableData } = props;
//
//     const columns = useMemo(() => columnsData, [columnsData]);
//     const data = useMemo(() => tableData, [tableData]);
//
//     const tableInstance = useTable(
//         {
//             columns,
//             data,
//         },
//         useGlobalFilter,
//         useSortBy,
//         usePagination
//     );
//
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         page,
//         prepareRow,
//         initialState,
//     } = tableInstance;
//     initialState.pageSize = 11;
//
//     const textColor = useColorModeValue("secondaryGray.900", "white");
//     const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
//     return (
//         <Card
//             direction='column'
//             w='100%'
//             px='0px'
//             overflowX={{ sm: "scroll", lg: "hidden" }}>
//             <Flex px='25px' justify='space-between' mb='20px' align='center'>
//                 <Text
//                     color={textColor}
//                     fontSize='22px'
//                     fontWeight='700'
//                     lineHeight='100%'>
//                     Check Table
//                 </Text>
//                 <Menu />
//             </Flex>
//             <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
//                 <Thead>
//                     {headerGroups.map((headerGroup, index) => (
//                         <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
//                             {headerGroup.headers.map((column, index) => (
//                                 <Th
//                                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                                     pe='10px'
//                                     key={index}
//                                     borderColor={borderColor}>
//                                     <Flex
//                                         justify='space-between'
//                                         align='center'
//                                         fontSize={{ sm: "10px", lg: "12px" }}
//                                         color='gray.400'>
//                                         {column.render("Header")}
//                                     </Flex>
//                                 </Th>
//                             ))}
//                         </Tr>
//                     ))}
//                 </Thead>
//                 <Tbody {...getTableBodyProps()}>
//                     {page.map((row, index) => {
//                         prepareRow(row);
//                         return (
//                             <Tr {...row.getRowProps()} key={index}>
//                                 {row.cells.map((cell, index) => {
//                                     let data = "";
//                                     if (cell.column.Header === "NAME") {
//                                         data = (
//                                             <Flex align='center'>
//                                                 <Checkbox
//                                                     defaultChecked={cell.value[1]}
//                                                     colorScheme='brandScheme'
//                                                     me='10px'
//                                                 />
//                                                 <Text color={textColor} fontSize='sm' fontWeight='700'>
//                                                     {cell.value[0]}
//                                                 </Text>
//                                             </Flex>
//                                         );
//                                     } else if (cell.column.Header === "PROGRESS") {
//                                         data = (
//                                             <Flex align='center'>
//                                                 <Text
//                                                     me='10px'
//                                                     color={textColor}
//                                                     fontSize='sm'
//                                                     fontWeight='700'>
//                                                     {cell.value}%
//                                                 </Text>
//                                             </Flex>
//                                         );
//                                     } else if (cell.column.Header === "QUANTITY") {
//                                         data = (
//                                             <Text color={textColor} fontSize='sm' fontWeight='700'>
//                                                 {cell.value}
//                                             </Text>
//                                         );
//                                     } else if (cell.column.Header === "DATE") {
//                                         data = (
//                                             <Text color={textColor} fontSize='sm' fontWeight='700'>
//                                                 {cell.value}
//                                             </Text>
//                                         );
//                                     }
//                                     return (
//                                         <Td
//                                             {...cell.getCellProps()}
//                                             key={index}
//                                             fontSize={{ sm: "14px" }}
//                                             minW={{ sm: "150px", md: "200px", lg: "auto" }}
//                                             borderColor='transparent'>
//                                             {data}
//                                         </Td>
//                                     );
//                                 })}
//                             </Tr>
//                         );
//                     })}
//                 </Tbody>
//             </Table>
//         </Card>
//     );
// }
