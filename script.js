
let serchinput=document.querySelector(".serch-input");
let btn=document.querySelector(".bt1")
let API_KEY="74695a04"


let movies = async(input_vlue)=>{
    let base_url=`http://www.omdbapi.com/?s=${input_vlue}&apikey=${API_KEY}`
 let response=await fetch(base_url)
 console.log(response)
 let data= await response.json();




let div=document.querySelector(".serch-results")
     div.innerHTML="";
if(data.Response==="True"&& data.Search){
 
    for(let movie of data.Search){

    let details_url=`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`;
    let response=await fetch(details_url)
    let details=await response.json();
    console.log(details.imdbRating)
        console.log(movie.Title);
        console.log(movie.Poster);
 let posterHtml="";
 if(movie.Poster !=="N/A"){
    



        posterHtml =`   <div class="imgofmovie" style="  background-image: 
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), /* Dark overlay */
    url('${movie.Poster}') ; ">`
 }
 else{
posterHtml =`   <div class="imgofmovie" style="  background-image: 
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), /* Dark overlay */
    url('image/image-not-found.jfif'); ">`
      

 }


        
             div.innerHTML+=`  
              <div class="div1">
                  
                  ${posterHtml}
                  
              
                <div class="combine">
                    <div class="rating">
                        <p>${details.imdbRating}</p>
                    </div>

                    <div class="type">
                        <p>${movie.Type}</p>
                    </div>
                </div>
            </div>
            <div class="actor">
                <h3>${movie.Title}</h3>
            </div>
        </div> 
             
             `;




             


    }
}
else{
  div.innerHTML =`<h1 style="color:white;">Movie not found</h1>`
}




}


    let loaddiv=document.querySelector(".loaderdiv");

     let loadshow=()=>{
        loaddiv.classList.remove("hide")
     }
     let loadhide=()=>{
        loaddiv.classList.add("hide")
     }

let handle= async()=>{

let input_vlue=serchinput.value.trim();

if(input_vlue.length >=2){
    
    loadshow();
    await movies(input_vlue)
    
    loadhide();
  
}

}


btn.addEventListener("click",()=>{
    handle();
})


serchinput.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        handle();
    }


})


           
document.querySelector(".serch-results").addEventListener("mouseover", (e) => {
    let card = e.target.closest(".div1");
    if (card) {
        let img = card.querySelector(".imgofmovie");
        if (img && img.style) {
            
            if (!img.dataset.originalBg) {
                img.dataset.originalBg = img.style.backgroundImage;
            }
            let currentBg = img.style.backgroundImage;
            img.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0)), ${currentBg.replace(/linear-gradient\(.*\),\s*/, '')}`;
        }
    }
});

document.querySelector(".serch-results").addEventListener("mouseout", (e) => {
    let card = e.target.closest(".div1");
    if (card) {
        let img = card.querySelector(".imgofmovie");
        if (img && img.style && img.dataset.originalBg) {
            img.style.backgroundImage = img.dataset.originalBg;
        }
    }
});
