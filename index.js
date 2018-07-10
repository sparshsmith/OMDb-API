$(document).ready(()=>{
  let key = "4e790b19";
  let isChanged = false;
  let defaultHtml;
  $("#searchOmdb").click((e)=>{ 
    e.preventDefault();
    if(!isChanged){
      defaultHtml = $('.result').html();
      isChanged = true;
    }
    else{
      $('.result').html(defaultHtml);
    }
    search(key);
  })
});
let search = (key) =>{
  console.log("Search clicked");
  let searchText = $("#searchText").val();
  let parameterValue = $("#searchBy").val();
  if(searchText == ""){
    alert("Enter text to Search");
  }
  if(parameterValue == 1){
    searchByMovieName(searchText,key);
  } else if(parameterValue ==3){
    searchByImdb(searchText,key);
  }
}
let searchByMovieName = (movieName,key) =>{
  let apiUrl = "http://www.omdbapi.com/?t="+movieName+"&apikey="+key;
  let year = $("#year").val();
  if(year!=""){
    apiUrl = "http://www.omdbapi.com/?t="+movieName+"&apikey="+key+"&y="+year;
  }
  console.log(apiUrl); 
  $.ajax({  
        type: 'GET',
        dataType: 'json',
        url: apiUrl,
        success: (response) => {
          let posterUrl = "";
          if(response.hasOwnProperty('Poster'))
            posterUrl = response.Poster;
          else
            posterUrl = 'https://www.jainsusa.com/images/store/landscape/not-available.jpg';
            let template = `<div class="col-md-4 col-sm-6">
                            <div class="card ">
                              <img class="card-img-top" src="${posterUrl}" alt="Card image cap" id="poster-img" onerror=this.src="not-available.jpg">
                              <div class="card-body">
                                <h4 class="card-title" id="title">${response.Title}</h4>
                                <p class="card-text">
                                  <b>Year</b> <span id="year">${response.Year}</span><br>
                                  <b>Released</b> <span id="released">${response.Released}</span><br>
                                  <b>Genre</b> <span id="genre">${response.Genre}</span><br>
                                  <b>Director</b> <span id="director">${response.Director}</span><br>
                                  <b>Language</b> <span id="language">${response.Language}</span><br>
                                  <b>IMDB Rating</b> <span id="rating">${response.imdbRating}</span><br>
                                </p>
                                <p class="card-text"><small class="text-muted">Runtime <span id="runtime">${response.Runtime}</span></small></p>
                              </div>
                            </div>
                          </div>`
            $('.result').append(template);               
            $('#result-card').css("display","block");
        }, 
        error: (err) => {
            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)
        },
        timeout: 3000

    });
}
let searchByImdb = (id,key) =>{
  let apiUrl = "http://www.omdbapi.com/?i="+id+"&apikey="+key;
  
  let year = $("#year").val();
  if(year!=""){
    apiUrl = "http://www.omdbapi.com/?t="+movieName+"&apikey="+key+"&y="+year;
  }
  console.log(apiUrl); 
  $.ajax({  
        type: 'GET',
        dataType: 'json',
        url: apiUrl,
        success: (response) => {
          let posterUrl = "";
          if(response.hasOwnProperty('Poster'))
            posterUrl = response.Poster;
          else
            posterUrl = 'https://www.jainsusa.com/images/store/landscape/not-available.jpg';
            let template = `<div class="col-md-4 col-sm-6">
                            <div class="card ">
                              <img class="card-img-top" src="${posterUrl}" alt="Card image cap" id="poster-img" onerror=this.src="not-available.jpg">
                              <div class="card-body">
                                <h4 class="card-title" id="title">${response.Title}</h4>
                                <p class="card-text">
                                  <b>Year</b> <span id="year">${response.Year}</span><br>
                                  <b>Released</b> <span id="released">${response.Released}</span><br>
                                  <b>Genre</b> <span id="genre">${response.Genre}</span><br>
                                  <b>Director</b> <span id="director">${response.Director}</span><br>
                                  <b>Language</b> <span id="language">${response.Language}</span><br>
                                  <b>IMDB Rating</b> <span id="rating">${response.imdbRating}</span><br>
                                </p>
                                <p class="card-text"><small class="text-muted">Runtime <span id="runtime">${response.Runtime}</span></small></p>
                              </div>
                            </div>
                          </div>`
          $('.result').append(template);               
          $('#result-card').css("display","block");
        }, 
        error: (err) => {
            console.log(err.responseJSON.error.message);
            alert(err.responseJSON.error.message)
        },
        timeout: 3000

    });
}
