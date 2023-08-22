function dirReduc(arr){
    // ...


      for(let i = 0; i < arr.length; i++){
        console.log(arr)
        if(arr[i] === 'NORTH' && arr[i+1] === 'SOUTH' && arr[i+1]){
          arr.splice(i,2)
          i-=2
        }else if(arr[i] === 'SOUTH' && arr[i+1] === 'NORTH' && arr[i+1]){
          arr.splice(i,2)
          i-=2
        }else if(arr[i] === 'EAST' && arr[i+1] === 'WEST' && arr[i+1]){
          arr.splice(i,2)
          i-=2
        }else if(arr[i] === 'WEST' && arr[i+1] === 'EAST' && arr[i+1]){
          arr.splice(i,2)
          i-=2
        }
      }


    return arr


  }

// console.log(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]))
// console.log(dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]))
// console.log(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"]))