export async function getNews(page, querry = 'Sevastopol') {
    const key = '8c66ce1dfb9245cf9fe9be0a484d713e'
    const url =
    `https://newsapi.org/v2/everything?apiKey=${key}&page=${page}&q=${querry}`;
  
    let result = await fetch(url).then(response => response.json());
    return result.articles;
}