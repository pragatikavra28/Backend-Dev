function add(a,b)
{
    return a+b;
}
function sub(a,b)
{
    return a-b;
}
function multiply(a,b)
{
    return a*b;
}   
function divide(a,b)    
{
    return a/b;
}
function modulus(a,b)
{
    return a%b;
}
function exponent(a,b)
{
    return a**b;
}
function floorDiv(a,b)
{
    return Math.floor(a/b);
}
function max(a,b)
{
    return Math.max(a,b);
}


module.exports={ add,sub,multiply,divide,modulus,exponent,floorDiv,max };