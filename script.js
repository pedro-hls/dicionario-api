// Formulário para escrever a palavra + Botão
let inputText = document.querySelector('.input-word')
let searchWord = document.querySelector('.search-word')

// Conteúdo Palavra
let wordDisplay = document.querySelector('.word-display')
let syllables = document.querySelector('.syllables')
let etymology = document.querySelector('.etymology')
let mainMeaning = document.querySelector('.main-meaning')
let otherMeaning = document.querySelector('.other-meaning')
let sentences = document.querySelector('.sentences')
let synonyms = document.querySelector('.synonyms')

// Pega o que está escrito no Input

searchWord.addEventListener('click', word)

async function word() {
    
    let wordInput = inputText.value.toLowerCase()
    let apiDefault = "https://dicio-api-ten.vercel.app/v2/"
    console.log(wordInput)

    // Etimologia e Significado da Palavra
    let apiMain = apiDefault + wordInput.toLowerCase()
    
    try { 
        const mainResponse = await fetch(apiMain)
        const mainData = await mainResponse.json()
        
        console.log(mainData)
        
        wordDisplay.innerHTML = (wordInput)

        if(mainData.length >= 1) {
            mainMeaning.innerHTML = (mainData[0].meanings[0].toLowerCase())
            if(mainData.length > 1){
                otherMeaning.innerHTML = (mainData[0].meanings[1].toLowerCase())
            }
        }

        etymology.innerHTML = (mainData[0].etymology)

        if(mainData[0].etymology.length == 0){
            etymology.innerHTML = (mainData[1].etymology)
        }
        
    }
    catch(errorMainApi){
        console.log('erroMainApi')
        inputText.placeholder = 'Palavra Inválida!'
    }

    // Sílabas
    let apiSyllables = apiDefault + 'syllables/' + wordInput
    
    try {
        const syllablesResponse = await fetch(apiSyllables)
        const syllablesData = await syllablesResponse.json()

        console.log(syllablesData)
        syllables.innerHTML = ''
        for(e = 0; e < syllablesData.length; e++){
            console.log(syllablesData[e])
            syllables.innerHTML += `[${syllablesData[e].toLowerCase()}]`
        }
    }
    catch(errorSyllables){
        console.log('erroSyllables')
    }

    // Frases
    let apiSentences = apiDefault + 'sentences/' + wordInput

    try {
        const sentencesResponse = await fetch(apiSentences)
        const sentencesData = await sentencesResponse.json()

        console.log(sentencesData)
        sentences.innerHTML = `"${sentencesData[0].sentence.toLowerCase()}" <strong class="strong">${sentencesData[0].author.toLowerCase()}</strong>`

    }
    catch(errorSentences){
        console.log('erroSentences')
    }

    // Sinônimos
    let apiSynonyms = apiDefault + 'synonyms/' + wordInput

    try {
        const synonymsResponse = await fetch(apiSynonyms)
        const synonymsData = await synonymsResponse.json()

        synonymsData.sort()

        console.log(synonymsData)

        if(synonymsData.length > 3){
            synonyms.innerHTML = `<strong class="strong">sinônimos:</strong> ${synonymsData[0]}, ${synonymsData[1]}, ${synonymsData[2]}`
        } else {
            synonyms.innerHTML = '<i class="italic>(nenhum sinônimo disponível)</i>'
        }
    }
    catch(errorSynonyms){
        console.log('errorSynonyms')
    }
}