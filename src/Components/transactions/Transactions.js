import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { apiURL } from '../../util/apiURL';
import Transaction from '../transaction/Transaction'
import LoadingView from '../loadingView/LoadingView';
import Container from 'react-bootstrap/Container';

const API = apiURL();

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API}/transactions`).then((response) => {
            const { data } = response;
            setTransactions(data);
            setLoading(false)
        }).catch((e) => {
            console.log(e)
        });
    }, []);



    let total = 0
    transactions.forEach(transaction => {
        total += Number(transaction.amount)
    })

    return (
        <div>
            {loading && <LoadingView />}

            {!loading &&
                <Container>
                    {total > 1000 ?
                        <h1 style={{ color: "green", backgroundColor: "#ffffff" }}>Bank Account Total: ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h1>
                        : <h1 style={{ color: "red", backgroundColor: "#ffffff" }}>Bank Account Total: ${total.toLocaleString('en-US', { minimumDecimalFractions: 2 })}</h1>}
                </Container>

            };

            {!loading &&
                transactions.map((transaction, index) => {
                    return (
                        <div>
                            <Transaction key={index} transaction={transaction} index={index} />
                        </div>
                    );
                })}

        </div>
    )
}

export default Transactions;