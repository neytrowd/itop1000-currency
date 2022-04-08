import React, {useState} from 'react';
import classes from './choose-currency.module.scss';
import {Box, MenuItem, TextField} from "@mui/material";
import {currencies} from "../../constants/currencies";

const ChooseCurrency = ({data, handleChange}) => {

    return (
        <Box className={classes.box}>
            <Box className={classes.amount}>
                <TextField
                    fullWidth
                    name={'amount'}
                    type={'number'}
                    label={'Amount'}
                    onChange={handleChange}
                    value={data.amount}
                />
            </Box>

            <Box>
                <TextField
                    select
                    fullWidth
                    name={'type'}
                    label="Currency type"
                    onChange={handleChange}
                    value={data.type}
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>
        </Box>
    );
};

export default ChooseCurrency;