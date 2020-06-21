 const getTestsHistory = async () => {
        fetch('​https://bankapimaai.azurewebsites.net/api/TestHistory/', {
          method: 'GET', 
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => {})
        .then(response =>{
            return response;
        });

    }

export default getTestsHistory;
