import React, {Fragment, useEffect, useMemo, useState} from 'react';
import {
    useTable,
    useSortBy,
    useFilters,
    useExpanded,
    usePagination,
} from 'react-table';
import {Table, Row, Col, Button, Input, Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';
import {Filter, DefaultColumnFilter, SelectColumnFilter} from './filters';

const TableContainer = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const doFetch = async () => {
            const response = await fetch('https://randomuser.me/api/?results=100');
            const body = await response.json();
            const contacts = body.results;
            console.log(contacts);
            setData(contacts);
        };
        doFetch();
    }, []);

    const columns = useMemo(
        () => [

            {
                Header: 'Name',
                accessor: 'name.first',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Department',
                accessor: 'location.city',
            },
            {
                Header: 'Hemisphere',
                accessor: (values) => {
                    const {latitude, longitude} = values.location.coordinates;
                    const first = Number(latitude) > 0 ? 'N' : 'S';
                    const second = Number(longitude) > 0 ? 'E' : 'W';
                    return first + '/' + second;
                },
                disableSortBy: true,
                Filter: SelectColumnFilter,
                filter: 'equals',
                Cell: ({cell}) => {
                    const {value} = cell;

                    const pickEmoji = (value) => {
                        let first = value[0]; // N or S
                        let second = value[2]; // E or W
                        const options = ['⇖', '⇗', '⇙', '⇘'];
                        let num = first === 'N' ? 0 : 2;
                        num = second === 'E' ? num + 1 : num;
                        return options[num];
                    };

                    return (
                        <div style={{textAlign: 'center', fontSize: 18}}>
                            {pickEmoji(value)}
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

    return (
        <Fragment>
            <Table bordered hover {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                <div {...column.getSortByToggleProps()}>
                                    {column.render('Header')}
                                    {generateSortingIndicator(column)}
                                </div>
                                <Filter column={column} />
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
                            <tr>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>
                        </Fragment>
                    );
                })}
                </tbody>
            </Table>

            <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
                <Col md={3}>
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
                        {'<'}
                    </Button>
                </Col>
                <Col md={2} style={{ marginTop: 7 }}>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </Col>
                <Col md={2}>
                    <Input
                        type='number'
                        min={1}
                        style={{ width: 70 }}
                        max={pageOptions.length}
                        defaultValue={pageIndex + 1}
                        onChange={onChangeInInput}
                    />
                </Col>
                <Col md={2}>
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
                </Col>
                <Col md={3}>
                    <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
                        {'>'}
                    </Button>
                    <Button
                        color='primary'
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                    >
                        {'>>'}
                    </Button>
                </Col>
            </Row>
        </Fragment>
    );
};

export default TableContainer;