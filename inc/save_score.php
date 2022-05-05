<?php

$playerName = filter_var($_REQUEST["name"], FILTER_SANITIZE_STRING);
$playerScore = $_REQUEST["score"];

   // ucitavanje fajla i pravljenje niza
   $fileContent = file_get_contents('score_table.txt');
   $data = json_decode($fileContent, true);
      
   // dodavanje igraca u tabelu, sortiranje i izbacivanje poslednjeg
   // $data[] = array('name' => $playerName, 'score' => $playerScore);
   array_push($data, array('name' => $playerName, 'score' => $playerScore));
   foreach ($data as $key => $row){
      $name = array_column($data, 'name');      
      $score = array_column($data, 'score');
   }
   array_multisort($score, SORT_DESC, $name, SORT_ASC, $data);

   array_pop($data);

      // ispisivanje tabele
      echo '<ul>';
      $rbr = 1;
      foreach($data as $igrac){
         echo '<li><p class="rbr">' . $rbr . '.</p><p class="score-name">' . $igrac['name'] . '</p><p class="score-score">' . $igrac['score'] . '</p></li>';
         $rbr++;
      }
      echo '</ul>';   

   // snimanje tabele u fajl
   $encodedString = json_encode($data);
   file_put_contents('score_table.txt', $encodedString);

   $data = "";

?>