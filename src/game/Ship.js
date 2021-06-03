const createShip = (length) => {
  let hits = []
  let coords = []
  
  const hit = (space) => {
    if (hits.includes(space)) {
      return false
    } else if (space > length - 1) {
      return false
    } 
    else {
      hits.push(space)
    }
  }

  const isSunk = () => {
    if(hits.length === length) {
      return true
    } else {
      return false
    }
  }

  

  return {
    length: length,
    hits,
    hit,
    isSunk,
    coords,
  }
}

export { createShip }