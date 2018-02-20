interface Individual{
    trait: string;
    fitnessScore: number;
}

function createInitialPopulation(target: string, poolSize: number) {
    const population: Individual[] = [];
    let n: number = 0;
    while(n < poolSize) {
        const trait = generateTrait(target);
        population.push({
            trait,
            fitnessScore: calculateFitness(trait, target),
        })
        n++;
    }
    return population;
}

function generateTrait(target:string) {
    let s: string = '';
    while(s.length < target.length){
        s = s.concat(String.fromCharCode(getRndInteger(32,126)));
    }
    return s;
}

function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function calculateFitness(trait: string, target: string){
    const targetArray: string[] = target.split('');
    const traitArray: string[] = trait.split('');
    let fitnessScore: number = 0;
    targetArray.map((char, index) => {
        const diff: number = char.charCodeAt(0) - traitArray[index].charCodeAt(0);
        fitnessScore = fitnessScore + (diff * diff);
    })
    return fitnessScore;
}

function sortPopulationByFitness(population: Individual[]) {
    population.sort(function(a,b) {
        return a.fitnessScore - b.fitnessScore;
    })
}

function selectIndividuals(sortedPopulation: Individual[], number: number) {
    return sortedPopulation.slice(0, number)
}


const target: string = 'Hello, World!';

const population = createInitialPopulation(target, 5);
population.map(indiv => console.log(indiv));

console.log(`\n`)
sortPopulationByFitness(population);
population.map(indiv => console.log(indiv));

console.log(`\n`)
sortPopulationByFitness(population);
selectIndividuals(population,3).map(indiv => console.log(indiv));





// Tests

// if (calculateFitness('jjKnp4bqpmAbp', 'Hello, World!') === 15491){
//     console.log('Test for calculateFitness function passed');
// } else {
//     console.log('Test for calculateFitness function failed');
// }

// if (createInitialPopulation('target', 5).length === 5) {
//     console.log('Test for creating initial population function passed');
// }else {
//     console.log('Test for creating initial population function failed');
// }

