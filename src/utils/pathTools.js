export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}

 export function urlEncode(param, key, encode) {  
  if(param==null) return '';  
  let paramStr = '';  
  let t = typeof (param);  
  if (t === 'string' || t === 'number' || t === 'boolean') {  
    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);  
  } else {  
    for (let i in param) {  
      let k = key == null ? i : key + '[' + i + ']';
      paramStr += urlEncode(param[i], k, encode);  
    }  
  }  
  return paramStr;  
}; 