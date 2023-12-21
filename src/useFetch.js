import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    // const handleDelete = (id) => {
    //     const NewItems = items.filter(item => item.id !== id);
    //     setItem(NewItems);
    // }
    //fetch data
    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch items')
                    }
                    console.log(res)
                    return res.json();
                })
                .then(data => {
                    console.log(data);
                    setError(null);
                    setData(data);
                    setIsPending(false);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setIsPending(false);
                        setError(err.message);
                        console.log(err.message);
                    }
                })
        }, 1000);
        return () => abortCont.abort();
    }, [url]);
    return { data, isPending, error }
}

export default useFetch;