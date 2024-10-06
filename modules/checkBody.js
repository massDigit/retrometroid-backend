function checkBody(body, keys) {
    let isValid = true;
  
  
    const regex = /^\s*$/; 
    for (const field of keys) {
      if (body[field]=== "string") {
    
        body[field] = body[field].replace(/\s+/g, ' ').trim(); 
      }
      if (!body[field] || body[field] === '' || regex.test(body[field])) {
        isValid = false;
      }
    }
  
    return isValid;
  }
  
 export default checkBody;