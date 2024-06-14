let arr = [
    {
        name : "adam",
        age: 18
    }, {
        name: "shaik",
        age: 19
    }, {
        name : "Fina",
        age: 26
    }
];

let newarr = arr.map((value) => {
    if(value.age > 25) {
        return {
            name : value.name,
            age : value.age,
            isallowed : true
        }
    } else {
        return {
            name : value.name,
            age : value.age,
            isallowed : false
        }
    }
})

console.log(newarr);