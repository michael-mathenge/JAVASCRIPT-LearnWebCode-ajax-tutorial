var pageCounter = 1;
var animalContainer = document.getElementById("animal-info");
var btn = document.getElementById("btn");


btn.addEventListener("click", function(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+pageCounter+'.json');
    ourRequest.onload = function(){
        if(ourRequest.status >= 200 && ourRequest.status < 400 ){
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        }else{
            console.log("connected to server but returned and error");
        }
    };

    ourRequest.onError = function(){
        console.log("connection error");
    };

    ourRequest.send();
    pageCounter++;
    if(pageCounter > 3){
        btn.classList.add("hide-me");
    }
});

function renderHTML(data){
    var HTMLString = "";

    for(i = 0; i < data.length; i++){
        HTMLString += "<p>" + data[i].name + " is a " + data[i].species +" that likes to eat ";

        for(ii = 0; ii < data[i].foods.likes.length; ii++){
            if(ii == 0){
                HTMLString += data[i].foods.likes[ii];
            }else{
                HTMLString += " and " + data[i].foods.likes[ii];
            }
        }

        HTMLString += ' and dislikes ';

        for(ii = 0; ii < data[i].foods.dislikes.length; ii++){
            if(ii == 0){
                HTMLString += data[i].foods.dislikes[ii];
            }else{
                HTMLString += " and " + data[i].foods.dislikes[ii];
            }
        }

        HTMLString += '.</p>';
    }

    animalContainer.insertAdjacentHTML('beforeend', HTMLString);
}

