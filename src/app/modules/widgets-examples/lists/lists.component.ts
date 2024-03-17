import { Component } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
})
export class ListsComponent {
  constructor() {}

  cardsCount = 1
  buttonId : any | null
  id = ""
  newCardId = 1
  lateralAfter = 'card-container-lateral-after'
  lateralBefore = 'card-container-lateral-before'
  horizentalBefore = 'card-container-horizental-before'
  horizentalafter = 'card-container-horizental-after'
  elementName = 'template-card'
  buttonupName =  'center-button-up-1'
  buttondownName =  'center-button-down-1'
  buttonleftName =  'center-button-left-1'
  buttonrightName =  'center-button-right-1'
  duplicateCard(direction: string , idstring : string ) {
    const str =  idstring;
    const numericPart = str.match(/\d+/);
    if (numericPart) {
      this.id = String(parseInt(numericPart[0], 10));
      this.elementName = 'card-' + this.id
      this.buttonupName = 'centerbutton-up-' + this.id
      this.buttondownName = 'centerbutton-down-' + this.id
      this.buttonleftName ='centerbutton-left-' + this.id
      this.buttonrightName = 'centerbutton-right-' + this.id
      console.log(this.buttonrightName,this.buttonleftName,this.buttonupName,this.buttondownName)
      console.log(this.elementName)

    this.lateralBefore = 'card-container-lateral-before-' + this.id
    this.lateralAfter = 'card-container-lateral-after-' + this.id
    this.horizentalBefore = 'card-container-horizental-before-' + this.id
    this.horizentalafter = 'card-container-horizental-after-' + this.id
    const cardContainerHorizentalBefore = document.getElementById(this.horizentalBefore);
    const cardContainerLateralBefore = document.getElementById(this.lateralBefore);
    const cardContainerHorizentalAfter = document.getElementById(this.horizentalafter);
    const cardContainerLateralAfter = document.getElementById(this.lateralAfter);
    const templateCard = document.getElementById(this.elementName);
/*
    console.log(cardContainerLateralAfter,cardContainerHorizentalAfter,cardContainerLateralBefore,cardContainerHorizentalBefore) */
   if ( templateCard) {
     // Clone the template card
     const clonedCard = templateCard.cloneNode(true) as HTMLElement;

     this.newCardId = parseInt(this.id) + 1;
     console.log(this.newCardId)
     const buttonIds = ["#centerbutton-left-" + String(this.newCardId),"#centerbutton-right-" + String(this.newCardId),"#centerbutton-down-" + String(this.newCardId),"#centerbutton-up-" + String(this.newCardId)];
     clonedCard.setAttribute('id', `card-${this.newCardId}`);
      console.log(clonedCard)
             if((direction === 'up' ) && cardContainerHorizentalBefore){
               clonedCard.setAttribute('class', `col-8   `);
               cardContainerHorizentalBefore.append(clonedCard);


           }
           if((direction === "down")&& (cardContainerHorizentalAfter)){
             clonedCard.setAttribute('class', `col-8  `);
             cardContainerHorizentalAfter.append(clonedCard);


           }
             if((direction === "left")&& (cardContainerLateralBefore)){
              cardContainerLateralBefore.setAttribute('class', `order-first col-8  `);
              cardContainerLateralBefore.append(clonedCard);
             }
             if((direction === "right")&& (cardContainerLateralAfter)){
              cardContainerLateralAfter.setAttribute('class', ` order-last col-8  `);
               cardContainerLateralAfter.append(clonedCard);

             }
/*              console.log('buttonids',buttonIds) */
             for (const ids of buttonIds) {
               console.log('ids',ids)
                 const elementsWithId = document.querySelectorAll(ids);
                 const elementArray = Array.from(elementsWithId);
/*                  console.log('elementsWithId',elementsWithId)
                 console.log('elementArray',elementArray) */
                 // Alternatively: const elementArray = [...elementsWithId];

                 for (const element of elementArray) {
                   const buttonName = ids.slice( 1 ,  ids.lastIndexOf('-'))
                     element.setAttribute('id', `${buttonName}-${this.newCardId}`)
                     element.addEventListener('click', () => this.duplicateCard(ids.slice(ids.indexOf('-') + 1 , ids.lastIndexOf('-')), `${buttonName}-${this.newCardId}`));
                     console.log(buttonName)
                     console.log(element)
                 }
             }
           }
         }
       }


}
