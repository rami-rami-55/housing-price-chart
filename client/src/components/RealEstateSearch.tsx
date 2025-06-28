import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Select,
    VStack,
    Container,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { RealEstateQuery, PriceData } from '../types/estate';

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    
    th {
        background-color: #f4f4f4;
    }
    
    tr:nth-child(even) {
        background-color: #f8f8f8;
    }
`;

const RealEstateSearch: React.FC = () => {
    const [query, setQuery] = useState<RealEstateQuery>({
        prefecture: '',
        city: '',
        station: '',
        property_type: '',
        layout: '',
    });
    const [priceData, setPriceData] = useState<PriceData[]>([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post('/api/prices/', query);
            setPriceData(response.data);
        } catch (error) {
            console.error('Error fetching price data:', error);
        }
    };

    return (
        <Container maxW="container.xl" py={8}>
            <VStack spacing={6}>
                <Box width="100%">
                    <FormControl>
                        <FormLabel>都道府県</FormLabel>
                        <Select
                            value={query.prefecture}
                            onChange={(e) => setQuery({ ...query, prefecture: e.target.value })}
                            placeholder="都道府県を選択"
                        >
                            <option value="東京都">東京都</option>
                            <option value="神奈川県">神奈川県</option>
                            <option value="千葉県">千葉県</option>
                            <option value="埼玉県">埼玉県</option>
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>市区町村</FormLabel>
                        <Select
                            value={query.city}
                            onChange={(e) => setQuery({ ...query, city: e.target.value })}
                            placeholder="市区町村を選択"
                        >
                            <option value="新宿区">新宿区</option>
                            <option value="渋谷区">渋谷区</option>
                            <option value="港区">港区</option>
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>駅</FormLabel>
                        <Select
                            value={query.station}
                            onChange={(e) => setQuery({ ...query, station: e.target.value })}
                            placeholder="駅を選択"
                        >
                            <option value="新宿">新宿</option>
                            <option value="渋谷">渋谷</option>
                            <option value="東京">東京</option>
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>種別</FormLabel>
                        <Select
                            value={query.property_type}
                            onChange={(e) => setQuery({ ...query, property_type: e.target.value })}
                            placeholder="種別を選択"
                        >
                            <option value="マンション">マンション</option>
                            <option value="一戸建て">一戸建て</option>
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>間取り</FormLabel>
                        <Select
                            value={query.layout}
                            onChange={(e) => setQuery({ ...query, layout: e.target.value })}
                            placeholder="間取りを選択"
                        >
                            <option value="1K">1K</option>
                            <option value="1LDK">1LDK</option>
                            <option value="2LDK">2LDK</option>
                            <option value="3LDK">3LDK</option>
                        </Select>
                    </FormControl>

                    <Button
                        mt={6}
                        colorScheme="blue"
                        onClick={handleSearch}
                        width="100%"
                    >
                        検索
                    </Button>
                </Box>

                {priceData.length > 0 && (
                    <>
                        <Box width="100%" overflowX="auto">
                            <LineChart
                                width={800}
                                height={400}
                                data={priceData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="average_price"
                                    stroke="#8884d8"
                                    name="平均価格"
                                />
                            </LineChart>
                        </Box>

                        <Box width="100%">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>年度</th>
                                        <th>平均価格</th>
                                        <th>取引件数</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {priceData.map((data) => (
                                        <tr key={data.year}>
                                            <td>{data.year}</td>
                                            <td>{data.average_price.toLocaleString()}円</td>
                                            <td>{data.transaction_count}件</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Box>
                    </>
                )}
            </VStack>
        </Container>
    );
};

export default RealEstateSearch;