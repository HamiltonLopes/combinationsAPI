// var obj_test = { item2: 4, item4: 6, item6: 4, item5: 3, item3: 3 };
function array_to_object(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[arr[i][0]] = arr[i][1];
    return rv;
}

 export function array_sort_subitens(obj_sort) {
    var key = Object.keys(obj_sort)

    var result = key.map(function (key) {
        return [String(key), obj_sort[key]];
    });

    result.sort(function (a, b) {
        if (a[1] < b[1]) return 1;
        if (a[1] > b[1]) return -1;
        return 0;
    }
    );

    var obj_ =array_to_object(result);

    return obj_
}


// console.log(array_sort_subitens(obj_test))
