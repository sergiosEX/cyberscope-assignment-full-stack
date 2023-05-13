import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";
import "./Markets.css";

const Table = styled.table`
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const ButtonGroup = styled.div`
  position: relative;
  text-align: right;
`;

const Button = styled.button`
  margin-left: 5px;
  margin-right: 5px;
  background-color: #55608f;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Th = styled.th`
  padding: 15px;
  background-color: #55608f;
  color: #fff;
  text-align: left;
`;

const Td = styled.td`
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  color: #f1f1f1;
  position: relative;

  &:hover:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -9999px;
    bottom: -9999px;
    background-color: rgba(255, 255, 255, 0.2);
    z-index: -1;
  }
`;

const Tr = styled.tr`
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const Markets = () => {
  const [coinData, setCoinData] = useState({ data: [], dataIndex: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = async (page = 1) => {
    try {
      const response = await fetch(
        `http://localhost:3001/coins/markets?page=${page}`
      );
      const data = await response.json();

      setCoinData((prevState) => ({
        data: [...prevState.data, ...data],
        dataIndex: prevState.dataIndex,
      }));
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    if (coinData.dataIndex + 50 < coinData.data.length) {
      setCoinData((prevState) => ({
        data: prevState.data,
        dataIndex: prevState.dataIndex + 50,
      }));
    } else {
      setLoading(true);
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchData(nextPage);
        return nextPage;
      });
    }
  };

  const handlePreviousPage = () => {
    if (coinData.dataIndex - 50 >= 0) {
      setCoinData((prevState) => ({
        data: prevState.data,
        dataIndex: prevState.dataIndex - 50,
      }));
    }
  };

  return (
    <div className="container">
      <h1>Markets</h1>
      {loading ? (
        <div className="spinner-container">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <ButtonGroup>
            <Button
              disabled={coinData.dataIndex <= 0}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>
            <Button onClick={handleNextPage}>Next</Button>
          </ButtonGroup>
          <Table>
            <thead>
              <Tr>
                <Th>#</Th>
                <Th>Name</Th>
                <Th>Symbol</Th>
                <Th>Current Price</Th>
                <Th>High 24h</Th>
                <Th>Low 24h</Th>
                <Th>Price change % 24h</Th>
              </Tr>
            </thead>
            <tbody>
              {coinData.data
                .slice(coinData.dataIndex, coinData.dataIndex + 50)
                .map((coin, index) => (
                  <Tr key={coinData.dataIndex + index}>
                    <Td>{coinData.dataIndex + index + 1}</Td>
                    <Td>{coin.name}</Td>
                    <Td>{coin.symbol}</Td>
                    <Td>{coin.current_price}$</Td>
                    <Td>{coin.high_24h}$</Td>
                    <Td>{coin.low_24h}$</Td>
                    <Td>{coin.price_change_percentage_24h}%</Td>
                  </Tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default Markets;