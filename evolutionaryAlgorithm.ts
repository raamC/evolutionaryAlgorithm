interface Individual {
    trait: string;
    fitnessScore: number;
}

interface Result {
    generation: number;
    min: number;
    max: number;
    median: number;
    mean: number;
    topIndividual: string;
}

function createInitialPopulation(target: string, poolSize: number) {
    const population: Individual[] = [];
    let n: number = 0;
    while (n < poolSize) {
        const trait = generateTrait(target);
        population.push({
            trait,
            fitnessScore: calculateFitness(trait, target),
        })
        n++;
    }
    return population;
}

function generateTrait(target: string) {
    let s: string = '';
    while (s.length < target.length) {
        s = s.concat(String.fromCharCode(getRandomInteger(32, 90)));
        //TODO handle escape characters and extend to 32-126 without things like \
    }
    return s;
}

function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateFitness(trait: string, target: string) {
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
    population.sort(function (a, b) {
        return a.fitnessScore - b.fitnessScore;
    })
}

function selectParents(sortedPopulation: Individual[], number: number) {
    return sortedPopulation.slice(0, number)
}

function recombineParents(parents: Individual[], target: string) {
    const numberOfParents: number = parents.length;
    const traitLibrary: string[][] = [];
    parents.map(parent => {
        traitLibrary.push(parent.trait.split(''))
    })
    let offspringTrait: string = '';
    for (let i = 0; i < parents[0].trait.length; i++) {
        offspringTrait = offspringTrait.concat(traitLibrary[getRandomInteger(0, numberOfParents - 1)][i]);
    }

    const offspring: Individual = {
        trait: offspringTrait,
        fitnessScore: calculateFitness(offspringTrait, target),
    }
    return offspring;
}

function mutateIndividual(individual: Individual, mutationChance: number, target: string) {
    const traitArray: string[] = individual.trait.split('');
    let mutatedTrait: string = '';
    traitArray.map(char => {
        if (getRandomInteger(0, 100) < mutationChance) {
            const upOrDownDecider = getRandomInteger(0, 1);
            if (upOrDownDecider === 0) {
                mutatedTrait = mutatedTrait.concat(String.fromCharCode(char.charCodeAt(0) + 1));
                // TODO make sure this doesn't go out of bounds in terms of ASCII characters
            } else {
                mutatedTrait = mutatedTrait.concat(String.fromCharCode(char.charCodeAt(0) - 1));
            }
        } else {
            mutatedTrait = mutatedTrait.concat(char);
        }
    })
    return {
        trait: mutatedTrait,
        fitnessScore: calculateFitness(mutatedTrait, target),
    }
}

function getPopulationStats(population: Individual[]) {
    sortPopulationByFitness(population);
    
    const values = population.map(individual => {
        return individual.fitnessScore;
    })
    
    return {
        topIndividual: population[0].trait,
        min: values[0],
        max: values[values.length-1],
        median: median(values),
        mean: mean(values),
    }
}

function mean(values) {
    return Math.round(values.reduce((s, c) => s + c, 0) / values.length);
}
function median(values) {

    values.sort(function (a, b) { return a - b; });

    var half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];
    else
        return Math.round((values[half - 1] + values[half]) / 2);
}

function createRecord(generation: number, population: Individual[]) {
    return Object.assign({}, {generation: generation}, getPopulationStats(population));
}


// Create initial population

const target: string = 'HELLO, WORLD!';
let generation = 0;
let population = createInitialPopulation(target, 30);
const results: Result[] = [];

// population.map(indiv => console.log(indiv));
console.log(`Initial Population`);
console.log(getPopulationStats(population));
console.log(`\n`);
results.push(createRecord(generation, population));





while(getPopulationStats(population).min > 0 && generation<1000) {
    generation++;
    sortPopulationByFitness(population); 
    const parents = selectParents(population, 10);
    const offspringArray: Individual[] = [];
    for (let i = 0; i < parents.length; i += 2) {
        const offspring = mutateIndividual(
            recombineParents([parents[i],parents[i+1]], target), 5, target
        );
        offspringArray.push(offspring);
    }
    population = population.slice(0, (population.length - offspringArray.length)).concat(offspringArray);
    results.push(createRecord(generation, population));
    if(generation%25 === 0) { 
        // console.log(getPopulationStats(population));
    }
}

// population.map(indiv => console.log(indiv));
console.log(`\n`);
console.log(`Final Population`);
console.log(getPopulationStats(population));
console.log(generation);

console.log(results[0]);


//create initial population
// while (min>0 or generationNumber>limit)
// grab a 


// console.log(`\n`)
// sortPopulationByFitness(population); 
// population.map(indiv => console.log(indiv));

// console.log(`\n`)
// sortPopulationByFitness(population);
// const parents = selectParents(population,2);
// parents.map(indiv => console.log(indiv));


// console.log(`\n`)
// const offspring = recombineParents(parents, target);
// console.log(offspring);

// console.log(`\n`)
// const mutation = mutateIndividual(offspring, 30, target)
// console.log(mutation);




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

// if (selectIndividuals(createInitialPopulation('target', 5), 3).length === 3) {
//     console.log('Test for selecting individuals passed');
// }else {
//     console.log('Test for selecting individuals failed');
// }
