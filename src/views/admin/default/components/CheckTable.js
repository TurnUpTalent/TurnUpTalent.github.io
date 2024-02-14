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
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Department',
                accessor: 'department',
            },
            {
                Header: 'Score',
                accessor: 'score',
            },
            {
                Header: 'Register Date',
                accessor: 'register_date',
            },
            {
                Header: 'more',
                accessor: (values) => {
                    const user_id = values.id;
                    return user_id;
                },
                disableSortBy: true,
                Cell: ({cell}) => {
                    const {value} = cell;
                    const url = '/admin/profile/' + value;
                    return (
                        <div style={{textAlign: 'center', fontSize: 18}}>

                            <ChakraLink as={RouterLink} to={url} state={{ id: value }}>
                                {'Click for more...'}
                            </ChakraLink>
                        </div>
                    );
                },
            },
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
            <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                            <div {...column.getSortByToggleProps()}>
                                {column.render('Header')}
                                {generateSortingIndicator(column)}
                            </div>
                            <Filter column={column}/>
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row) => {
                prepareRow(row);
                return (
                    <Fragment key={row.getRowProps().key}>
                        <Tr>
                            {row.cells.map((cell, index) => {
                                return (
                                    <Td {...cell.getCellProps()} key={index} fontSize={{ sm: "14px" }} minW={{ sm: "150px", md: "200px", lg: "auto" }} borderColor="transparent">
                                        {cell.render("Cell")}
                                    </Td>
                                );
                            })}
                        </Tr>
                    </Fragment>
                );
            })}
            </tbody>
        </Table>
        <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
            {/*<Col md={3}>*/}
                <Button
                    color='primary'
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                >
                    {'<<'}
                </Button>
                <Button
                    color='primary'
                    onClick={previousPage}
                    disabled={!canPreviousPage}
                >
                    &nbsp;&nbsp;{'<'}&nbsp;&nbsp;
                </Button>

                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>
                <Input
                    type='select'
                    value={pageSize}
                    onChange={onChangeInSelect}
                >
                    >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </Input>

                <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
                    &nbsp;&nbsp;{'>'}&nbsp;&nbsp;
                </Button>
                <Button
                    color='primary'
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                >
                    {'>>'}
                </Button>
        </Row>
    </Card>
  );
}
