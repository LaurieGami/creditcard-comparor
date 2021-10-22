import Head from 'next/head';
import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
// import { AddCreditCard, AddCreditCardVariables } from './__generated__/AddCreditCard';
// import { AllDataQuery } from './__generated__/AllDataQuery';
import { GET_ALL_DATA } from '../Admin/AdminQueries';
import { Card, CardContent, Button, Grid, Checkbox, FormControl, Select, MenuItem, TextField, CardHeader, Box } from '@mui/material';

export default function Admin() {
    const { data, loading, error, refetch } = useQuery(GET_ALL_DATA);

    const [selectedCreditCards, setSelectedCreditCards] = useState([]);
    const [selectedMerchant, setSelectedMerchant] = useState('');
    const [shoppingValue, setShoppingValue] = useState(0);

    // useEffect(() => {
    //     if (addCreditCardData) {
    //         setCreditCardName('');
    //         refetch();
    //     }
    // }, [addCreditCardData]);

    const handleCreditCardsSelection = (event) => {
        if (event.target.checked) {
            if (!selectedCreditCards.includes(event.target.value)) {
                setSelectedCreditCards([...selectedCreditCards, event.target.value]);
            }
        } else {
            setSelectedCreditCards(selectedCreditCards.filter((creditCard) => creditCard !== event.target.value));
        }
    };

    const handleMerchantSelection = (event) => {
        setSelectedMerchant(event.target.value);
    };

    const handleShoppingValue = (event) => {
        setShoppingValue(event.target.value);
    };

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    return (
        <Box padding={2}>
            <Head>
                <title>Credit Card Selector</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>
                <h2>Select the credit cards you'd like to compare:</h2>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {data.creditCards.map((card) => {
                            return (
                                <Grid item key={card.id} xs={4}>
                                    <Card>
                                        <CardContent>
                                            <CardHeader title={card.creditCardName}>
                                                <h3>{card.creditCardName}</h3>
                                            </CardHeader>
                                            <div>Image Placeholder</div>
                                            <Checkbox id={card.id} name={card.creditCardName} value={card.id} onChange={handleCreditCardsSelection} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    <h2>Choose a Merchant from this list:</h2>

                    <FormControl>
                        <Select labelId="merchant" id="merchants-selection" value={selectedMerchant} onChange={handleMerchantSelection}>
                            <MenuItem value="Starbucks">Starbucks</MenuItem>
                            <MenuItem value="Costco">Costco</MenuItem>
                            <MenuItem value="Walmart">Walmart</MenuItem>
                        </Select>
                    </FormControl>

                    <h2>How much will you be spending there?</h2>
                    <TextField id="shopping-value" name="shopping-value" value={shoppingValue} type="number" onChange={handleShoppingValue} />

                    {/* <input type="number" id="shopping-value" name="shopping-value" value={shoppingValue} onChange={handleShoppingValue} /> */}

                    <Button type="submit" variant="contained">
                        Search
                    </Button>
                </form>
            </div>
        </Box>
    );
}
