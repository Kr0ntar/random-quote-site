/*initialize DOM element */

var quoteBtn = document.querySelector('#button');
var showDiv = document.querySelector('.hidden-div');
var quote = document.querySelector('.quote');
var author = document.querySelector('.author');
var backBtn = document.querySelector('#back-button');
var tweetBtn = document.querySelector('#tweet-button');

quoteBtn.addEventListener('click', getRandQuote);

backBtn.addEventListener('click', function() {
	showDiv.className = 'hidden-div';
	quoteBtn.className = '';
});

function getRandQuote() {
	var http = new XMLHttpRequest();
    	var url = 'http://api.forismatic.com/api/1.0/?method=getQuote&key=&format=json&lang=en&jsonp=?';
	var proxy = 'https://cors-anywhere.herokuapp.com/';
	var method = 'GET';

	http.open(method, proxy + url);
    	http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE && http.status === 200) {
            var data = JSON.parse(http.responseText);
            quote.textContent = data.quoteText;
            author.textContent = "- " + data.quoteAuthor;
            showDiv.className = "show-div";
            quoteBtn.className = "hidden-div";

        } else if (http.readyState === XMLHttpRequest.DONE) {
            alert('Something went wrong!');
        }
    };
    http.send();

    tweetBtn.addEventListener('click', function() {
        var url = 'https://twitter.com/intent/tweet?text=' + quote.textContent;
        window.open(url, "_blank");  
    });
}