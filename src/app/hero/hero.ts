import { Component, computed, signal } from "@angular/core";

@Component({
    templateUrl: './hero.html',
})

export class HeroClass{
    
    name = signal('Ironman')
    age = signal(45)

    heroDdescription = computed(() => {
        const description = `${this.name()} - ${this.age()}`
        return description
    })

    getHeroDescription(){
        return `${this.name()} - ${this.age()}`
    }

    changeHero(){
        this.name.set('Superman')
        this.age.set(20)
    }

    changeAge(){
        this.age.set(30)
    }

    resetForm(){
        this.name.set('Ironman')
        this.age.set(45)
    }
}