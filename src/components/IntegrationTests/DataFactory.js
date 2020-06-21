export const IntegrationTests = [
    {"name":"Auth and Query Integration","lastStatus":"unKnow","status":"StandBy","success":true},
    {"name":"Auth and Deposit Integration","lastStatus":"unKnow","status":"StandBy","success":true},
    {"name":"Auth and WithDrawal Integration","lastStatus":"unKnow","status":"StandBy","success":true},
    {"name":"Auth and Transfer Integration","lastStatus":"unKnow","status":"StandBy","success":true},
]

const urlAuth = 'http://bankapimaai.azurewebsites.net/api/Authentication';
const urlQuery = 'http://bankapimaai.azurewebsites.net/api/Query';
const urlDeposit = 'http://bankapimaai.azurewebsites.net/api/Deposit';
const urlWireTransfer = 'http://bankapimaai.azurewebsites.net/api/WireTransfer';
const urlWithDrawal = 'http://bankapimaai.azurewebsites.net/api/WithDrawal';


export const runIntegrationTest= (testName,setRows) =>{
    if(testName === "Auth and Query Integration"){
      
        var data = {username: 'maai',password:'maai123'};
        
        fetch(urlAuth, {
          method: 'POST', 
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => updateTestStatus(setRows,testName,error,"Error"))
        .then(response =>{
          if(!response.token){
            updateTestStatus(setRows,testName,response,"Error")
            return
          }
            fetch(urlQuery, {
                method: 'GET', 
                headers:{
                    'Authorization': 'Bearer '+ response.token,
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .catch(error => updateTestStatus(setRows,testName,response,"Error"))
              .then(response =>{
                  updateTestStatus(setRows,testName,response,"Success")
      
                 
              });


           
        });
    }

    if(testName === "Auth and Deposit Integration"){
      
        var data = {username: 'maai',password:'maai123'};
        
        fetch(urlAuth, {
          method: 'POST', 
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => updateTestStatus(setRows,testName,error,"Error"))
        .then(response =>{
            fetch(urlDeposit, {
                method: 'POST', 
                headers:{
                    'Authorization': 'Bearer '+ response.token,
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .catch(error => updateTestStatus(setRows,testName,response,"Error"))
              .then(response =>{
                  updateTestStatus(setRows,testName,response,"Success")
      
                 
              });


           
        });
    }


    if(testName === "Auth and WithDrawal Integration"){
      
        let data = {username: 'maai',password:'maai123'};
        
        fetch(urlAuth, {
          method: 'POST', 
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => updateTestStatus(setRows,testName,error,"Error"))
        .then(response =>{
             data = {amount: 1};

            fetch(urlWithDrawal, {
                method: 'POST', 
                 body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                    'Authorization': 'Bearer '+ response.token,
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .catch(error => updateTestStatus(setRows,testName,response,"Error"))
              .then(response =>{
                  updateTestStatus(setRows,testName,response,"Success")
      
                 
              });


           
        });
    }

    
    if(testName === "Auth and Transfer Integration"){
      
        let data = {username: 'maai',password:'maai123'};
        
        fetch(urlAuth, {
          method: 'POST', 
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => updateTestStatus(setRows,testName,error,"Error"))
        .then(response =>{
             data = {amount: 1,accountToTransfer:20000002};

            fetch(urlWireTransfer, {
                method: 'POST', 
                 body: JSON.stringify(data), // data can be `string` or {object}!
                headers:{
                    'Authorization': 'Bearer '+ response.token,
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json())
              .catch(error => updateTestStatus(setRows,testName,response,"Error"))
              .then(response =>{
                  updateTestStatus(setRows,testName,response,"Success")
      
                 
              });


           
        });
    }


}

const updateTestStatus = (setRows,testName,response,newStatus) => {
  debugger
    let newTest = [...IntegrationTests]
    var test = newTest.find(i=> i.name === testName);
    test.status="StandBy"
    test.lastStatus=newStatus
    
    fetch('https://bankapimaai.azurewebsites.net/api/TestHistory/', {
        method: 'POST', 
        body: JSON.stringify({
            "title": testName,
            "status": newStatus,
            "comments": testName ==="Success" ? "":"asdf",
            "dateTime": new Date().toJSON(),
            "responsible":  testName ==="Success" ? "":"asdf"
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => alert('Failed to save test result'))
      .then(response =>{
        setRows(newTest)
         
      });
}

