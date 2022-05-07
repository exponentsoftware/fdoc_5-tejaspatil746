const Fetch = require('node-fetch');
// generic function to sort items both for string and number
const sortItems = (arr, key) => {
    const copiedArr = [...arr]
    copiedArr.sort((a, b) => {
      if (a[key] > b[key]) return -1
      if (a[key] < b[key]) return 1
      else return 0
    })
    return copiedArr
  }
  
  const largestCountries = async (n = 10) => {
    
    const API_URL = 'https://restcountries.eu/rest/v2/all'
    const countriesArea = []
    const response = await Fetch(API_URL)
    const data = await response.json()
  
    for (const { name, area } of data) {
      countriesArea.push({ country: name, area })
    }
  
    const countriesSortedByArea = sortItems(countriesArea, 'area').slice(0, n)
    console.log(`${n} most largest countries`, countriesSortedByArea)
  }
  
  largestCountries(10)
  
  const numberOfLanguages = async () => {
    const API_URL = 'https://restcountries.eu/rest/v2/all'
    const langSet = new Set()
    const response = await fetch(API_URL)
    const data = await response.json()
  
    for (const { languages } of data) {
      for (const { name } of languages) {
        langSet.add(name)
      }
    }
  
    console.log(Array.from(langSet).sort())
    console.log(
      'Total number of langauges in the countries API:',
      Array.from(langSet).length
    )
    console.log('----------------------------------------------------------- ')
  }
  numberOfLanguages()
  
  const mostSpokenLanguages = async (n = 10) => {
    const API_URL = 'https://restcountries.eu/rest/v2/all'
    const langSet = new Set()
    const allLangArr = []
    const languageFrequency = []
  
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
  
      for (const { languages } of data) {
        for (const { name } of languages) {
          allLangArr.push(name)
          langSet.add(name)
        }
      }
  
      for (l of langSet) {
        const x = allLangArr.filter(ln => l == ln)
        languageFrequency.push({
          lang: l,
          count: x.length
        })
      }
  
      const sortedLanguages = sortItems(languageFrequency, 'count').slice(0, n)
      console.log(`${n} most spoken languages`, sortedLanguages)
    } catch {
      console.log('Something goes wrong')
    }
    console.log('----------------------------------------------------------- ')
  }
  
  console.log('Most spoken languages', mostSpokenLanguages(15))