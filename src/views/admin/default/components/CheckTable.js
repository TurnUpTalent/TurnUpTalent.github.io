import React, {Fragment, useEffect, useMemo, useState} from "react";
import {
    Flex,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Select, Link as ChakraLink,
} from "@chakra-ui/react";
import {Link as RouterLink} from "react-router-dom";
import {useTable, useSortBy, useFilters, useExpanded, usePagination} from "react-table";
import Card from "components/card/Card";
import {DefaultColumnFilter, Filter, SelectColumnFilter} from "./filters";
import {Button, Col, Input, Row} from "reactstrap";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";

export default function CheckTable() {

    const [data, setData] = useState([]);
    useEffect(() => {
        const doFetch = async () => {
            const contacts = tableDataCheck;
            console.log(contacts);
            setData(contacts);
        };
        doFetch();
    }, []);

    const columns = useMemo(
        () => [
          {
            Header: 'Employee ID',
            accessor: 'id',
            // Create a new clickable Cell
            Cell: ({ value }) => (
              <ChakraLink as={RouterLink} to={`/admin/profile/${value}`}>
                {value}
              </ChakraLink>
            )
          },
          {
            Header: 'Name',
            accessor: 'name',
            // Create a new clickable Cell
            Cell: ({ row }) => (
              <ChakraLink as={RouterLink} to={`/admin/profile/${row.original.id}`}>
                {row.original.name}
              </ChakraLink>
            )
          },
          {
            Header: 'Department',
            accessor: 'department',
          },
          {
            Header: 'Retention Score',
            accessor: 'retention_score',
          },
          {
            Header: 'Expected Exit',
            accessor: 'register_date',
          },
          // Removed the 'more' column
        ],
        []
      );
    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        visibleColumns,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn: { Filter: DefaultColumnFilter },
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination
    );


    const generateSortingIndicator = (column) => {
        return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
    };

    const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));
    };

    const onChangeInInput = (event) => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        gotoPage(page);
    };


  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const handleRowClick = (row) => {

    }

    return (
        <Card direction="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Flex px="25px" justify="space-between" align="center">
            <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
              Employee Stats
            </Text>
          </Flex>
          <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={index}
                      borderColor={borderColor}
                      // Align the header text to the center
                      textAlign="center"
                    >
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                        // Align the table data to the center
                        textAlign="center"
                      >
                        {cell.render("Cell")}
                      </Td>
                    ))}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          {/* Pagination and other elements */}
        </Card>
      );
}
