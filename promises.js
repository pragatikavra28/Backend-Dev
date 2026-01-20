function login(){
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log("Login Successfull");
            resolve();
        }, 2000);
    })
}

function useDetails(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("user details");
            resolve();
        },2000);
    })
}

function password(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("Password");
            resolve();
        },2000)
    })
}

//callback promises

login()
.then(()=>{
    return useDetails();    
})
.then(()=>{
    return password();
})
.then(()=>{
    console.log("All done");
})
.catch((err)=>{
    console.log("Error:",err);
});

// Promises in JavaScript are objects that represent the eventual completion (or failure) of an asynchronous operation and its resulting value. They provide a cleaner and more manageable way to handle asynchronous code compared to traditional callback functions. A Promise can be in one of three states: pending, fulfilled, or rejected. When a Promise is fulfilled, it means the asynchronous operation completed successfully, and when it is rejected, it means there was an error during the operation. Promises allow you to chain multiple asynchronous operations together using .then() for success cases and .catch() for error handling, making the code more readable and easier to maintain.
