export const postAuth = async ({email,password}) => {
    try {
        let requestBody = {
            query: `
                query {
                    login(email: "${email}", password: "${password}"){
                        _id
                        token
                        expiredIn
                    }
                }`
            }
        const res = await fetch('http://localhost:8000/graphql',{
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return res.json();
    }catch(err){
        return err;
    }
}

export const postRegister = ({email,password}) => {
        let requestBody = {
            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}){
                        _id
                        email
                        password
                    }
                }`
            }
    fetch('http://localhost:8000/graphql',{
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.json();
    }).then(data => {
        return data;
    }).catch(err => {
        return err;
    })
}