module.exports =  {
    fetchHistory(token) {
        return fetch('/api/history', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            }
        })
    }
} 