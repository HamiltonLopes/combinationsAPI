function merge(left, right) {
    let sortedArr = [] // the sorted items will go here
    while (left.length && right.length) {
        // Insert the smallest item into sortedArr
        if (+Object.keys(left[0])[0] > +Object.keys(right[0])[0]) {
            sortedArr.push(left.shift())
        } else {
            sortedArr.push(right.shift())
        }
    }
    // Use spread operators to create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right]
}

export default function mergeSort(arr) {
    // Base case
    if (arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    // Recursive calls
    let left = mergeSort(arr.slice(0, mid))
    let right = mergeSort(arr.slice(mid))
    return merge(left, right)
}