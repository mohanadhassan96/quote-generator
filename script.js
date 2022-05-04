const quoteContainer =document.getElementById("quote-container");
const quoteText =document.getElementById("quote");
const authorText =document.getElementById("author");
const twitterBtn =document.getElementById("twitter");
const newQuoteBtn =document.getElementById("newquote");
const loader =  document.getElementById("loader");

let apiQuotes=[];

function newQuote(){
    loading();
    const quote =apiQuotes[ Math.floor(Math.random()*apiQuotes.length) ];
    if(quote.author==null){
        authorText.textContent="unkown"
    }
    else{
        authorText.textContent=quote.author;
    }

    if(quote.text.length>50) {
        quoteText.classList.add('long-quote')
    }
    else{
        quoteText.classList.remove('long-quote')

    }
    complete();
    quoteText.textContent=quote.text;
};

async function getquotes(){
    loading();
    const apiUrl= 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes= await response.json();
        newQuote();

    }
    catch{}
};

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl,'_blank')
}

function loading(){
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


getquotes()
newQuoteBtn.addEventListener("click",getquotes);
twitterBtn.addEventListener("click",tweetQuote);



