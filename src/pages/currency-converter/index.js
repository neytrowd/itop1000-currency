import {v4 as uuid} from 'uuid';
import React, {useEffect, useState} from 'react';
import ChooseCurrency from "../../components/choose-currency";
import {Box, Typography, Container} from "@mui/material";
import classes from "./currency-converter.module.scss";
import Header from "../../components/header";
import api from "../../api";

const CurrencyConverter = () => {
    const [leftCurrency, setLeftCurrency] = useState({id: '', type: 'USD', amount: ''});
    const [rightCurrency, setRightCurrency] = useState({id: '', type: 'USD', amount: ''});

    const handleLeft = (event) => {
        let {name, value} = event.target;
        setLeftCurrency(prevState => ({
            ...prevState, id: uuid(), [name]: value
        }))
    }

    const handleRight = (event) => {
        let {name, value} = event.target;
        setRightCurrency(prevState => ({
            ...prevState, id: uuid(), [name]: value
        }))
    }

    const getRates = async (type) => {
        let res = await api.get('/', {params: {base_currency: type}});
        return res.data.data;
    }

    useEffect(() => {
        (async () => {
            try {
                if (leftCurrency.amount) {
                    let data = await getRates(leftCurrency.type);
                    let currencyRate = leftCurrency.amount * data[rightCurrency.type].value
                    setRightCurrency(prevState => ({
                        ...prevState, amount: currencyRate
                    }))
                }
            } catch (err) {
                console.log(err.message)
            }
        })()
    }, [leftCurrency.id])


    useEffect(() => {
        (async () => {
            try {
                if (rightCurrency.amount) {
                    let data = await getRates(rightCurrency.type);
                    let currencyRate = rightCurrency.amount * data[leftCurrency.type].value
                    setLeftCurrency(prevState => ({
                        ...prevState, amount: currencyRate
                    }))
                }
            } catch (err) {
                console.log(err.message)
            }
        })()
    }, [rightCurrency.id])


    return (
        <>
            <Header/>
            <Container maxWidth={'md'}>
                <Box>
                    <Box className={classes.title}>
                        <Typography variant='h4'>
                            Currency converter
                        </Typography>
                    </Box>
                    <Box className={classes.converters}>
                        <ChooseCurrency
                            handleChange={handleLeft}
                            data={leftCurrency}
                        />
                        <ChooseCurrency
                            handleChange={handleRight}
                            data={rightCurrency}
                        />
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default CurrencyConverter;