//STRICT MODE
"use strict";


// MOVIE SEARCH
$(function(){
	// DEFINE VARIABLES
    let topRatedMovies = $("#searchResults");
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=27704eb10eb724fc5e0b962d9f086e1f&language=en-US&page=1`
    let imgUrl = `https://image.tmdb.org/t/p/w400/`;

	//CALL AJAX
	$.ajax({
		url: `${url}`,
		dataType: "json"

	}).done(function(data){
        //EMPTY STRING
		let html = "";
		
		//ITERATE TOP RATED MOVIES AND DISPLAY POSTER, OVERVIEW, AND RATING FOR EACH ONE
		for(let i = 0; i < 3; i ++){
			html += `<section class="resultingMovies"><img src="${imgUrl}${data.results[i].poster_path}" alt="${data.results[i].title}"><div><h4>${data.results[i].title}</h4><p>${data.results[i].overview}<br><span class="bold">Rating: ${data.results[i].vote_average}</span></p></div></section>`; 
		}
		//ADD STRING TO PAGE
        topRatedMovies.html(html);

	})
});



// SAVE TO LOCAL STORAGE
function watchLater(e){
    //PREVENT DEFAULT SUBMISSION
    e.preventDefault();

    //DEFINE VARIABLES
    let outputP = document.getElementById("watchThisLater");
    let removalError = document.getElementById("removalError");

    //DETERMINE IF ITEM EXISTS ALREADY IN LOCAL STORAGE
    if(localStorage.getItem("mTitle")){
        //REMOVE ERROR MESSAGE THAT MIGHT HAVE BEEN TRIGGERED BY REMOVE BUTTON
        removalError.classList.remove("showMessage");
        removalError.classList.add("hideMessage");

        outputP.innerHTML = `The last movie you saved was <span class = "bold">${localStorage.getItem("mTitle")}</span>.`;
    }else{
        //IF ITEM DOESN'T ALREADY EXIST IN LOCAL STORAGE

        //DEFINE MORE VARIABLES
        let mTitleInput = document.getElementById("mTitle");
        let errorSpan = document.getElementById("errorSpan");

        //IF INPUT VALUE IS LEFT BLANK WHEN SUBMIT BUTTON IS CLICKED THEN DISPLAY AN ERROR MESSAGE TO USER
        if(mTitleInput.value === ""){
            errorSpan.classList.remove("hideMessage");
            errorSpan.classList.add("showMessage");

            //REMOVE ERROR MESSAGE THAT MIGHT HAVE BEEN TRIGGERED BY REMOVE BUTTON
            removalError.classList.remove("showMessage");
            removalError.classList.add("hideMessage");

            //CLEAR THE OUTPUT PARAGRAPH
            outputP.innerHTML='';
        }else{
            //ELSE REMOVE THE ERROR MESSAGE 
            errorSpan.classList.remove("showMessage");
            errorSpan.classList.add("hideMessage");

            //REMOVE ERROR MESSAGE THAT MIGHT HAVE BEEN TRIGGERED BY REMOVE BUTTON
            removalError.classList.remove("showMessage");
            removalError.classList.add("hideMessage");

            //ADD THE INPUT VALUE TO LOCAL STORAGE
            localStorage.setItem("mTitle", mTitleInput.value);
            outputP.innerHTML=`We'll save the movie <span class = "bold">${localStorage.getItem("mTitle")}</span> for you to watch later.`;

            //CLEAR THE INPUT VALUE
            mTitleInput.value= '';
        }
    }
}

//REMOVE PREVIOUSLY SAVED ITEM IN LOCAL STORAGE
function removeWatchLater(e){
    //PREVENT DEFAULT SUBMISSION
    e.preventDefault();

    //DEFINE VARIABLES
    let outputP = document.getElementById("watchThisLater");
    let removalError = document.getElementById("removalError");
    let errorSpan = document.getElementById("errorSpan");

    //IF ITEM ALREADY EXISTS IN LOCAL STORAGE THEN REMOVE IT
    if(localStorage.getItem("mTitle")){
        localStorage.removeItem("mTitle");
        outputP.innerHTML=`The previously saved movie has been <span class= "bold">removed</span>. Why not save another one in its place?`;
    }else{
        //IF ITEM DOES NOT ALREADY EXIST IN LOCAL STORAGE WHEN REMOVE BUTTON IS CLICKED THEN DISPLAY REMOVAL ERROR MESSAGE

        //REMOVE ERROR MESSAGE THAT MIGHT HAVE BEEN TRIGGERED BY SUBMIT BUTTON
        errorSpan.classList.remove("showMessage");
        errorSpan.classList.add("hideMessage");

        //DISPLAY REMOVAL ERROR MESSAGE
        removalError.classList.remove("hideMessage");
        removalError.classList.add("showMessage");
    }
}

//DISPLAY SAVED ITEM IN LOCAL STORAGE
function displaySavedMovie(){
    let outputP = document.getElementById("watchThisLater");
    let removalError = document.getElementById("removalError");
    let errorSpan = document.getElementById("errorSpan");
    if(localStorage.getItem("mTitle")){
        //REMOVE ERROR MESSAGE THAT MIGHT HAVE BEEN TRIGGERED BY SUBMIT BUTTON
        errorSpan.classList.remove("showMessage");
        errorSpan.classList.add("hideMessage");

        //REMOVE ERROR MESSAGE THAT MIGHT HAVE BEEN TRIGGERED BY REMOVE BUTTON
        removalError.classList.remove("showMessage");
        removalError.classList.add("hideMessage");

        outputP.innerHTML = `The last movie you saved was <span class = "bold">${localStorage.getItem("mTitle")}</span>.`;
    }else{
        outputP.innerHTML='';
    }
}

//ACCORDION 
$( function() {
    $( "#accordion" ).accordion();
} );

// IMAGE CAROUSEL
$(function() {
      $(".imgCarousel").slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false, 
        autoplay: true,
        autoplaySpeed: 3000,
      });
      
});

//EVENT LISTENERS
document.getElementById("watchLaterSubmit").addEventListener("click", watchLater);
document.getElementById("watchLaterRemove").addEventListener("click", removeWatchLater);
window.onload = function(){
	displaySavedMovie();
};