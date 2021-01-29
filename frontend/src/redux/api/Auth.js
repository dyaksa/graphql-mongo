export const postAuth = async (requestData) => {
    try {
        const res = await fetch('http://localhost:8000/graphql',{
            method: "POST",
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }catch(err){
        return console.log(err);
    }
}