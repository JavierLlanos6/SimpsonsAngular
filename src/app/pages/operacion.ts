import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    templateUrl: './operacion.html',
    styleUrls: ['./operacion.css'],
    standalone: true,
    imports: [CommonModule]
})

export class Operacion{
    counter = 10

    increaseBy(value: number){
        this.counter += value
    }

    decreaseBy(value: number){
        this.counter -= value
    }

    resetBy(){
        this.counter = 10
    }

    multBy(value: number){
        this.counter *= value
    }

    divededBy(value: number){
        this.counter /= value
    }
}