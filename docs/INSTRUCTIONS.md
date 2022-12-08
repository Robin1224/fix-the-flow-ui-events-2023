
# Fix the Flow - UI Events

Experimenteer met User Interface Events. Click, Double-click, Key-down, Long-press en Device-motion.

## Context

Deze leertaak hoort bij sprint 5 "Fix the Flow". Dit is een deeltaak die je individueel uitvoert als experiment.

In het college S05W2-01-User-Interface-Events wordt deze opdracht uitgelegd. 

## Doel van deze opdracht

Leren hoe je verschillende User Interface Events kan gebruiken in je Javascript code.

## Werkwijze

Opdracht: Experimenteer met User Interface Events

![image](https://user-images.githubusercontent.com/1391509/154644647-287da7f0-cdad-4966-ac48-d5ef9cc8b5af.png)

Deze opdracht gaat over de [ontwerp](#ontwerpen-en-bouwen) en [bouw](#ontwerpen-en-bouwen) fase van de DLC

### Ontwerpen en bouwen

Ontwerp en bouw een User-Interface voor verschillende gebruikersinput. Zorg voor goede feedback / feedforward en labels zodat een gebruiker weet wat er mogelijk is …

1. Gebruik de eventListener met een “click” event om de kleur van de knoppen te veranderen. 
2. Gebruik een “dubbel click” event om de kleur van de knoppen te veranderen. 
3. Gebruik het “keydown” event om kleuren van knoppen te veranderen.
4. Probeer een “Long press” event te maken om een kleur aan te passen.
5. Kun je met het “DeviceMotionEvent” de kleur van knoppen veranderen?


<details>
<summary>Aanpak</summary>

1. Fork deze deeltaak en clone de code naar je laptop
2. Schets de pagina met goede labels, bedenk hoe je de gebruiker feedback / feedforward kunt geven
4. maak een breakdown-schets waarin je bedenkt welke HTML, CSS and JS je nodig hebt.
5. Selecteer de juiste elementen uit de DOM met de _querySelector_
6. Gebruik de _addEventListener_ in JS om een event aan een element te koppelen
7. Gebruik de _classList_ in JS om een andere class aan een element toe te voegen
8. TIP: Test stap-voor-stap of je de goede dingen doet met console.log()

#### Materiaal

- Tutorial microinteractions met querySelector, addEvenlistener en classList [if you only know one thing about JavaScript, this is what I would recommend](https://css-tricks.com/video-screencasts/150-hey-designers-know-one-thing-javascript-recommend/)

- [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [QuerySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [ClassList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) 
  
- [MDN Mouse events](https://developer.mozilla.org/en-US/docs/Web/API/Element#mouse_events)
- [MDN Keyboard events](https://developer.mozilla.org/en-US/docs/Web/API/Element#keyboard_events)
- [MDN DeviceMotionEvent - experimental](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)


</details>



## Criteria

Focus sprint 5 - De focus van deze sprint ligt op interactie en informatie architectuur van een website.

Deze deeltaak hoort bij het gedragscriterium:

Methodisch handelen: Student past aangeboden principes en conventies op het gebied van frontend, interface design en vormgeving toe.

Deze opdracht is done als:

- [ ] Je hebt meerdere experimenten gedaan
- [ ] Per experminent heb jde de code in eigen woorden uitgelegd (in de Wiki)

