import React, { useState, useEffect } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('RUB');
  const [fromPrice, setFromPrice] = useState(0);
  const [toCurrency, setToCurrency] = useState('USD');
  const [toPrice, setToPrice] = useState(0);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
      .then((resolv) => resolv.json())
      .then((result) => {
        setRates(result.rates);
      });
  }, [fromCurrency, fromPrice, toCurrency, toPrice]);

  function onChangeFromPrice(value) {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    setToPrice(result);
    setFromPrice(value);
  }
  function onChangeToPrice(value) {
    const result = rates[fromCurrency] / rates[toCurrency];
    setFromPrice(result);
    setToPrice(value);
  }

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
