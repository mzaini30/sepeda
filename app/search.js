---
---

(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '<div class="panel panel-default">  <div class="panel-body">Kata kunci: ' + location.search.slice(7) + '</div></div>';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<div class="panel panel-default">';
        appendString += '<div class="panel-heading list-group-item"><a href="' + item.url + '">' + item.title + '</a> <a href="/kategori/' + item.category + '" class="badge">' + item.category + '</a></div>';
        appendString += '<div class="panel-body">';
        appendString += '<p><img class="sampul" src="' + item.image + '"></p>';
        appendString += item.content.substring(0, 150);
        appendString += '</div>';
        appendString += '<div class="panel-footer"><a class="btn btn-success" href="https://api.whatsapp.com/send?phone=6281545143654&text=Berapa%20harganya?%0A%0A*Barang*%3A%20' + item.title + '%0A*Link*%3A%20{{ site.url }}' + item.url + '">Cek harga &rarr;</a></div>';
        appendString += '</div>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = '<div class="panel panel-warning">  <div class="panel-body">Barang tidak ditemukan</div></div>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();
