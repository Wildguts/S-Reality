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
      this.buttonupName = 'center-button-up-' + this.id
      this.buttondownName = 'center-button-down-' + this.id
      this.buttonleftName ='center-button-left-' + this.id
      this.buttonrightName = 'center-button-right-' + this.id
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
    const templatebuttonup = document.getElementById(this.buttonupName);
    const templatebuttondown = document.getElementById(this.buttondownName);
    const templatebuttonleft = document.getElementById(this.buttonleftName);
    const templatebuttonright = document.getElementById(this.buttonrightName);
    console.log(cardContainerLateralAfter,cardContainerHorizentalAfter,cardContainerLateralBefore,cardContainerHorizentalBefore)
   if ( templateCard) {
     // Clone the template card
     const clonedCard = templateCard.cloneNode(true) as HTMLElement;

     this.newCardId = this.newCardId + 1;
     const buttonIds = ['center-button-left-' + String(this.newCardId), 'center-button-right-' +  String(this.newCardId), 'center-button-down-' +  String(this.newCardId), 'center-button-up-'+  String(this.newCardId)];
     clonedCard.setAttribute('id', `card-${this.newCardId}`);


             if((direction === 'up' ) && cardContainerHorizentalBefore){
               clonedCard.setAttribute('class', `col-8  `);
               cardContainerHorizentalBefore.append(clonedCard);


           }
           if((direction === "down")&& (cardContainerHorizentalAfter)){
             cardContainerHorizentalAfter.append(clonedCard);


           }
             if((direction === "left")&& (cardContainerLateralBefore)){
              cardContainerLateralBefore.setAttribute('class', `order-first col-8  `);
               cardContainerLateralBefore.append(clonedCard);


             }
             if((direction === "right")&& (cardContainerLateralAfter)){
               cardContainerLateralAfter.append(clonedCard);

             }
             console.log('buttonids',buttonIds)
             for (const ids of buttonIds) {
               console.log('ids',ids)
                 const elementsWithId = document.querySelectorAll(ids);
                 const elementArray = Array.from(elementsWithId);
                 console.log('elementsWithId',elementsWithId)
                 console.log('elementArray',elementArray)
                 // Alternatively: const elementArray = [...elementsWithId];

                 for (const element of elementArray) {
                     element.addEventListener('click', () => this.duplicateCard(ids.slice('#center-button-'.length - String(this.newCardId).length), ids) );
                 }
             }
           }
         }
       }


}
