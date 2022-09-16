import React, { useState, useEffect } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((resolv) => resolv.json())
      .then((result) => {
        setRates(result.rates);
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(value);
  };
  const onChangeToPrice = (value) => {
    const result = (rates[fromCurrency] / rates[toCurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value);
  };

  useEffect(() => {
    onChangeFromPrice(fromPrice);
    // eslint-disable-next-line
  }, [toCurrency, toPrice]);

  useEffect(() => {
    onChangeToPrice(toPrice);
    // eslint-disable-next-line
  }, [fromCurrency, fromPrice]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
