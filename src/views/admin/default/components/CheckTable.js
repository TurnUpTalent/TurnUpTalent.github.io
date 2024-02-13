import React, { useMemo } from "react";
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
  Select,
} from "@chakra-ui/react";
import { useTable, useSortBy } from "react-table";
import Card from "components/card/Card";

export default function CheckTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => value, // Assuming name is now a string
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Score",
        accessor: "score",
        Cell: ({ value }) => value + '%', // Assuming score is a number
      },
      {
        Header: "Register Date",
        accessor: "register_date",
      },
    ],
    []
  );

  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable({ columns, data }, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setSortBy,
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  // Function to handle sort change
  const handleSortChange = (e) => {
    const value = e.target.value;
    const sort = value ? [{ id: value, desc: false }] : [];
    setSortBy(sort);
  };

  return (
    <Card direction="column" w="100%" px="0px" overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px="25px" justify="space-between" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Employee Stats
        </Text>
        {/* Dropdown for sorting with width adjusted to 25% */}
        <Select placeholder="Sort by" onChange={handleSortChange} width="30%">
          {columns.map((column) => (
            <option value={column.accessor} key={column.accessor}>
              {column.Header}
            </option>
          ))}
        </Select>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())} pe="10px" key={index} borderColor={borderColor}>
                  <Flex justify="space-between" align="center" fontSize={{ sm: "10px", lg: "12px" }} color="gray.400">
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  return (
                    <Td {...cell.getCellProps()} key={index} fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor="transparent">
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
  );
}
