<?php

   // ucitavanje fajla i pravljenje niza
   $fileContent = file_get_contents('score_table.txt');
   $data = json_decode($fileContent, true);
      
   // ispisivanje tabele
   echo '<ul>';
   $rbr = 1;
   foreach($data as $igrac){
      echo '<li><p class="rbr">' . $rbr . '.</p><p class="score-name">' . $igrac['name'] . '</p><p class="score-score">' . $igrac['score'] . '</p></li>';
      $rbr++;
   }
   echo '</ul>';
?>