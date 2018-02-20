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
        s = s.concat(String.fromCharCode(getRndInteger(32,90)));
        //TODO handle escape characters and extend to 32-126 without thing like \
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

function recombineParents(parents: Individual[], target: string) {
    const numberOfParents: number = parents.length;
    const traitLibrary: string[][] = [];
    parents.map(parent => {
        traitLibrary.push(parent.trait.split(''))
    })
    let offspringTrait: string = '';
    for(let i = 0; i < parents[0].trait.length; i++) {
        offspringTrait = offspringTrait.concat(traitLibrary[getRndInteger(0,numberOfParents-1)][i]);
    }
    return {
        trait: offspringTrait,
        fitnessScore: calculateFitness(offspringTrait, target),
    }
}




const target: string = 'Hello, World!';

const population = createInitialPopulation(target, 5);
population.map(indiv => console.log(indiv));

console.log(`\n`)
sortPopulationByFitness(population);
population.map(indiv => console.log(indiv));

console.log(`\n`)
sortPopulationByFitness(population);
const parents = selectIndividuals(population,2);
parents.map(indiv => console.log(indiv));

const offspring = recombineParents(parents, target);
console.log(offspring);



// Tests

if (calculateFitness('jjKnp4bqpmAbp', 'Hello, World!') === 15491){
    console.log('Test for calculateFitness function passed');
} else {
    console.log('Test for calculateFitness function failed');
}

if (createInitialPopulation('target', 5).length === 5) {
    console.log('Test for creating initial population function passed');
}else {
    console.log('Test for creating initial population function failed');
}

if (selectIndividuals(createInitialPopulation('target', 5), 3).length === 3) {
    console.log('Test for selecting individuals passed');
}else {
    console.log('Test for selecting individuals failed');
}
