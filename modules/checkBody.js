function checkBody(body, keys) {
    let isValid = true;
  
    // Regex to check whether the entire string is made up of spaces
    const regex = /^\s*$/; 
    for (const field of keys) {
      if (body[field]) {
        // Replace extra spaces and delete spaces at the beginning and end
        body[field] = body[field].replace(/\s+/g, ' ').trim(); 
      }
      if (!body[field] || body[field] === '' || regex.test(body[field])) {
        isValid = false;
      }
    }
  
    return isValid;
  }
  
 export default checkBody;