<?php

// convertArray();


function convertArray(){
   $arrayX = file(
      'http://projects/typing_game_v2/js/srpski.txt',
      FILE_IGNORE_NEW_LINES
   );

   foreach($arrayX as $value){
      echo '"' . $value . '", ';
   }
}

function saveScore($name, $score){
   $scoretable = array(
      array(1, "Ivica", 76),
      array(2, "Jelena", 90),
      array(3, "Natasa", 71),
      array(4, "Jelena", 40),
      array(5, "Jelena", 50),
      array(6, "Jelena", 60),
      array(7, "Jelena", 70),
      array(8, "Jelena", 80),
      array(9, "Jelena", 85),
      array(10, "Jelena", 86)
   );

   foreach($player as $name){

   }
}

?>