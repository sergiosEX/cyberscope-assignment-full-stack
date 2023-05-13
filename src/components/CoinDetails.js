import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorPage from "./ErrorPage";

const CoinDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const CoinDetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  justify-content: space-evenly;
`;

const Circle = styled.div`
  padding: 5%;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
  align-self: center;
  margin-left: -30%;
`;

const GradientCircle = styled(Circle)`
  background-color: white;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: -5%;
    left: -5%;
    bottom: -5%;
    right: -5%;
    border-radius: 50%;
    background: linear-gradient(#f07e6e, #84cdfa, #5ad1cd);
    z-index: -1;
  }
`;

const CryptoName = styled.h1`
  margin: 0 auto;
  font-size: 20px;
  span {
    color: black;
  }
`;

const CoinDetails = () => {
  const [coinData, setCoinData] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/coins/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCoinData(data);
      } else if (response.status === 404) {
        setError({
          errorMessage: `Coin with id=${id} does not exist.`,
          statusCode: response.status,
        });
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      setError({
        errorMessage: error.message,
        statusCode: 500,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (error) {
    return <ErrorPage {...error} />;
  }

  return (
    <CoinDetailsContainer className="container">
      <CoinDetailsRow>
        <GradientCircle className="loader">
          <CryptoName className="crypto-name">
            <span>{coinData.name}</span>
          </CryptoName>
        </GradientCircle>

        <div className="coin-details">
          <p>Current Price: {coinData.current_price}$</p>
          <p>Price Change 24h: {coinData.price_change_24h}$</p>
          <p>
            Price Change Percentage in 7 days:{" "}
            {coinData.price_change_percentage_7d}%
          </p>
          <p>
            Price Change Percentage in 14 days:{" "}
            {coinData.price_change_percentage_14d}%
          </p>
          <p>
            Price Change Percentage in 1 month:{" "}
            {coinData.price_change_percentage_1m}%
          </p>
          <p>
            Price Change Percentage in 2 months:{" "}
            {coinData.price_change_percentage_2m}%
          </p>
          <p>
            Price Change Percentage in 200 days:{" "}
            {coinData.price_change_percentage_200d}%
          </p>
          <p>
            Price Change Percentage in 1 year:{" "}
            {coinData.price_change_percentage_1y}%
          </p>
          <p>High Last 24 hours: {coinData.high_24h}$</p>
          <p>Low Last 24 hours: {coinData.low_24h}$</p>
        </div>
      </CoinDetailsRow>
      <h3>Description</h3>
      <p> {coinData.description}</p>
    </CoinDetailsContainer>
  );
};

export default CoinDetails;