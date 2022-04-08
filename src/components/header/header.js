import React, {useEffect, useState} from 'react';
import {AppBar, Toolbar, Typography} from "@mui/material";
import classes from './header.module.scss';
import api from "../../api";
import {base_currency, header_currencies} from "../../constants/currencies";

const Header = () => {
    const [currencyData, setCurrencyData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let res = await api.get('/', {params: {base_currency}});
                let data = res.data.data;
                header_currencies.map(item => {
                    setCurrencyData(prevState => [...prevState, data[item]])
                })
            } catch (err) {
                console.log(err.message);
            }
        })()
    }, [])


    return (
        <AppBar
            position={'relative'}
            className={classes.header}
        >
            <Toolbar>
                <Typography>
                    {currencyData.map(item => (
                        <span key={item.code}>{item.code} : {item.value}</span>
                    ))}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;