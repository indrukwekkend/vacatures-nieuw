<?php
function create_vacature() {

  $jobalert = '<div class="jobalert">';
  $jobalert .= '<div class="button">';
  $jobalert .= '<button class="jobalert-button" id="jobalert-close" title="sluit vacature alert" type="button">';
  $jobalert .= '<i class="fas fa-times"></i>';
  $jobalert .= '</button>';
$jobalert .= '</div>';

  $jobalert .= '<h2>Vacature alert</h2>';
  $jobalert .= '<p class="jobalert__description">Ontvang een e-mail wanneer er een nieuwe vacature online komt.</p>';
  $jobalert .= '<div class="jobalert__form">';
  $jobalert .= '<form action="#" method="post">';
  $jobalert .= '<input type="text" name="email" placeholder="E-mailadres" required>';

  $jobalert .= '<select name="vacature" required>';

  $jobalert .= '<option value="" disabled selected hidden>Vacature</option>';
  $jobalert .= '<option value="all">Alle vacatures</option>';
  $jobalert .= '<option value="all">Alle vacatures</option>';

  $jobalert .= '</select>';
  $jobalert .= '<input type="submit" value="Aanmelden">';
  $jobalert .= '</form>';
  $jobalert .= '</div>';
  $jobalert .= '</div>';


  $jobalert .= '</div>';
    


  return $jobalert;


}
?>


