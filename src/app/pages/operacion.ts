import { Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    templateUrl: './operacion.html',
    styleUrls: ['./operacion.css'],
    standalone: true,
    imports: [CommonModule]
})

export class Operacion{
    counter = 10
    counterSignal = signal(10)

    increaseBy(value: number){
        this.counter += value
        this.counterSignal.update((current) => current + value)
    }

    decreaseBy(value: number){
        this.counter -= value
    }

    resetBy(){
        this.counter = 10
        this.counterSignal.set(10)
    }

    multBy(value: number){
        this.counter *= value
    }

    divededBy(value: number){
        this.counter /= value
    }
}