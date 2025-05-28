export const buildQueryString = (params: Record<string, string | number| boolean>)=>{
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key,value]) =>{
        if(value !== undefined && value !== null) {
            query.append(key, String(value));
        }
    });
    return query.toString();
};