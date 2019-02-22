import React from 'react';
import { Table, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

import './App.css';

const data = [
    { id: 1, name: "Вася", date: "15.06.2018", count: 11 },
    { id: 3, name: "Иван", date: "12 марта 2017", count: 3 },
    { id: 2, name: "Петя", date: "23.11.2018", count: 23 },
    { id: 5, name: "Евгений", date: "12.09.2018", count: 112 },
    { id: 4, name: "Александр", date: "20 / 12 / 2010", count: 1 },
    { id: 6, name: "Мария", date: "1.08.2016", count: 122 },
    { id: 7, name: "Анастасия", date: "20.11.2018", count: 34 },
    { id: 8, name: "Степан", date: "12.11.2019", count: 10 },
    { id: 9, name: "Вася", date: "15.06.2018", count: 11 },
    { id: 10, name: "Петя", date: "23.11.2018", count: 23 },
    { id: 11, name: "Иван", date: "12 марта 2017", count: 3 },
    { id: 12, name: "Александр", date: "20 / 12 / 2010", count: 1 },
    { id: 13, name: "Евгений", date: "12.09.2018", count: 112 },
];

class App extends React.Component {
    state = {
        searchText: '',
    };

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => { this.searchInput = node; }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </div>
            ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const columns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '30%',
            sorter: (a, b) => a.id - b.id,
            ...this.getColumnSearchProps('id'),
        }, {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            filterMultiple: false,
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            ...this.getColumnSearchProps('name'),
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            filterMultiple: false,
            onFilter: (value, record) => record.date.indexOf(value) === 0,
            sorter: (a, b) => a.date.length - b.date.length,
            ...this.getColumnSearchProps('date'),
        }, {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
            sorter: (a, b) => a.count - b.count,
            ...this.getColumnSearchProps('count'),
        }];
        return <Table columns={columns} dataSource={data} />;
    }
}

export default App;