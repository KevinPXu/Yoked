import React, { useState, useEffect } from 'react';

const UserHistory = () => {
    const [historyData, setHistoryData] = useState({});

    useEffect(() => {
        const getHistoryData = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;
                if(!token) {
                    return false
                }
                // need getHistory to be a fetch request in a utils directory
                const response = await fetchHistory(token);
                if(!response.ok) {
                    throw new Error('Something went wrong');
                }
                
                const userHistory = await response.json();
                setHistoryData(userHistory);
            } catch (err) {
                console.log(err);
            }
        }
    })


    return (
        <div>
            <h2>User History</h2>
            <ul>
                {historyData.history.map((hist) => {
                    return(
                        <>
                            <li>
                                Exercises:
                                <ul>
                                    {hist.exercises.map((exercise) => {
                                        return(
                                            <li>{exercise.name}</li>
                                        )
                                    })}
                                </ul>
                            </li>
                            <li>
                                {hist.Date}
                            </li>
                            <li>
                                {hist.Length}
                            </li>
                        </>
                    )
                })}
            </ul>
        </div>
    )
};

export default UserHistory;