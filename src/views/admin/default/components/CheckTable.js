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
import {useTable, useSortBy, useFilters, useExpanded, usePagination, useGlobalFilter} from "react-table";
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
            Cell: ({ row }) => (
                <ChakraLink as={RouterLink} to={`/admin/profile/${row.original.id}`}>
                  {row.original.department}
                </ChakraLink>
            )
          },
          {
            Header: 'Retention Score',
            accessor: 'retention_score',
            Cell: ({ row }) => (
                <ChakraLink as={RouterLink} to={`/admin/profile/${row.original.id}`}>
                  {row.original.retention_score}
                </ChakraLink>
            )
          },
          {
            Header: 'Expected Exit',
            accessor: 'register_date',
            Cell: ({ row }) => (
                <ChakraLink as={RouterLink} to={`/admin/profile/${row.original.id}`}>
                  {row.original.register_date}
                </ChakraLink>
            )
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
        setGlobalFilter, // Add this to destructure setGlobalFilter from table instance
        state: { pageIndex, pageSize, globalFilter }, // Destructure globalFilter from state
      } = useTable(
        {
          columns,
          data,
          initialState: { pageIndex: 0, pageSize: 10 },
        },
        useFilters,
        useGlobalFilter, // Add this
        useSortBy,
        useExpanded,
        usePagination
      );

      const [filterInput, setFilterInput] = useState("");

      const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setGlobalFilter(value);
        setFilterInput(value);
      };


  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const handleRowClick = (row) => {

    }

    return (
        <Card direction="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
          <Flex px="25px" justify="space-between" align="center" w="100%">
            <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
                Employee Stats
            </Text>
            <Input
                value={filterInput}
                onChange={handleFilterChange}
                placeholder="Search..."
                style={{ width: '125px' }} // Use inline style as an alternative
                ml="auto" // This pushes the input box to the right side
            />
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
