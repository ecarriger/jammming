const get = async (url) => {
    try{
        console.log(url);
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
    }
    catch(error) {
        console.log(error);
    }
    
};

export default get;