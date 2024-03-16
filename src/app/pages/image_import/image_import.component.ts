import { Component, ViewChild } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';

@Component({
  selector: 'app-imageimport',
  templateUrl: './image_import.component.html',
  styleUrls: ['./image_import.component.scss'],
})
export class imageImportComponent {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
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
  async openModal() {
    return await this.modalComponent.open();
  }

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
      const buttonupClone = templatebuttonup?.cloneNode(true) as HTMLElement;
      const buttondownClone = templatebuttondown?.cloneNode(true) as HTMLElement;
      const buttonleftClone = templatebuttonleft?.cloneNode(true) as HTMLElement;
      const buttonrightClone = templatebuttonright?.cloneNode(true) as HTMLElement;
      this.newCardId = this.newCardId + 1;
      const buttonIds = ['center-button-left-' + String(this.newCardId), 'center-button-right-' +  String(this.newCardId), 'center-button-down-' +  String(this.newCardId), 'center-button-up-'+  String(this.newCardId)];
      clonedCard.setAttribute('id', `card-${this.newCardId}`);
      buttonupClone.setAttribute('id', buttonIds[3]);
      buttondownClone.setAttribute('id', buttonIds[2]);
      buttonleftClone.setAttribute('id', buttonIds[0]);
      buttonrightClone.setAttribute('id', buttonIds[1]);
      console.log(clonedCard,buttonrightClone,buttonleftClone,buttonupClone,buttondownClone)
      // Calculate the position based on the direction
      let leftPosition = 0;
      let topPosition = 0;
      switch (direction) {
        case 'up':
          topPosition = -50;
          break;
          case 'down':
            topPosition = 50;
            break;
            case 'left':
              leftPosition = -50;
              break;
              case 'right':
                leftPosition = 50;
                break;
                default:
                  break;
                }


                // Apply the position style to the cloned card
                clonedCard.style.position = 'relative';
                clonedCard.style.left = `${leftPosition}px`;
                clonedCard.style.top = `${topPosition}px`;

              if((direction === 'up' ) && cardContainerHorizentalBefore){
                cardContainerHorizentalBefore.appendChild(clonedCard);
                cardContainerHorizentalBefore.appendChild(buttonupClone);
                cardContainerHorizentalBefore.appendChild(buttondownClone);
                cardContainerHorizentalBefore.appendChild(buttonleftClone);
                cardContainerHorizentalBefore.appendChild(buttonrightClone);


            }
            if((direction === "down")&& (cardContainerHorizentalAfter)){
              cardContainerHorizentalAfter.appendChild(clonedCard);
              cardContainerHorizentalAfter.appendChild(buttonupClone);
              cardContainerHorizentalAfter.appendChild(buttondownClone);
              cardContainerHorizentalAfter.appendChild(buttonleftClone);
              cardContainerHorizentalAfter.appendChild(buttonrightClone);

            }
              if((direction === "left")&& (cardContainerLateralBefore)){
                cardContainerLateralBefore.appendChild(clonedCard);
                cardContainerLateralBefore.appendChild(buttonupClone);
                cardContainerLateralBefore.appendChild(buttondownClone);
                cardContainerLateralBefore.appendChild(buttonleftClone);
                cardContainerLateralBefore.appendChild(buttonrightClone);

              }
              if((direction === "right")&& (cardContainerLateralAfter)){
                cardContainerLateralAfter.appendChild(clonedCard);
                cardContainerLateralAfter.appendChild(buttonupClone);
                cardContainerLateralAfter.appendChild(buttondownClone);
                cardContainerLateralAfter.appendChild(buttonleftClone);
                cardContainerLateralAfter.appendChild(buttonrightClone);
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
