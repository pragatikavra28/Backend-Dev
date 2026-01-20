console.log("first");

function login (cb){
    setTimeout (() => {
        console.log("login");
        cb()
    }, 2000)
}
function userDetails (cb){
    setTimeout (() => {
        console.log("userDetails");
        cb()
    }, 1000) 
}
function password(){
    setTimeout (() => {
        console.log("password");
    }, 3000) 
}

// callback hell
login (function (){
    userDetails (function (){
        password()
    }
);
});
console.log("End");

// Callback functions are used to handle asynchronous operations in JavaScript. They allow you to pass a function as an argument to another function, which will be executed once a certain task is completed. This is particularly useful for operations that take time to complete, such as reading files, making network requests, or interacting with databases. By using callbacks, you can ensure that your code continues to run without blocking while waiting for these operations to finish.

// However, excessive use of callbacks can lead to a situation known as "callback hell" or "pyramid of doom," where the code becomes deeply nested and difficult to read and maintain. This often occurs when multiple asynchronous operations depend on each other, leading to a series of nested callbacks. To mitigate this issue, developers often use Promises or async/await syntax, which provide a more manageable way to handle asynchronous code.