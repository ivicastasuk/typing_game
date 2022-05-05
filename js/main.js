(function(){
   let startBtn = $('.start-btn');
   let mainInput = $('.main-input');
   let allLines = $('.line');
   let allText = [];
   let score = 0;

   mainInput.prop("disabled", true);

   loadScore();

   startBtn.on('click', startGame);

   function startGame(){
      $(this).hide();
      mainInput.prop("disabled", false);
      mainInput.focus();
      score = 0;
      $('.score').text(score);

      let speed = 1;
      let textLength = 3;
      let typingWords = words.filter(word => word.length == textLength);
      let lvl = 6;

      let speedUp = setInterval(function(){
         textLength++;
         typingWords = words.filter(word => word.length == textLength);
      }, 20000);
      mainInput.on('keyup', checkInputTyping);

      function checkInputTyping(){
         let inputVal = $(this).val();
         let self = $(this);
         if(allText.includes(inputVal)){
            let index = allText.indexOf(inputVal);
            allText.splice(index, 1);
            $('span').filter(function(){
               return $(this).text() == inputVal;
            }).css('background','blue').fadeOut(1000, function(){
               $(this).remove();
            });
            self.val("");
            score++;
            $('.score').text(score);
         }
      }
      var timer;
      function insertSpans(){
         for(var i = 0; i < allLines.length; i++){
            let rand = Math.floor(Math.random() * 15);
            if(rand <= lvl){
               let text = chooseText();
               allText.push(text);
               $(allLines[i]).append(`<span>${text}</span>`);
            }
         }
         timer = setTimeout(insertSpans, 5000);
      }
      insertSpans();

      function chooseText(){
         let rand = Math.floor(Math.random() * typingWords.length);
         let savedWord = typingWords[rand];
         typingWords.splice(rand,1);

         return savedWord.toLowerCase();
      }

      // animacija spanova

      let moveAll = setInterval(function(){
         let allSpans = $('span');
         allSpans.css({
            left: '+=' + speed,
         })
         //testiranje
         $.each(allSpans, (index, el)=>{
            let position = $(el).position().left;
            if(position > 620){
               callGameOver();
            }else if(position > 500 && position < 510){
               $(el).addClass('danger');
            }
         })
      }, 50);

      function callGameOver(){
         let playerName = $('.player').val();
         let playerScore = score;

         saveScore(playerName, playerScore);

         resetGame();

         clearInterval(moveAll);
         clearTimeout(timer);
         mainInput.prop("disabled", true);

      }

      // snimanje Hall of Fame tabele
      function saveScore(playerName, playerScore){
         var xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("hall-of-fame").innerHTML = this.responseText;
            }
         };
         xhttp.open("GET", "inc/save_score.php?name=" + playerName + "&score=" + playerScore, true);
         xhttp.send();
      }

      function resetGame(){
         score = 0;
         playerName = "NoName";
         $('span').remove();

         startBtn.show();
      }
   }
})()

// ucitavaje Hall of Fame tabele
function loadScore(){
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         document.getElementById("hall-of-fame").innerHTML = this.responseText;
      }
   };
   xhttp.open("GET", "inc/score.php", true);
   xhttp.send();
}
